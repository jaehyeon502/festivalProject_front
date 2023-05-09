import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import FestivalSimpleListItem from 'src/components/FestivalSimpleListItem';
import MonthAndAreaButton from 'src/components/MonthAndAreaIButton';
import { usePagingHook } from 'src/hooks';
import { IPreviewFestivalSimpleListItem } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import { useFestivalStore } from 'src/stores';
import { getpagecount } from 'src/utils';
interface Props{
  clickPage:boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainLeftContent({setClickPage, clickPage} :Props) {


  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const { festival, setFestival } = useFestivalStore();


  const onClickPageHandler = () => {
    setFestival(SIMPLELIST);
    console.log(festival);
    setClickPage(true)
  }
  
  useEffect(() => {
    setFestivalList(SIMPLELIST);
  })

  return (
    //? 전체 테이블
    <Box sx={{ width: '55%', height: '100%', mr:'5%', backgroundColor:'' }}>
      <Box sx={{ pt: '20px', pl: '20px', display: 'flex'}}>
        <MonthAndAreaButton setFestivalList={setFestivalList} />
      </Box>
      <Box sx = {{ m: '10px',backgroundColor: '#FFFFFF'}}>
        <Box sx={{ pt: '10px', pb: '10px', m: '10px'}}>
          <Grid container spacing={1}>
            {/* //? Grid에 xs={6}을 넣어서 2행 2열을 만듦. */}

            {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem onClick={() => onClickPageHandler()} item={item as IPreviewFestivalSimpleListItem} /></Grid>))}

          </Grid>
        </Box>
      </Box>
      <Box sx={{ pt: '20px', display: 'flex', justifyContent: 'center' }}>
        <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
      </Box>
  </Box>
  )
}
