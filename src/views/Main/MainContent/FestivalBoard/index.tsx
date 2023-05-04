import { Box, Card, Grid, Pagination, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FestivalListItem from 'src/components/FestivalListItem';
import { usePagingHook } from 'src/hooks';
import { IPreviewFestivalItem } from 'src/interfaces';
import { FESTIVALLIST } from 'src/mock';
import { getpagecount } from 'src/utils';


export default function FestivalBoard() {
  const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList}=usePagingHook(2);
  // const [festivalList, setFestivalList] = useState<IPreviewFestivalItem[]>([]);

  useEffect(() => {
    setFestivalList(FESTIVALLIST);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      <Box sx={{ pt: '20px', pb: '80px'}}>
        <Box >
        <Grid container spacing={3} sx={{display:'flex',justifyContent:'center'}} >
          <Grid item sm={12} md={8}  >
            <Stack spacing={2}>
            {viewList.map((festivalItem) => (<FestivalListItem festivalList={festivalItem} />))}
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
