import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FESTIVALLIST, ONELINEREVIEW_LIST } from "src/mock";
import {  Festival,  OneLineReview } from "src/interfaces";
import OneLineReviewListItem from "src/components/OneLineReviewListItem";
import axios, { AxiosResponse } from "axios";
import ResponseDto from "src/apis/response";
import { usePagingHook } from "src/hooks";
import { GetFestivalNameResponseDto, GetOneLineReviewResponseDto, GetTop1OneLineReviewResponseDto } from "src/apis/response/festival";
import { useFestivalNumberStore } from "src/stores";
import { GET_ONELINE_REVIEW_FETIVALNAME, GET_ONELINE_REVIEW_URL, GET_TOP1_ONELINEREVIEW_URL } from "src/constants/api";
import { getpagecount } from "src/utils";

interface Props {
  clickPage: boolean;
}

export default function MainRightContent({ clickPage }: Props) {
  const [oneLineReviewList, setOneLineReviewList] =
    useState<OneLineReview[]>();
  const [festivalName, setFestivalName] = useState<GetFestivalNameResponseDto | null>(null);
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const {festivalNumber}=useFestivalNumberStore();


  
  //         Event Handler         //
  const getOneLineReview=()=>{
    axios
    .get(GET_ONELINE_REVIEW_URL(festivalNumber as number))
    .then((response)=>getOneLineReviewResponseHandler(response))
    .catch((error)=>getOneLineReviewErrorHandler(error))
  }
  
  const top1OneLineReview = () =>{
    axios
    .get(GET_TOP1_ONELINEREVIEW_URL)
    .then((response)=>getTop1OneLineReviewResponseHandler(response))
    .catch((error)=>getTop1OneLineReviewErrorHandler(error))
  }

  const getFestivalName = () => {
    axios
    .get(GET_ONELINE_REVIEW_FETIVALNAME(festivalNumber as number))
    .then((response)=>getFestivalNameResponseHandler(response))
    .catch((error)=>getFestivalNameErrorHandler(error))
  }



   //             Response Handler               ///


  const getOneLineReviewResponseHandler=(response:AxiosResponse<any,any>)=>{
    const {result,message,data}=response.data as ResponseDto<GetOneLineReviewResponseDto[]>
    if(!result || data === null)return;
    setFestivalList(data)
  }

  const getTop1OneLineReviewResponseHandler=(response:AxiosResponse<any,any>)=>{
    const {result,message,data}=response.data as ResponseDto<GetTop1OneLineReviewResponseDto[]>
    if(!result || data === null)return;
    setFestivalList(data)
  }

  const getFestivalNameResponseHandler = (response:AxiosResponse<any,any>)=>{
    const {result,message,data} = response.data as ResponseDto<GetFestivalNameResponseDto>
    if(!result || data === null) return;
    setFestivalName(data);

  }

  

 

  //        Error handler              //
  const getOneLineReviewErrorHandler = (error: any) => {
    console.log(error.message);
  }
  const getTop1OneLineReviewErrorHandler = (error: any) => {
    console.log(error.message);
  }
  const getFestivalNameErrorHandler = (error: any) => {
    console.log(error.message);
  }

  //          use Effect             //
  useEffect(() => {
    getFestivalName();
  
    getOneLineReview();
  }, [festivalNumber]);

  useEffect(() => {
  
    top1OneLineReview();
  }, []);

  return (
    <Box sx={{ width: "40%", height: "100%" }}>
      <Typography
        sx={{ ml: "30px", mt: "15px", fontSize: "24px", fontWeight: 900, color: "#222" }}> 한줄평 {festivalName?.festivalName}</Typography>
      <Box sx={{ mt: "15px", ml: "30px", mr: "30px", overflow: "hidden" }}>
          {viewList.map((item) => (
            <Grid sx={{ border: "1px solid #dedede", borderRadius: "10px", mt: "15px" }}>
              <OneLineReviewListItem oneLineReviewItem={item as GetOneLineReviewResponseDto} />
            </Grid>
          ))}
        </Box>
          <Pagination hidden page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
    </Box>
  );
}

