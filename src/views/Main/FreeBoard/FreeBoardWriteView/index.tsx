import React, { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import {
  Box, Divider, Fab, FormControl,
  Grid, IconButton, Input, InputAdornment, OutlinedInput, Typography
} from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { Festival} from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import FestivalNameItemList from 'src/components/FestivalNameItemList';
import ClearIcon from '@mui/icons-material/Clear';
import axios, { AxiosResponse } from 'axios';
import { PostFreeBoardRequestDto } from 'src/apis/request/freeboard';
import { POST_FREE_BOARD_URL, authorizationHeader } from 'src/constants/api';
import ResponseDto from 'src/apis/response';
import { PostFreeBoardResponseDto } from 'src/apis/response/freeboard';
import { useCookies } from 'react-cookie';

export default function FreeBoardWriteView() {

  const [freeBoardTitle, setFreeBoardTitle] = useState<string>('');
  const [freeBoardContent, setFreeBoardContent] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [festivalNameList, setFestivalNameList] = useState<Festival[]>([]);

  const navigator = useNavigate();

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

  //          Event Handler          //
  const onContentKeyPressHandler = (event : KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setBoardContent(boardContent + '\n');
  }

  const PostFreeBoard = () => {
    const data: PostFreeBoardRequestDto = {freeBoardTitle, freeBoardContent, freeBoardImgUrl: ''};

    axios.post(POST_FREE_BOARD_URL, data, authorizationHeader(accessToken))
        .then((response) => PostFreeBoardResponse(response))
        .catch((error) => PostFreeBoardError(error))
  }

  const PostFreeBoardResponse = (response: AxiosResponse<any, any>) => {
    const {result, message, data} = response.data as ResponseDto<PostFreeBoardResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    navigator('/freeboard/list');
  }

  const PostFreeBoardError = (error: any) => {
    console.log(error.message);
  }

  const onBoardWriteHandler = () => {
    if (!freeBoardTitle.trim()) {
      alert('제목이 입력되지 않았습니다.')
      return;
    }
    if (!freeBoardContent.trim()) {
      alert('내용이 입력되지 않았습니다.')
      return;
    }
    PostFreeBoard();
  }

  useEffect(() => {
    setFestivalNameList(SIMPLELIST);
  }, [])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0', height : '100%' }}>
      <Divider />
      <Box sx={{ ml: '200px', mr: '200px', p: '100px 50px', backgroundColor: '#ffffff' }}>
        <Box>
          <Box sx={{ mb: '220px', mr: '30px', ml: '30px', display: 'flex', justifyContent: 'space-between' }}>

            <Box>
            </Box>

            <Box >
            </Box>

            <Box>
              <IconButton>
                <InsertPhotoOutlinedIcon />
              </IconButton>
              <Input placeholder='업로드는 Back과 연동 후에' />
            </Box>
          </Box>
        </Box>
        
            <Box>
            <Input fullWidth disableUnderline placeholder='제목을 작성해주세요.'
              sx={{ fontSize: '34px', fontWeight: 600, color: '#2f4f4f'}}
              onChange={(event) => setFreeBoardTitle(event.target.value)} />
            </Box>
            <Divider sx={{ mt: '35px', mb: '45px', ml: '20px', mr: '20px' }} />
            <Box>
            <Typography>
              <Input
                fullWidth disableUnderline placeholder='본문을 작성해주세요.'
                multiline minRows={1}
                sx={{ fontSize: '18px', fontWeight: 600 }}
                onChange={(event) => setFreeBoardContent(event.target.value)}
                onKeyPress={(event) => onContentKeyPressHandler(event)}/>
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