import { Box, Button, IconButton, Input, OutlinedInput, Pagination, Stack, Typography } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { usePagingHook } from 'src/hooks';
import ReviewBoardListItem from 'src/components/ReviewBoardListItem';
import {  ReviewBoard } from 'src/interfaces';
import { useEffect, useState } from 'react';
import { REVIEW_BOARD_LIST } from 'src/mock';
import { getpagecount } from 'src/utils';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { GetAllReviewBoardListResponseDto } from 'src/apis/response/board';
import { GET_ALL_REVIEWBOARD_LIST_URL } from 'src/constants/api';

export default function ReviewBoardListView() {

  //          HOOK          //
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const navigator = useNavigate();
  const [searchTypeButton, setSearchTypeButton] = useState<boolean>(false);
  const [searchTypeName, setSearchTypeName] = useState<string>('최신순');
  const searchType = ['최신순', '평점순', '조회수', '제목 + 내용'];

  //          Event Handler          //
  const onClickSearchTypeButtonHandler = () => {
    if (searchTypeButton === true) {
      setSearchTypeButton(false);
      return;
    }
    setSearchTypeButton(true);
    return;
  }

  const onClickSearchType = (typeName: string) => {
    if (typeName === '최신순') setSearchTypeName(typeName);
    else if (typeName === '조회수') setSearchTypeName(typeName);
    else if (typeName === '제목 + 내용') setSearchTypeName(typeName);
    else if (typeName === '평점순') setSearchTypeName(typeName);
    setSearchTypeButton(false);
    return;
  }

  //               Event Handler         //
  const getAllReviewBoardLsit=()=>{
    axios
    .get(GET_ALL_REVIEWBOARD_LIST_URL)
    .then((response)=>getReviewBordListResponseHandler(response))
    .catch((error)=>getReviewBoardErrorHandler(error))
    
  }

  //         Response Handler        //

  const  getReviewBordListResponseHandler = (response:AxiosResponse<any,any>)=>{
    const {result,message,data}=response.data as ResponseDto<GetAllReviewBoardListResponseDto[]>
    if(!result || data === null) return;
    setFestivalList(data)
  }

  //            Error Handler     //

  const getReviewBoardErrorHandler=(error:any)=>{
    console.log(error.message);
  }


  useEffect(() => {

    getAllReviewBoardLsit();

    // setFestivalList();

  }, [])
  return (
    <Box>

      <Box sx={{ mt: '30px', ml: '60px', mr: '60px', mb: '20px', display: 'flex', justifyContent: 'space-between' }}>

        <Typography sx={{ fontSize: '44px', fontWeight: '700' }}>축제 후기 게시판</Typography>

        <Box display='flex'>
          <Box>
            <OutlinedInput sx={{ width: '300px' }}
              placeholder='검색명을 입력해 주세요.'
              endAdornment={
                <IconButton edge='end'>
                  <SearchSharpIcon />
                </IconButton>
              } />
          </Box>
          <Box>
            {
              searchTypeButton ?
                <Box sx={{ width: '180px' }}>
                  <OutlinedInput value={searchTypeName}
                    endAdornment={
                      <IconButton edge='end' onClick={onClickSearchTypeButtonHandler}>
                        <ArrowDropUpIcon sx={{ width: '40px', height: '40px' }} />
                      </IconButton>
                    } />
                  <Box sx={{ width: '178px', position: 'absolute', top: '150px', border: '1px solid', borderTop: 'none' }}>
                    {searchType.map((type) => <Box onClick={() => onClickSearchType(type)} sx={{ p: '3px', fontWeight: 550 }}>{type}</Box>)}
                  </Box>
                </Box>
                :
                <OutlinedInput sx={{ width: '180px' }} value={searchTypeName}
                  endAdornment={
                    <IconButton edge='end' onClick={onClickSearchTypeButtonHandler}>
                      <ArrowDropDownIcon sx={{ width: '40px', height: '40px' }} />
                    </IconButton>
                  } />
            }
          </Box>
        </Box>

      </Box>

      <Box sx={{ mb: '10px', ml: '300px', mr: '300px', backgroundColor: 'skyblue' }}>
        <Stack sx={{ p: '10px' }}>
          {viewList.map((reviewBoardItem) => (<ReviewBoardListItem item={reviewBoardItem as ReviewBoard} />))}
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ width: '120px', height: '50px' }}>
        </Box>
        <Box sx={{ mt: '18px', mb: '18px' }}>
          <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)}></Pagination>
        </Box>
        <Box sx={{ width: '120px', height: '50px', mt: '12px' }}>
          <Button onClick={() => navigator('/reviewBoard/write')}
            sx={{ backgroundColor: 'skyblue', color: 'white', fontSize: '18px', fontWeight: 550 }}>게시물 작성</Button>
        </Box>
      </Box>
    </Box>
  )
}
