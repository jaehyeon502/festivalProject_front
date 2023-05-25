import { KeyboardEvent, useEffect, useState } from 'react'
import { Box, Divider, Fab, IconButton, Input, Typography } from '@mui/material'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { PatchFreeBoardRequestDto } from 'src/apis/request/freeboard';
import axios, { AxiosResponse } from 'axios';
import { GET_FREE_BOARD_URL, PATCH_FREE_BOARD_URL, authorizationHeader } from 'src/constants/api';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response';
import { GetFreeBoardResponseDto, PatchFreeBoardResponseDto } from 'src/apis/response/freeboard';
import { useSignInStore } from 'src/stores';
import { useImageUploadHook } from 'src/hooks';

export default function FreeBoardUpdateView() {

  //          Hook          //
  const navigator = useNavigate();

  const { signInUser } = useSignInStore();
  const { boardNumber } = useParams();
  const [cookies] = useCookies();

  const { boardImgUrl, setBoardImgUrl, onImageUploadChangeHandler, onImageUploadButtonHandler, imageRef } = useImageUploadHook();

  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');

  const accessToken = cookies.accessToken;

  //          Event Handler          //
  const onContentKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setBoardContent(boardContent + '\n');
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
    patchFreeBoard();
    navigator('/freeboard/list');
  }

  const getFreeBoard = () => {
    axios.get(GET_FREE_BOARD_URL(boardNumber as string))
      .then((response) => getFreeBoardResponse(response))
      .catch((error) => getFreeBoardError(error))
  }

  const patchFreeBoard = () => {
    const data: PatchFreeBoardRequestDto = { boardNumber: parseInt(boardNumber as string), boardTitle, boardContent, boardImgUrl };

    axios.patch(PATCH_FREE_BOARD_URL, data, authorizationHeader(accessToken))
      .then((response) => patchFreeBoardResponse(response))
      .catch((error) => patchFreeBoardError(error))
  }

  //          Response Handler          //
  const getFreeBoardResponse = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFreeBoardResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    const { boardTitle, boardContent, boardImgUrl, writerUserId } = data.freeBoard
    if (writerUserId !== signInUser?.userId) {
      alert('권한이 없습니다.');
      navigator('/');
      return;
    }

    setBoardTitle(boardTitle);
    setBoardContent(boardContent);
    if (boardImgUrl) setBoardImgUrl(boardImgUrl);
  }

  const patchFreeBoardResponse = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchFreeBoardResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    navigator(`/freeboard/detail/${boardNumber}`);
  }

  //          Error Handler          //
  const getFreeBoardError = (error: any) => console.log(error.message);
  const patchFreeBoardError = (error: any) => console.log(error.message);
  
  //          Use Effect          //
  useEffect(() => {
    if (!boardNumber) {
      navigator("/free-board/list");
      return;
    }

    if (!accessToken) {
      navigator("/auth/sign-in");
      return;
    }
    getFreeBoard();
  }, [])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0', height: '100%' }}>
      <Divider />
      <Box sx={{ ml: '200px', mr: '200px', p: '100px 50px', backgroundColor: '#ffffff' }}>
        <Box>
          <Box sx={{ mb: '220px', mr: '30px', ml: '30px', display: 'flex', justifyContent: 'space-between' }}>

            <Box>
            </Box>

            <Box >
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
              sx={{ fontSize: '34px', fontWeight: 600, color: '#2f4f4f'}} value={boardTitle}
              onChange={(event) => setBoardTitle(event.target.value)} />
            </Box>
            <Divider sx={{ mt: '35px', mb: '45px', ml: '20px', mr: '20px' }} />
            <Box>
            <Typography>
              <Input
                fullWidth disableUnderline placeholder='본문을 작성해주세요.'
                multiline minRows={10} value={boardContent}
                sx={{ fontSize: '18px', fontWeight: 600 }}
                onChange={(event) => setBoardContent(event.target.value)}
                onKeyPress={(event) => onContentKeyPressHandler(event)}/>
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