import { Box, Card, Grid, Pagination, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FestivalListItem from 'src/compnents/FestivalListItem';
import FestivalRivewBoardList from 'src/compnents/FestivalRivewBoardList';
import { usePagingHook } from 'src/hooks';
import { IPfestivalReviewBoard, IPreviewFestivalItem } from 'src/interfaces';
import { FESTIVALLIST, FESTIVALREVIEWBOARDLIST } from 'src/mock';
import { getpagecount } from 'src/utils';


export default function FestivalBoard() {
  const{festivalList, viewlist, pagenumber, onpageHandler, COUNT, setFestivalList}=usePagingHook(1);
  // const [festivalList, setFestivalList] = useState<IPreviewFestivalItem[]>([]);

  useEffect(() => {
    setFestivalList(FESTIVALLIST);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor:'#FFFAFA'}}>
      <Box sx={{ pt: '20px', pb: '80px'}}>
        <Box >
        <Grid container spacing={3} sx={{display:'flex',justifyContent:'center'}} >
          <Grid item sm={12} md={8}  >
            <Stack spacing={2}>
            {viewlist.map((festivalItem) => (<FestivalListItem festivalList={festivalItem as IPreviewFestivalItem} />))}
            {viewlist.map((festivalBoardListItem) => (<FestivalRivewBoardList festivalBoardList={festivalBoardListItem as IPfestivalReviewBoard} />))}
     
            </Stack>
          </Grid>
        </Grid>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}} >
          <Pagination  sx={{mt:'20px',ml:'20px',mr:'20px'}} page={pagenumber} count={getpagecount(festivalList,COUNT)} onChange={(event, value) => onpageHandler(value)} />
        </Box>
      </Box>
    </Box>
  )
}
