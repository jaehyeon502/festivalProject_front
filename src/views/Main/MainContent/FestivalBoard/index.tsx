import { Box, Card, Grid, Pagination, Stack, Typography } from '@mui/material'
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
        <Box sx={{ display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', mb:'50px' }}>
          <Typography sx={{ fontSize:'36px', fontWeight:900, color:'#222' }}>관심있는 축제</Typography>
          <Box sx={{ width:'30px', height:'4px', backgroundColor:'#ff9f40', mt:'5px' }}></Box>
        </Box>
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
