import { Box, Button, IconButton, Input, OutlinedInput, Pagination, Stack, Typography } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePagingHook } from 'src/hooks';
import ReviewBoardListItem from 'src/components/ReviewBoardListItem';
import { IReviewBoard } from 'src/interfaces';
import { useEffect } from 'react';
import { REVIEW_BOARD_LIST } from 'src/mock';
import { getpagecount } from 'src/utils';
import { useNavigate } from 'react-router-dom';

export default function ReviewBoardListView() {

  //          HOOK          //
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const navigator = useNavigate();

  useEffect(() => {
    setFestivalList(REVIEW_BOARD_LIST);
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
            <OutlinedInput sx={{ width: '180px' }}
              endAdornment={
                <IconButton edge='end' >
                  <ArrowDropDownIcon sx={{ width: '40px', height: '40px' }} />
                </IconButton>
              } />
          </Box>
        </Box>

      </Box>

      <Box sx={{ mb: '10px', ml: '300px', mr: '300px', backgroundColor: 'skyblue' }}>
        <Stack sx={{ p: '10px' }}>
          {viewList.map((reviewBoardItem) => (<ReviewBoardListItem item={reviewBoardItem as IReviewBoard} />))}
        </Stack>
      </Box>

      <Box sx = {{display : 'flex', justifyContent : 'space-around'}}>
        <Box></Box>
        <Box sx={{ mt: '18px', mb: '18px' }}>
          <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)}></Pagination>
        </Box>
        <Box>
          <Button onClick = {() => navigator('/reviewBoard/write')} 
          sx = {{ backgroundColor : 'skyblue', color : 'white', fontSize : '18px', fontWeight : 550}}>게시물 작성</Button>
        </Box>
      </Box>
    </Box>
  )
}
