import React, { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import {
  Box, Divider, Fab, FormControl,
  Grid, IconButton, Input, InputAdornment, OutlinedInput, Typography
} from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { Festival } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import FestivalNameItemList from 'src/components/FestivalNameItemList';
import { useSignInStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useImageUploadHook } from 'src/hooks';
import axios, { AxiosResponse } from 'axios';
import { GET_REVIEW_BOARD_URL, PATCH_REVIEW_BOARD_URL, authorizationHeader } from 'src/constants/api';
import ResponseDto from 'src/apis/response';
import { GetReviewBoardResponseDto, PatchReviewBoardResponseDto } from 'src/apis/response/board';
import { PatchReviewBoardRequestDto } from 'src/apis/request/board';

export default function ReviewBoardUpdateView() {

  const { signInUser } = useSignInStore();
  const { reviewBoardNumber } = useParams();
  const [cookies] = useCookies();

  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [festivalNumber, setFestivalNumber] = useState<number>(1);
  const { freeBoardImgUrl, setFreeBoardImgUrl, onImageUploadButtonHandler, onImageUploadChangeHandler, imageRef } = useImageUploadHook();

  const [show, setShow] = useState<boolean>(false);
  const [festivalNameList, setFestivalNameList] = useState<Festival[]>([]);
  
  //Todo selectedFestivalName을 반환해주는 api가 없다, festivalNumber만 반환
  const [selectedFestivalName, setSelectedFestivalName] = useState<string>('');
  const accessToken = cookies.accessToken;

  const navigator = useNavigate();

  let buttonClick = false;

  //          Event Handler          //
  const getReivewBoard = () => {
    axios.get(GET_REVIEW_BOARD_URL(reviewBoardNumber as string))
      .then((response) => getReviewBoardResponseHandler(response))
      .catch((error) => getReivewBoardErrorHandler(error))
  }

  const patchReviewBoard = () => {
    const data: PatchReviewBoardRequestDto = {
      festivalNumber,
      boardNumber: parseInt(reviewBoardNumber as string),
      boardTitle,
      boardContent,
      boardImgUrl: freeBoardImgUrl
    };

    axios.patch(PATCH_REVIEW_BOARD_URL, data, authorizationHeader(accessToken))
      .then((response) => patchReviewBoardResponseHandler(response))
      .catch((error) => patchReviewBoardErrorHandler(error))
  }

  const onClickFestivalSearchButton = (event: MouseEvent<HTMLButtonElement>) => {
    buttonClick = true;
    setShow(true);
  };

  //? 검색창 외 화면 아무 곳이나 누를 경우 검색창 사라지게
  const onCloseFestivalSearchHandler = () => {
    if (buttonClick) {
      buttonClick = false;
      return;
    };
    setShow(false);
  }

  const onFestivalSearchKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
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
    patchReviewBoard();
    navigator(`/reviewBoard/detail/${reviewBoardNumber}`);
  }

  
  //          Response Handler          //
  const getReviewBoardResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetReviewBoardResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    const { boardTitle, boardContent, boardImgUrl, writerId, festivalNumber } = data.board;

    if (writerId !== signInUser?.userId) {
      alert('권한이 없습니다.');
      navigator('/');
      return;
    }
    
    setBoardTitle(boardTitle);
    setBoardContent(boardContent);
    if(boardImgUrl) setFreeBoardImgUrl(boardImgUrl);
  }

  const patchReviewBoardResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchReviewBoardResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    navigator(`/reviewBoard/detail/${reviewBoardNumber}`);
  }
  //          Error Handler          //
  const getReivewBoardErrorHandler = (error: any) => console.log(error.message);
  const patchReviewBoardErrorHandler = (error: any) => console.log(error.message);

  useEffect(() => {
    setFestivalNameList(SIMPLELIST);
    if (!reviewBoardNumber) navigator('/reivewBoard/list');
    if (!accessToken) navigator('/auth/sign-in');

    getReivewBoard();
  }, [])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }} onClick={onCloseFestivalSearchHandler}>
      <Divider />
      <Box sx={{ ml: '200px', mr: '200px', p: '100px 50px', backgroundColor: '#ffffff' }}>
        <Box>
          <Box sx={{ mb: '220px', mr: '30px', ml: '30px', display: 'flex', justifyContent: 'space-between' }}>

            <Box>
              <FormControl sx={{ width: '280px', ml: '20px', mb: '20px' }} variant="outlined">
                <OutlinedInput placeholder='검색어 관련 축제명은 연동 후에' onKeyPress={(event) => onFestivalSearchKeyPressHandler(event)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={onClickFestivalSearchButton}>
                        <SearchSharpIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ borderRadius: '20px' }} />

                {show ? (
                  <Box sx={{ width: '100%', height: '200px', border: '1px solid', fontSize: '15px', overflow : 'scroll', position : 'absolute', top : '56px' }}>
                    {festivalNameList.map((nameItem) => (
                      <Grid onClick={() => onClickFestivalNameHandler(nameItem.festivalNumber, nameItem.festivalName)}>
                        <FestivalNameItemList item={nameItem} />
                      </Grid>))}
                  </Box>
                ) : (<></>)}
              </FormControl>

            </Box>

            <Box sx={{ width: '310px', height: '30px', display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '18px' }}>축제 이름 : </Typography>
              </Box>

              <Box sx={{ width: '210px', height: '100%', border: '1px solid', display : 'flex', justifyContent : 'space-between' }}>
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
                  onKeyDown={(event) => onContentKeyPressHandler(event)}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box>
          <Input fullWidth disableUnderline placeholder='제목을 작성해주세요.'
            sx={{ fontSize: '34px', fontWeight: 600, color: '#2f4f4f'}}
            value = { boardTitle }
            onChange={(event) => setBoardTitle(event.target.value)} />
        </Box>
        <Divider sx={{ mt: '35px', mb: '45px', ml: '20px', mr: '20px' }} />
        <Box>
          <Typography>
            <Input
              fullWidth disableUnderline placeholder='본문을 작성해주세요.'
              multiline minRows={1}
              sx={{ fontSize: '18px', fontWeight: 600 }}
              value = { boardContent }
              onChange={(event) => setBoardContent(event.target.value)}
              onKeyPress={(event) => onContentKeyPressHandler(event)} />
            <Box sx = {{ width : '100%'}} component = 'img' src = {freeBoardImgUrl}></Box>
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