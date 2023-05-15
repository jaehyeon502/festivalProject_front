import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FESTIVALLIST, ONELINEREVIEW_LIST } from "src/mock";
import { IOneLineReview, IPreviewFestivalItem } from "src/interfaces";
import OneLineReviewListItem from "src/components/OneLineReviewListItem";
import axios, { AxiosResponse } from "axios";
import ResponseDto from "src/apis/response";
import { GetOneLineReviewResponseDto } from "src/apis/response/festival";
import { GET_ONELINE_REVIEW_URL } from "src/constants/api";
import { useFestivalNumberStore, useSignInStore } from "src/stores";
import { usePagingHook } from "src/hooks";
import { getpagecount } from "src/utils";

interface Props {
  clickPage: boolean;
}

export default function MainRightContent({ clickPage }: Props) {
  //       HOOk                
  // const [oneLineReviewList, setOneLineReviewList] =useState<GetOneLineReviewResponseDto[]>();
  const [festivalName, setFestivalName] = useState<IPreviewFestivalItem[]>();
  const [selectedFestivalReviewList, setSelectedFestivalReviewList] = useState<any[]>([]);
  const {festivalNumber}=useFestivalNumberStore();
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);


  //         Event Handler         //

  const getOneLineReview=()=>{
    axios
    .get(GET_ONELINE_REVIEW_URL(festivalNumber as number))
    .then((response)=>getOneLineReviewResponseHandler(response))
    .catch((error)=>getOneLineReviewErrorHandler(error))
  }

  //             Response Handler               ///

  const getOneLineReviewResponseHandler=(response:AxiosResponse<any,any>)=>{
    const {result,message,data}=response.data as ResponseDto<GetOneLineReviewResponseDto[]>
    if(!result || data === null)return;
    setFestivalList(data)

  }

  //        Error handler              //

  const getOneLineReviewErrorHandler = (error: any) => {
    console.log(error.message);
  }



  //          use Effect             //
  useEffect(() => {
   
    getOneLineReview();
  }, [festivalNumber]);

  // useEffect(() => {
  // Request -> Response로 리스트가 옴
  //   setSelectedFestivalReviewList(그 리스트);
  // }, [festivalNumber]);

  return (
    <Box sx={{ width: "40%", height: "100%" }}>
      <Typography
        sx={{ ml: "30px", mt: "15px", fontSize: "24px", fontWeight: 900, color: "#222" }}> 한줄평</Typography>
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
