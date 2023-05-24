import { Box, Button, IconButton, OutlinedInput, Pagination, Stack, Typography } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { usePagingHook } from 'src/hooks';
import ReviewBoardListItem from 'src/components/ReviewBoardListItem';
import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { getpagecount } from 'src/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { GET_ALL_REVIEWBOARD_LIST_URL, GET_SEARCH_REVIEWBOARD_LIST } from 'src/constants/api';
import { GetReviewBoardListResponseDto, GetSearchReviewBoardListResponseDto } from 'src/apis/response/board';

export default function ReviewBoardListView() {

  //          HOOK          //
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);

  const navigator = useNavigate();

  const [searchTypeButton, setSearchTypeButton] = useState<boolean>(false);
  const [searchTypeName, setSearchTypeName] = useState<string>('최신순');
  const [searchView, setSearchView] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchWordValue, setSearchWordValue] = useState<string>('');
  const searchType = ['최신순', '조회수'];

  const [errorMessage, setErrorMessage] = useState<string>('');

  const path = useLocation();

  //          Event Handler          //
  const onClickSearchTypeButtonHandler = () => {
    if (searchTypeButton === true) {
      setSearchTypeButton(false);
      return;
    }
    setSearchTypeButton(true);
    return;
  }

  const onSearchKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setSearchView(true);
    setSearchWordValue(searchWord);
    getSearchReviewBoardList();
    setSearchWord('');
  }
  const onSearchHandler = () => {
    setSearchView(true);
    setSearchWordValue(searchWord);
    getSearchReviewBoardList();
    if (searchWord === '') alert("검색어 입력해주세요");
    setSearchWord('');

  }

  const onClickSearchType = (typeName: string) => {
    if (typeName === '최신순') setSearchTypeName(typeName);
    else if (typeName === '조회수') setSearchTypeName(typeName);
    setSearchTypeButton(false);
    return;
  }

  const getAllReviewBoardList = () => {
    axios
      .get(GET_ALL_REVIEWBOARD_LIST_URL)
      .then((response) => getReviewBoardListResponseHandler(response))
      .catch((error) => getReviewBoardErrorHandler(error))
  }

  const setSearchWordHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setSearchWord(value);
  }

  const getSearchReviewBoardList = () => {
    axios
      .get(GET_SEARCH_REVIEWBOARD_LIST(searchWord as string))
      .then((response) => getSearchReviewBoardListResponseHandler(response))
      .catch((error) => getSearchReviewBoardListErrorHandler(error))
  }

  //         Response Handler           //
  const getReviewBoardListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetReviewBoardListResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data)
  }

  const getSearchReviewBoardListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetSearchReviewBoardListResponseDto[]>
    if (!result || data === null) {
      setFestivalList([]);
      setErrorMessage(message);
      return;
    }
    if (searchTypeName === '조회수') {
      const viewcount = data.sort((a, b) => b.viewCount - a.viewCount);
      setFestivalList(viewcount);
    }
    setFestivalList(data);
  }

  //          Error Handler          //
  const getReviewBoardErrorHandler = (error: any) => console.log(error.message);
  const getSearchReviewBoardListErrorHandler = (error: any) => console.log(error.message);

  //         Use Effect          //
  useEffect(() => {
    getAllReviewBoardList();
    setSearchView(false);
  }, [path])

  return (
    <Box>

      <Box sx={{ mt: '30px', ml: '60px', mr: '60px', mb: '20px', display: 'flex', justifyContent: 'space-between' }}>

        {!searchView ?
          (<> <Typography sx={{ fontSize: '44px', fontWeight: '700' }}>축제 후기 게시판</Typography></>) :
          (<> <Typography sx={{ fontSize: '44px', fontWeight: '700' }}>{searchWordValue}에 대한 검색 결과 입니다.</Typography></>)}
        <Box display='flex'>
          <Box>
            <OutlinedInput sx={{ width: '300px' }} value={searchWord} onChange={(event) => setSearchWordHandler(event)}
              onKeyPress={(event) => onSearchKeyPressHandler(event)}
              placeholder='검색명을 입력해 주세요.'
              endAdornment={
                <IconButton edge='end'>
                  <SearchSharpIcon
                    onClick={() => onSearchHandler()} />
                </IconButton>
              } />
          </Box>
          <Box>
            {
              searchTypeButton ?
                <Box sx={{ width: '180px' }}>
                  <OutlinedInput value={searchTypeName}
                    endAdornment={
                      <IconButton edge='end' onClick={onClickSearchTypeButtonHandler}>
                        <ArrowDropUpIcon sx={{ width: '40px', height: '40px' }} />
                      </IconButton>
                    } />
                  <Box sx={{ width: '178px', position: 'absolute', top: '150px', border: '1px solid', borderTop: 'none' }}>
                    {searchType.map((type) => <Box onClick={() => onClickSearchType(type)} sx={{ p: '3px', fontWeight: 550 }}>{type}</Box>)}
                  </Box>
                </Box>
                :
                <OutlinedInput sx={{ width: '180px' }} value={searchTypeName}
                  endAdornment={
                    <IconButton edge='end' onClick={onClickSearchTypeButtonHandler}>
                      <ArrowDropDownIcon sx={{ width: '40px', height: '40px' }} />
                    </IconButton>
                  } />
            }
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: '10px', ml: '300px', mr: '300px', backgroundColor: 'skyblue' }}>
        <Stack sx={{ p: '10px' }}>
          {!searchView ?
            (<>{viewList.map((searchView) => (<ReviewBoardListItem item={searchView as GetSearchReviewBoardListResponseDto} />))}</>) :
            viewList.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '416px' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>{errorMessage}</Typography>
              </Box>
            ) :
              (<> {viewList.map((reviewBoardItem) => (<ReviewBoardListItem item={reviewBoardItem as GetReviewBoardListResponseDto} />))}</>)
          }
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ width: '120px', height: '50px' }}>
        </Box>
        <Box sx={{ mt: '18px', mb: '18px' }}>
          <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)}></Pagination>
        </Box>
        <Box sx={{ width: '120px', height: '50px', mt: '12px' }}>
          <Button onClick={() => navigator('/reviewBoard/write')}
            sx={{ backgroundColor: 'skyblue', color: 'white', fontSize: '18px', fontWeight: 550 }}>게시물 작성</Button>
        </Box>
      </Box>
    </Box>
  )
}
