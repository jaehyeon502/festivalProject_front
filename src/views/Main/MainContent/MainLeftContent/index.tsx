import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { GetFestivalListResponseDto } from 'src/apis/response/festival';
import FestivalListItem from 'src/components/FestivalListItem';
import usePagingHook from 'src/hooks/paging.hook';
import { getPageCount } from 'src/utils';


export default function MainLeftContent() {
  const [areaAndMonth, setAreaAndMonth] = useState<string>('');
  const [month, setMonth] = useState<string>('');

  
  const { viewList, pageNumber, festivalList, setFestivalList, onPageHandler, COUNT } = usePagingHook(5);

  
  const areaAndMonthChange = (event: SelectChangeEvent) => {
    setAreaAndMonth(event.target.value as string);
  }

  const monthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  return (
    <Box sx={{ width: '55%', height: '100%', mr:'5%', backgroundColor:'beige' }}>
      <Box sx={{ pt: '20px', pl: '20px', display: 'flex'}}>
        <Box>
          <FormControl sx={{ width: '150px', height: '80px'}}>
            <InputLabel>월별 & 지역별</InputLabel>
            <Select
              value={areaAndMonth}
              label="월별 & 지역별"
              onChange={areaAndMonthChange}
            >
              <MenuItem value={1}>월별</MenuItem>
              <MenuItem value={2}>지역별</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ width: '100px', height: '80px', ml: '20px'}}>
          <InputLabel id="demo-simple-select-label">월별</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            onChange={monthChange}
          >
            <MenuItem value={1}>1월</MenuItem>
            <MenuItem value={2}>2월</MenuItem>
            <MenuItem value={3}>3월</MenuItem>
            <MenuItem value={4}>4월</MenuItem>
            <MenuItem value={5}>5월</MenuItem>
            <MenuItem value={6}>6월</MenuItem>
            <MenuItem value={7}>7월</MenuItem>
            <MenuItem value={8}>8월</MenuItem>
            <MenuItem value={9}>9월</MenuItem>
            <MenuItem value={10}>10월</MenuItem>
            <MenuItem value={11}>11월</MenuItem>
            <MenuItem value={12}>12월</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx = {{ p: '40px 120px', backgroundColor: 'white'}}>
        <Box>
          <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>최신 게시물</Typography>
        </Box>
        <Box sx={{ pt: '20px', pb: '20px' }}>
          <Grid container spacing={3}>
            <Grid item sm={12} md={8}>
              <Stack spacing={2}>
                {viewList.map((festivalItem) => (<FestivalListItem item={festivalItem as GetFestivalListResponseDto} />))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination page={pageNumber} count={getPageCount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
      </Box>
  </Box>
  )
}
