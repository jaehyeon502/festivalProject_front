import { Box, Grid, IconButton, IconButtonProps, Pagination, SelectChangeEvent, styled } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import {  useEffect, useState } from 'react'
import FestivalSimpleListItem from 'src/components/FestivalSimpleListItem';
import MonthAndAreaButton from 'src/components/MonthAndAreaIButton';
import { usePagingHook } from 'src/hooks';
import { IPreviewFestivalSimpleListItem } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import { useFestivalStore } from 'src/stores';
import { getpagecount } from 'src/utils';

import FestivalOnclickChangeItem from 'src/components/FestivalOnclickChangeItem';
interface Props {
  clickPage: boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MainLeftContent({ setClickPage, clickPage }: Props) {


  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const [festivalArea, setFestivalArea] = useState<string>('');

  const [selectedFestival, setSelectedFestival] = useState<IPreviewFestivalSimpleListItem | null>(null);



  //? onFestivalItemClick를 만들어 festival에 IPreviewFestivalSimpleListItem 데이터를 넣고
  //? setSelectedFestival에 festival을 넣어준다.
  const onFestivalItemClick = (festival: IPreviewFestivalSimpleListItem) => {
    setSelectedFestival(festival);
    setClickPage(true);
  }

  useEffect(() => {
    setFestivalList(SIMPLELIST);
  }, []);

  return (
    //? 전체 테이블
    //? selectedFestival를 만들어서 true이면 실행
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
                  {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem item={item as IPreviewFestivalSimpleListItem} onClick={() => onFestivalItemClick(item as IPreviewFestivalSimpleListItem)} /></Grid>))}
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
