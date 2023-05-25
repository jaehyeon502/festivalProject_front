import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import { Box, Divider, Fab, FormControl, Grid, IconButton, Input, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import FestivalNameItemList from 'src/components/FestivalNameItemList';
import ClearIcon from '@mui/icons-material/Clear';
import axios, { AxiosResponse } from 'axios';

import { GET_FESTIVALNAME_LIST, GET_FESTIVALNAME_SEARCH_LIST, POST_REVIEW_BOARD_URL, authorizationHeader } from 'src/constants/api';
import { PostReviewBoardRequestDto } from 'src/apis/request/board';
import { useCookies } from 'react-cookie';
import { PostReviewBoardResponseDto } from 'src/apis/response/board';
import ResponseDto from 'src/apis/response';

import { GetFestivalNameListResponseDto, GetFestivalSearchNameResposneDto } from 'src/apis/response/festival';
import { useImageUploadHook } from 'src/hooks';


export default function ReviewBoardWriteView() {

  //          Hook          //
  const { boardImgUrl, onImageUploadChangeHandler, onImageUploadButtonHandler, imageRef } = useImageUploadHook();
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');

  const [festivalNumber, setFestivalNumber] = useState<number>(1);

  const [show, setShow] = useState<boolean>(false);
  const [festivalNameList, setFestivalNameList] = useState<GetFestivalNameListResponseDto[]>([]);

  const [selectedFestivalName, setSelectedFestivalName] = useState<string>('');

  const [cookies] = useCookies();

  const [searchName, setSearchName] = useState<string>('');

  const accessToken = cookies.accessToken;

  let buttonClick = false;

  const navigator = useNavigate();

  //          Event Handler          //
  const onClickFestivalSearchButton = (event: MouseEvent<HTMLButtonElement>) => {
    buttonClick = true;
    setShow(true);
  };

  const onClickFestivalSearchBox = (event: MouseEvent<HTMLDivElement>) => {
    buttonClick = true;
  }

  const postBoard = () => {
    const data: PostReviewBoardRequestDto = { festivalNumber, boardTitle, boardContent, boardImgUrl };

    axios.post(POST_REVIEW_BOARD_URL, data, authorizationHeader(accessToken))
      .then((response) => postBoardResponseHandler(response))
      .catch((error) => postBoardErrorHandler(error))
  }

  const onCloseFestivalSearchHandler = () => {
    if (buttonClick) {
      buttonClick = false;
      return;
    };
    setShow(false);
  }

  const onFestivalSearchKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    buttonClick = true;
    setShow(true);
  };

  const onContentKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setBoardContent(boardContent + '\n');
  }

  const onClickFestivalNameHandler = (festivalNumber: number, festivalName: string) => {

    setFestivalNumber(festivalNumber);
    setSelectedFestivalName(festivalName);
    setShow(false);
  }

  const onDeleteFestivallNameHandler = () => {
    setSelectedFestivalName('');
  }

  const onBoardWriteHandler = () => {
    if (!boardTitle.trim()) {
      alert('제목이 입력되지 않았습니다.')
      return;
    }
    if (!boardContent.trim()) {
      alert('내용이 입력되지 않았습니다.')
      return;
    }
    if (!selectedFestivalName.trim()) {
      alert('축제명이 선택되지 않았습니다.')
      return;
    }
    postBoard();
  }

  const getFestivalNameList = () => {
    axios
      .get(GET_FESTIVALNAME_LIST)
      .then((response) => getFestivalNameListResponseHandler(response))
      .catch((error) => getFestivalNameListErrorHandler(error))
  }

  const getFestivalSearchName = () => {
    axios
      .get(GET_FESTIVALNAME_SEARCH_LIST(searchName as string))
      .then((response) => getSearchFestivalNameResponseHandler(response))
      .catch((error) => getSearchFestivalNameErrorHandler(error))
  }

  //          Response Handler          //
  const postBoardResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PostReviewBoardResponseDto>;
    if (!result || !data) {
      alert(message);
      return;
    }

    navigator('/reviewBoard/list')
  }

  const getFestivalNameListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFestivalNameListResponseDto[]>
    if (!result || data === null) return;
    setFestivalNameList(data);
  }

  const getSearchFestivalNameResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFestivalSearchNameResposneDto[]>
    if (!result || data === null) return;
    setFestivalNameList(data);
  }

  //          Error Handler          //
  const postBoardErrorHandler = (error: any) => console.log(error.message);
  const getFestivalNameListErrorHandler = (error: any) => console.log(error.message);
  const getSearchFestivalNameErrorHandler = (error: any) => console.log(error.message);

  //          Use Effect          //
  useEffect(() => {
    if (searchName) {
      getFestivalSearchName();
    }
    getFestivalNameList();
  }, [searchName])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }} onClick={onCloseFestivalSearchHandler}>
      <Divider />
      <Box sx={{ ml: '200px', mr: '200px', p: '100px 50px', backgroundColor: '#ffffff' }}>
        <Box>
          <Box sx={{ mb: '220px', mr: '30px', ml: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <Box onClick={onClickFestivalSearchBox}>
              <FormControl sx={{ width: '280px', ml: '20px', mb: '20px' }} variant="outlined">
                <OutlinedInput placeholder='축제 이름을 검색해 주세요' onChange={(event) => setSearchName(event.target.value)} onKeyPress={(event) => onFestivalSearchKeyPressHandler(event)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={onClickFestivalSearchButton}>
                        <SearchSharpIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ borderRadius: '20px' }} />

                {show ? (
                  <Box sx={{ width: '100%', height: '200px', border: '1px solid', fontSize: '15px', overflow: 'scroll', position: 'absolute', top: '56px' }}>
                    {festivalNameList.map((nameItem) => (
                      <Grid onClick={() => onClickFestivalNameHandler(nameItem.festivalNumber, nameItem.festivalName)}>
                        <FestivalNameItemList item={nameItem} />
                      </Grid>))}
                  </Box>
                ) : (<></>)}
              </FormControl>
            </Box>

            <Box sx={{ width: '340px', height: '30px', display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '18px' }}>축제 이름 : </Typography>
              </Box>

              <Box sx={{ width: '240px', height: '30px', border: '1px solid', display: 'flex', justifyContent: 'space-between', whiteSpace: 'nowrap' }}>
                <Typography sx={{ fontSize: '18px' }}>{selectedFestivalName}</Typography>
                <IconButton onClick={onDeleteFestivallNameHandler}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => onImageUploadButtonHandler()}>
                <InsertPhotoOutlinedIcon />
                <input
                  ref={imageRef}
                  hidden type='file'
                  accept='image/*'
                  onChange={(event) => onImageUploadChangeHandler(event)}
                  onKeyDown={(event) => onContentKeyPressHandler(event)} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box>
          <Input fullWidth disableUnderline placeholder='제목을 작성해주세요.'
            sx={{ fontSize: '34px', fontWeight: 600, color: '#2f4f4f' }}
            onChange={(event) => setBoardTitle(event.target.value)} />
        </Box>
        <Divider sx={{ mt: '35px', mb: '45px', ml: '20px', mr: '20px' }} />
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'start' }}></Box>
          <Typography >
            <Input
              fullWidth disableUnderline placeholder='본문을 작성해주세요.'
              multiline minRows={10}
              sx={{ fontSize: '18px', fontWeight: 600 }}
              onChange={(event) => setBoardContent(event.target.value)}
              onKeyPress={(event) => onContentKeyPressHandler(event)} />
            <Box sx={{ width: '50%' }} component='img' src={boardImgUrl}></Box>
          </Typography>
        </Box>
      </Box>

      <Fab sx={{ position: 'fixed', zIndex: 999, bottom: '200px', right: '240px', backgroundColor: '#f0fff0' }}
        onClick={onBoardWriteHandler}>
        <ModeEditOutlineOutlinedIcon />
      </Fab>
    </Box>
  )
}
