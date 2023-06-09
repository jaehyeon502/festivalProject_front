import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response';
import { GetFestivalReviewBoardListResponseDto } from 'src/apis/response/board';
import { GetInterstFestivalListResponseDto } from 'src/apis/response/festival';
import InterestedFestivalListItem from 'src/components/InterestedFestivalListItem';
import FestivalReviewBoardList from 'src/components/FestivalReviewBoardList';
import { GET_FESTIVAL_REVIEWBOARD_LIST_URL, GET_INTERESTED_FESTIVAL_LIST_URL, authorizationHeader } from 'src/constants/api';
import { usePagingHook } from 'src/hooks';
import { useFestivalNumberStore } from 'src/stores';
import { getpagecount } from 'src/utils';

interface Props {
  clickPage: boolean;
  setClickPage: React.Dispatch<React.SetStateAction<boolean>>
}
export default function FestivalBoard({ setClickPage, clickPage }: Props) {

  //              HOOK              //
  const [cookies] = useCookies();
  const accessToken = cookies.accessToken;
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(2);
  const { festivalNumber } = useFestivalNumberStore();

  //          EVENT HANDLER           //
  const getInterestedFestivalList = (accessToken: string) => {
    axios
      .get(GET_INTERESTED_FESTIVAL_LIST_URL, authorizationHeader(accessToken))
      .then((response) => getInterestedFestivalListResponseHandler(response))
      .catch((error) => getInterestedFestivalErrorHandler(error))
  }

  const getFestivalReviewBoardList = () => {
    axios
      .get(GET_FESTIVAL_REVIEWBOARD_LIST_URL(festivalNumber as number))
      .then((response) => getFestivalReviewBoardListResponseHandler(response))
      .catch((error) => getFestivalReivewBoardListErrorHandler(error))
  }


  //           Response Handler           //
  const getInterestedFestivalListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetInterstFestivalListResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data);
  }

  const getFestivalReviewBoardListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFestivalReviewBoardListResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data);
    setClickPage(true);
  }

  //          Error Handler          //
  const getInterestedFestivalErrorHandler = (error: any) => console.log(error.message);
  const getFestivalReivewBoardListErrorHandler = (error: any) => console.log(error.message);

  //          Use effect        //
  useEffect(() => {
    getInterestedFestivalList(accessToken)
  }, [])

  useEffect(() => {
    getFestivalReviewBoardList();
  }, [festivalNumber])

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ pt: '20px', pb: '80px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: '50px' }}>
          {!clickPage ?
            (<Typography sx={{ fontSize: '36px', fontWeight: 900, color: '#222' }}>관심있는 축제</Typography>) :
            (<Typography sx={{ fontSize: '36px', fontWeight: 900, color: '#222' }}>후기 게시글</Typography>)}

          <Box sx={{ width: '30px', height: '4px', backgroundColor: '#ff9f40', mt: '5px' }}></Box>
        </Box>
        <Box>
          <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}  >
            <Grid item sm={12} md={8}  >

              <Stack spacing={2}>
                {!clickPage ?
                  (<> {viewList.map((festivalList) => (<InterestedFestivalListItem festivalList={festivalList as GetInterstFestivalListResponseDto} onClick={() => setClickPage(true)} />))}</>)
                  :
                  (<> {viewList.map((festivalBoardList) => (<FestivalReviewBoardList festivalBoardList={festivalBoardList as GetFestivalReviewBoardListResponseDto} />))} </>)
                }
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
          <Pagination sx={{ mt: '20px', ml: '20px', mr: '20px' }} page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
      </Box>
    </Box>
  )
}