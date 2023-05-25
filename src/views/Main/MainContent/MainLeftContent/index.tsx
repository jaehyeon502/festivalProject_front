import { Box, Grid, Pagination, SelectChangeEvent } from '@mui/material'
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import FestivalSimpleListItem from 'src/components/FestivalSimpleListItem';
import MonthAndAreaButton from 'src/components/MonthAndAreaButton';
import { usePagingHook } from 'src/hooks';
import { Festival } from 'src/interfaces';
import { getpagecount } from 'src/utils';

import FestivalOnclickChangeItem from 'src/components/FestivalOnclickChangeItem';
import { useFestivalNumberStore } from 'src/stores';
import { GetOneFestivalResponseDto } from 'src/apis/response/festival';
import axios, { AxiosResponse } from 'axios';
import { GET_ONE_FESTIVAL_URL } from 'src/constants/api';
import ResponseDto from 'src/apis/response';

interface Props {
  clickPage: boolean;
  setClickPage: Dispatch<SetStateAction<boolean>>
  selectedFestival: GetOneFestivalResponseDto | null;
  setSelectedFestival: Dispatch<SetStateAction<GetOneFestivalResponseDto | null>>
}

export default function MainLeftContent({ setClickPage, clickPage, selectedFestival, setSelectedFestival }: Props) {

  //         Hook         //
  const [showSameFestival, setShowSameFestival] = useState<string>('');
  const [festivalArea, setFestivalArea] = useState<string>('');

  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);

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

  //         Response Handler         //
  const getOneFestivalResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetOneFestivalResponseDto>
    if (!result || !data) return;
    setSelectedFestival(data);
  }

  //         Error Handler        //
  const getOnefestivalErrorHandler = (error: any) => console.log(error.message);

  //         Use Effect          //
  useEffect(() => {
    if (clickPage && festivalNumber) getOneFestival();
    console.log(viewList);
    return () => {
      setSelectedFestival(null);
      if (clickPage) setClickPage(false);
    };

  }, [festivalNumber, clickPage, festivalArea]);

  return (
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
