import { Box, Button, IconButton, Input, OutlinedInput, Pagination, Stack, Typography } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { usePagingHook } from 'src/hooks';
import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { getpagecount } from 'src/utils';
import { useNavigate } from 'react-router-dom';
import FreeBoardListITem from 'src/components/FreeBoardListItem';
import axios, { AxiosResponse } from 'axios';
import { GET_FREE_BOARD_LIST, GET_SEARCH_FREE_BOARD_LIST_URL} from 'src/constants/api';
import { GetFreeBoardListResponseDto, GetSearchFreeBoardListResponseDto } from 'src/apis/response/freeboard';
import ResponseDto from 'src/apis/response';
import {GetSearchReviewBoardListResponseDto } from 'src/apis/response/board';

export default function FreeBoardListView() {

  //          HOOK          //
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const navigator = useNavigate();

  const [searchTypeButton, setSearchTypeButton] = useState<boolean>(false);
  const [searchTypeName, setSearchTypeName] = useState<string>('최신순');
  const [searchView, setSearchView] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchWordValue, setSearchWordValue] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const searchType = ['최신순', '조회수', '제목 + 내용'];

  //          Event Handler          //
  const onClickSearchTypeButtonHandler = () => {
    if (searchTypeButton === true) {
      setSearchTypeButton(false);
      return;
    }
    setSearchTypeButton(true);
    return;
  }

  const onSearchKeyPressHandler = (event : KeyboardEvent<HTMLDivElement>) => {
    if(event.key !== 'Enter') return;
    setSearchView(true);
    setSearchWordValue(searchWord);
    getSearchFreeBoardList();
    setSearchWord('');
  }

  const onSearchHandler = () => {
    setSearchView(true);
    setSearchWordValue(searchWord);
    getSearchFreeBoardList();
    if (searchWord === '') alert("검색어 입력해주세요");
    setSearchWord('');
  }

  const setSearchWordHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setSearchWord(value);
  }

  const getSearchFreeBoardList = () => {
    axios.get(GET_SEARCH_FREE_BOARD_LIST_URL(searchWord as string))
      .then((response) => getSearchFreeBoardListResponsHandler(response))
      .catch((error) => getSEarchFreeBoardListErrorHandelr(error))
  }

  const getFreeBoardList = () => {
    axios.get(GET_FREE_BOARD_LIST)
      .then((response) => getFreeBoardListResponse(response))
      .catch((error) => getFreeBoardListError(error))
  }

  //          Response Handler          //
  const getFreeBoardListResponse = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFreeBoardListResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data);
  }

  const getSearchFreeBoardListResponsHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetSearchReviewBoardListResponseDto[]>
    if (!result || data === null) {
      setFestivalList([]);
      return;
    }
    if (searchTypeName === '조회수') {
      const viewcount = data.sort((a, b) => b.viewCount - a.viewCount);
      setFestivalList(viewcount);
    }
    setFestivalList(data);
  }

  //          Error Handler          //
  const getFreeBoardListError = (error: any) => console.log(error.message);
  const getSEarchFreeBoardListErrorHandelr = (error: any) => console.log(error.message);

  const onClickSearchType = (typeName: string) => {
    if (typeName === '최신순') setSearchTypeName(typeName);
    else if (typeName === '조회수') setSearchTypeName(typeName);
    setSearchTypeButton(false);
    return;
  }

  useEffect(() => {
    getFreeBoardList();
  }, [])
  return (
    <Box>
      <Box sx={{ mt: '30px', ml: '60px', mr: '60px', mb: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {!searchView ?
          (<> <Typography sx={{ fontSize: '44px', fontWeight: '700' }}>자유 게시판</Typography></>) :
          (<> <Typography sx={{ fontSize: '44px', fontWeight: '700' }}>{searchWordValue}에 검색 결과 입니다.</Typography></>)}
        <Box display='flex'>
          <Box>
            <OutlinedInput sx={{ width: '300px' }}
              value={searchWord}
              onChange={(event) => setSearchWordHandler(event)}
              onKeyPress={(event) => onSearchKeyPressHandler(event)}
              placeholder='검색명을 입력해 주세요.'
              endAdornment={
                <IconButton edge='end'>
                  <SearchSharpIcon onClick={() => onSearchHandler()} />
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
            (<>{viewList.map((searchView) => (<FreeBoardListITem item={searchView as GetSearchFreeBoardListResponseDto} />))}</>) :
            viewList.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '416px' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>{errorMessage}</Typography>
              </Box>
            ) :
              (<> {viewList.map((freeBoardItem) => (<FreeBoardListITem item={freeBoardItem as GetFreeBoardListResponseDto} />))}</>)
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
          <Button onClick={() => navigator('/freeboard/write')}
            sx={{ backgroundColor: 'skyblue', color: 'white', fontSize: '18px', fontWeight: 550 }}>게시물 작성</Button>
        </Box>
      </Box>
    </Box>
  )
}

