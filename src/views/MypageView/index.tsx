import { Avatar, Box, Card, Grid, Pagination, Stack, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { SetStateAction, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/apis/response';
import { GetMyReviewBoardListResponseDto } from 'src/apis/response/board';
import FestivalReviewBoardList from 'src/components/FestivalReiviewBoardList'
import { GET_MYREVIEWBOARD_LIST_URL, authorizationHeader } from 'src/constants/api';
import { usePagingHook } from 'src/hooks';
import { useSignInStore } from 'src/stores';
import { getpagecount } from 'src/utils';

export default function MypageView() {
    //          HOOk            //
    const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList}=usePagingHook(5);
    const [cookies] = useCookies();
    const {signInUser}=useSignInStore();
    const accessToken = cookies.accessToken;
    const [interestedList,setInterestedList]=useState<SetStateAction<string[]>>([]);
    const navigator=useNavigate();
    console.log("로그인"+signInUser)

      //          EVENT HANDLER           //
      const getMyReviewBoardResponse=(accessToken:string)=>{
          axios
          .get(GET_MYREVIEWBOARD_LIST_URL,authorizationHeader(accessToken))
          .then((response)=>getMyReviewBoardResponseHandler(response))
          .catch((error)=>getMyReviewBoardErrorHandler(error))
  
      }
  
    //          Response Handler          //
    const getMyReviewBoardResponseHandler = (response:AxiosResponse<any,any>)=>{
      const {result,message,data} = response.data as ResponseDto<GetMyReviewBoardListResponseDto[]>
      if(!result || data === null) return;
      setFestivalList(data)
    
    }

    //            Error Handler           //
    const getMyReviewBoardErrorHandler = (error: any) => {
        console.log(error.message);
      }

  
  //          Use effect        //
  useEffect(() => {
    getMyReviewBoardResponse(accessToken);


  }, []);
  useEffect(() => {
    if(accessToken == null){
        navigator('/');
    }
  
  }, []);


  return (
    <Box sx={{p:'40px 120px'}} >
        <Box>
            <Typography sx={{fontSize:'20px',fontWeight:900}}>내가 작성한 후기 게시글</Typography>
        </Box>
        <Box sx={{m:'20px 0px 80px'}}>
            <Grid container spacing={3}>
                <Grid item sm={12} md={8}>
                    <Stack spacing={2}>
                    {viewList.map((festivalBoardList)=>(<FestivalReviewBoardList festivalBoardList={festivalBoardList as GetMyReviewBoardListResponseDto }/>)) }
                    </Stack>
                </Grid>
                <Grid item sm={12} md={3}> 
                    <Box sx={{display:'flex',alignItems:'center'}}>
                        <Avatar sx={{height:'120px' ,width:'120px'}}/>
                        <Box sx={{ml:'15px'}}>
                        <Typography sx={{fontSize:'20px',fontWeight:700}}>{signInUser?.userId}</Typography>
                        <Typography sx={{fontSize:'20px',fontWeight:700}}>{signInUser?.nickname}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{mt:'15px'}}>
                        <Typography sx={{fontSize:'20px',fontWeight:700}}>내 관심 축제</Typography>
                        <Card sx={{height:'200px',p:'25px'}}>
                            <Stack sx={{alignItems:'center'}}>
                                { signInUser?.interestedFestival?.map((type) => <Card><Typography sx={{fontSize:'30px'}}>{type}</Typography></Card>) }
                            </Stack>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}} >
          <Pagination  sx={{mt:'20px',ml:'20px',mr:'20px'}} page={pageNumber} count={getpagecount(festivalList,COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
    </Box>
  )
}
