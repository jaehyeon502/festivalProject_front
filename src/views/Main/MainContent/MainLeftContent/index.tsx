import { Box, Grid, Pagination } from '@mui/material'
import React, { useEffect } from 'react';
import { useState } from 'react'
import FestivalSimpleListItem from 'src/components/FestivalSimpleListItem';
import MonthAndAreaButton from 'src/components/MonthAndAreaIButton';
import { usePagingHook } from 'src/hooks';
import { Festival } from 'src/interfaces';
import { getpagecount } from 'src/utils';

import FestivalOnclickChangeItem from 'src/components/FestivalOnclickChangeItem';
import { useFestivalNumberStore } from 'src/stores';
interface Props {
  clickPage: boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainLeftContent({ setClickPage, clickPage }: Props) {
  //         HOOK             //

  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  const {festivalNumber, setFestivalNumber} = useFestivalNumberStore();


  const onFestivalItemClick = (festival: Festival) => {

    setSelectedFestival(festival);
    setClickPage(true);
  }

  useEffect(() => {
    console.log(festivalNumber);
  }, [festivalNumber]);

  return (
    //? 전체 테이블
    //? selectedFestival를 만들어서 true이면 실행
    //? onClick이 아닌 setClickPage에 setClickPage를 넣어주고 item에는 selectedFestival을 넣어줬다(새로 만들지 않았어도 됐다.)
    <Box sx={{ width: '55%', height: '100%', mr: '5%', backgroundColor: '' }}>
      {clickPage && selectedFestival ? (
        <FestivalOnclickChangeItem setClickPage={setClickPage} item={selectedFestival} />
      )
        : (
          <Box>
            <Box sx={{ pt: '20px', pl: '20px', display: 'flex' }}>
              <MonthAndAreaButton setFestivalList={setFestivalList} />
            </Box>
            <Box sx={{ m: '10px', backgroundColor: '#FFFFFF' }}>
              <Box sx={{ pt: '10px', pb: '10px', m: '10px' }}>
                <Grid container spacing={1}>
                  {/* //? Grid에 xs={6}을 넣어서 2행 2열을 만듦. */}
                  {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem item={item as Festival} onClick={() => onFestivalItemClick(item as Festival)} /></Grid>))}
                </Grid>
              </Box>
            </Box>
            <Box sx={{ pt: '20px', display: 'flex', justifyContent: 'center' }}>
              <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
            </Box>
          </Box>
        )}
    </Box>
  )
}