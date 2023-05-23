import { Box, Grid, Pagination, SelectChangeEvent } from '@mui/material'
import React, { useEffect } from 'react';
import { useState } from 'react'
import FestivalSimpleListItem from 'src/components/FestivalSimpleListItem';
import MonthAndAreaButton from 'src/components/MonthAndAreaIButton';
import { usePagingHook } from 'src/hooks';
import { Festival } from 'src/interfaces';
import { getpagecount } from 'src/utils';

import FestivalOnclickChangeItem from 'src/components/FestivalOnclickChangeItem';
import { useFestivalNumberStore } from 'src/stores';
import { GetOneFestivalResponseDto } from 'src/apis/response/festival';
import axios, { AxiosResponse } from 'axios';
import { GET_ONE_FESTIVAL_URL } from 'src/constants/api';
import ResponseDto from 'src/apis/response';
import { useLocation } from 'react-router-dom';
interface Props {
  clickPage: boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainLeftContent({ setClickPage, clickPage }: Props) {

  const [ showSameFestival, setShowSameFestival] = useState<string>('');
  const [festivalArea, setFestivalArea] = useState<string>('');

  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const [selectedFestival, setSelectedFestival] = useState<GetOneFestivalResponseDto | null>(null);

  const { festivalNumber, setFestivalNumber } = useFestivalNumberStore();

  const onFestivalItemClick = () => {
    setClickPage(true);
  }
//         Event Handler         //
  const getOneFestival = () => {
    axios
      .get(GET_ONE_FESTIVAL_URL(festivalNumber as number))
      .then((response) => getOneFestivalResponseHandler(response))
      .catch((error) => getOnefestivalErrorHandler(error))
  }

  const sameLocal = (event: SelectChangeEvent) => {
    setShowSameFestival(event.target.value as string)
    
    axios.get(`http://localhost:4040/api/festival/area/${festivalArea}`)
      .then((response) => getShowSameFestivalResponseHandler(response))
      .catch((error) => getShowSameFestivalErrorHandler(error))
  }

  //         Response Handler         //
  const getOneFestivalResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetOneFestivalResponseDto>
    if (!result || !data) return;
    setSelectedFestival(data);
  }

  const getShowSameFestivalResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetOneFestivalResponseDto>
    if(!result || !data) return;
    setFestivalArea(response.data.data);
  }

  //         Error Handler        //
  
  const getOnefestivalErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const getShowSameFestivalErrorHandler = (error: any) => {
    console.log(error.message);
  }

  //         Use Effect          //
  useEffect(() => {

    if (clickPage && festivalNumber) getOneFestival();

    //? 어디선가 clickPage가 true로 계속 실행이 되고 있어서
    //? return문으로 강제적으로 clickPage가 true이면
    //? setClickPage를 false로 돌려줌
    //? 완전한 기능도 아님. 자세히보면 0.1초 동안 
    //? 다른 페이지가 떴다가 메인 화면으로 바뀌는 것을 확인 할 수 있음.
    return () => {
      setSelectedFestival(null);
      if (clickPage) setClickPage(false);
    };

  }, [festivalNumber, clickPage, festivalArea]);

  return (
    //? 전체 테이블
    //? selectedFestival를 만들어서 true이면 실행
    //? onClick이 아닌 setClickPage에 setClickPage를 넣어주고 item에는 selectedFestival을 넣어줬다(새로 만들지 않았어도 됐다.)
    <Box sx={{ width: '55%', height: '100%', mr: '5%', backgroundColor: '' }}>
      {clickPage && selectedFestival ? (
        <FestivalOnclickChangeItem setClickPage={setClickPage} item={selectedFestival as Festival} />
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
                  {viewList.map((item) => (<Grid item xs={6}><FestivalSimpleListItem item={item as GetOneFestivalResponseDto} onClick={() => onFestivalItemClick()} /></Grid>))}
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
