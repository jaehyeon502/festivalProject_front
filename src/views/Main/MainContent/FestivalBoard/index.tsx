import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response';
import { GetFestivalReveiwBoardListResponseDto } from 'src/apis/response/board';

import { GetInterstFestivalListResponseDto } from 'src/apis/response/festival';


import FestivalListItem from 'src/components/FestivalListItem';
import FestivalReviewBoardList from 'src/components/FestivalReiviewBoardList';
import { GET_FESTIVAL_REVIEWBOARD_LIST_URL, GET_INTERESTED_FESTIVAL_LIST_URL, authorizationHeader } from 'src/constants/api';
import { usePagingHook } from 'src/hooks';
import { useFestivalNumberStore, useSignInStore } from 'src/stores';
import { getpagecount } from 'src/utils';

interface Props{
  clickPage:boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>

}
export default function FestivalBoard({setClickPage, clickPage} :Props) {
  //              HOOK              //
  const [cookies] = useCookies();
  const accessToken = cookies.accessToken;
  const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList}=usePagingHook(2);
  const {signInUser}=useSignInStore();
  const{festivalNumber, setFestivalNumber}=useFestivalNumberStore();


  //          EVENT HANDLER           //
const getInterestedFestivalList=(accessToken:string)=>{
  axios 
  .get(GET_INTERESTED_FESTIVAL_LIST_URL,authorizationHeader(accessToken))
  .then((response)=>getInterestedFestivalListResponseHandler(response))
  .catch((error)=>getInterestedFestivalErrorHandler(error))
}

const getFestivalReviewBoardList=(festivalNumber: number)=>{
  setFestivalNumber(festivalNumber);

  axios
  .get(GET_FESTIVAL_REVIEWBOARD_LIST_URL(festivalNumber))
  .then((response)=>getFestivalReviewBoardListResponseHandler(response))
  .catch((error)=>getFestivalReivewBoardListErrorHandler(error))
}


//          Response Handler          //


const getInterestedFestivalListResponseHandler =(response:AxiosResponse<any,any>)=>{
  const {result,message,data}=response.data as ResponseDto<GetInterstFestivalListResponseDto[]>
  if(!result || data === null) return;
  setFestivalList(data);
  console.log("data"+data)
}

const getFestivalReviewBoardListResponseHandler=(response:AxiosResponse<any,any>)=>{
  const {result,message,data}=response.data as ResponseDto<GetFestivalReveiwBoardListResponseDto[]>
  if(!result || data === null) return;
  setFestivalList(data);
  setClickPage(true);

}

 //          Error Handler          //
  const getInterestedFestivalErrorHandler = (error: any) => {
  console.log(error.message);
}
const getFestivalReivewBoardListErrorHandler = (error: any) => {
  console.log(error.message);
}

  //          Use effect        //
  useEffect(() => {
    getInterestedFestivalList(accessToken);
 

  }, []);

  const check=()=>{
    alert(signInUser)
  }


console.log(clickPage)
  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      <Box sx={{ pt: '20px', pb: '80px'}}>
        <Box sx={{ display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', mb:'50px' }}>
          <Typography sx={{ fontSize:'36px', fontWeight:900, color:'#222' }}>관심있는 축제</Typography>
          <Box sx={{ width:'30px', height:'4px', backgroundColor:'#ff9f40', mt:'5px' }}></Box>
        </Box>
        <Box>
        <Grid container spacing={3} sx={{display:'flex',justifyContent:'center'}}  >
          <Grid item sm={12} md={8}  >
            <Button onClick={()=>check()}>체크</Button>
            <Stack spacing={2}>
              {!clickPage ?  
              ( <> {viewList.map((festivalList) => (<FestivalListItem festivalList={festivalList as GetInterstFestivalListResponseDto}  onClick={() => setClickPage(true)} />))}</>)
              : 
              ( <> {viewList.map((festivalBoardList)=>(<FestivalReviewBoardList festivalBoardList={festivalBoardList as GetFestivalReveiwBoardListResponseDto }/>)) } </>)
              }
            </Stack>
          </Grid>
        </Grid>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}} >
          <Pagination  sx={{mt:'20px',ml:'20px',mr:'20px'}} page={pageNumber} count={getpagecount(festivalList,COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
      </Box>
    </Box>
  )
}