import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import FestivalSimpleListItem from 'src/compnents/FestivalSimpleListItem';
import { usePagingHook } from 'src/hooks';
import { IPreviewFestivalSimpleListItem } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import { getpagecount } from 'src/utils';


export default function MainLeftContent() {
  const [areaAndMonth, setAreaAndMonth] = useState<string>('');
  const [month, setMonth] = useState<string>('');

  
  const { festivalList, viewlist, pagenumber, onpageHandler, COUNT, setFestivalList } = usePagingHook(3);

  
  const areaAndMonthChange = (event: SelectChangeEvent) => {
    setAreaAndMonth(event.target.value as string);
  }

  const monthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  useEffect(() => {
    setFestivalList(SIMPLELIST);
  })

  return (
    //? 전체 테이블
    <Box sx={{ width: '55%', height: '100%', mr:'5%', backgroundColor:'#FFFFFF' }}>
      <Box sx={{ pt: '10px', pl: '20px', display: 'flex'}}>
        <Box>
          {/* //? 월별 & 지역별 */}
          <FormControl sx={{ width: '150px', height: '70px'}}>
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
        {/* //?월별  */}
        <FormControl sx={{ width: '100px', height: '70px', ml: '20px'}}>
          <InputLabel >월별</InputLabel>
          <Select
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
      <Box sx = {{ backgroundColor: '#FFFFFF'}}>
        <Box sx={{ pt: '1px', pb: '10px' }}>
          <Grid container spacing={4}>
            <Grid item sm={10} md={12}>
              <Stack spacing={1}>
                {viewlist.map((item) => (<FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} />))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination page={pagenumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onpageHandler(value)} />
      </Box>
  </Box>
  )
}
