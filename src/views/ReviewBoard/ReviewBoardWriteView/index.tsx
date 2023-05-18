import React, { KeyboardEvent, MouseEvent, useEffect, useState, ChangeEvent, useRef } from 'react'
import {
  Box, Divider, Fab, FormControl,
  Grid, IconButton, Input, InputAdornment, OutlinedInput, Typography
} from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { Festival, } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import FestivalNameItemList from 'src/components/FestivalNameItemList';
import ClearIcon from '@mui/icons-material/Clear';
import axios, { AxiosResponse } from 'axios';
import { FILE_UPLOAD_URL, POST_REVIEW_BOARD_URL, authorizationHeader, multipartHeader } from 'src/constants/api';
import { PostReviewBoardRequestDto } from 'src/apis/request/board';
import { useCookies } from 'react-cookie';
import { PostReviewBoardResponseDto } from 'src/apis/response/board';
import ResponseDto from 'src/apis/response';

export default function ReviewBoardWriteView() {

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [boardImgUrl, setBoardImgUrl] = useState<string>('');
  const [festivalNumber, setFestivalNumber] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [festivalNameList, setFestivalNameList] = useState<Festival[]>([]);
  const [selectedFestivalName, setSelectedFestivalName] = useState<string>('');
  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

  let buttonClick = false;

  const navigator = useNavigate();

  //          Event Handler          //
  const onClickFestivalSearchButton = (event: MouseEvent<HTMLButtonElement>) => {

    buttonClick = true;
    setShow(true);
  };

  const onClickFestivalSearchBox = (event : MouseEvent<HTMLDivElement>) => {
    buttonClick = true;
  }

  const onImageUploadButtonHandler = () => {
    if(!imageRef.current) return;
    imageRef.current.click();
  }
  
  //? 이미지 파일 업로드
  const onImageUploadChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return;

    const data = new FormData();
    data.append('file', event.target.files[0]);

    axios.post(FILE_UPLOAD_URL, data, multipartHeader())
    .then((response) => imageUploadResponseHandler(response))
    .catch((error) => imageUploadErrorHandler(error));
  }

  //? 글 작성
  const postBoard = () => {
    //? requestDto에 정의된 변수명과 state명들이 일치해야한다.
    const data : PostReviewBoardRequestDto = { festivalNumber, boardTitle, boardContent, boardImgUrl};

    axios.post(POST_REVIEW_BOARD_URL, data, authorizationHeader(accessToken))
    .then((response) => postBoardResponseHandler(response))
    .catch((error) => postBoardErrorHandler(error))
    console.log('포보 실행')
  }
  //? 검색창 외 화면 아무 곳이나 누를 경우 검색창 사라지게
  const onCloseFestivalSearchHandler = () => {
    if(buttonClick) {
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

  const onContentKeyPressHandler = (event : KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setBoardContent(boardContent + '\n');
  }

  const onClickFestivalNameHandler = (festivalName : string ) => {
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
    if(!selectedFestivalName.trim()){
      alert('축제명이 선택되지 않았습니다.')
      return;
    }

    postBoard();
  }

  //          Response Handler          //
  const imageUploadResponseHandler = (response : AxiosResponse<any, any>) => {
    const imageUrl = response.data as string;
    if(!imageUrl) return;
    setBoardImgUrl(imageUrl);
  }

  const postBoardResponseHandler = (response : AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PostReviewBoardResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }

    navigator('/reviewBoard/list')
  }

  //          Error Handler          //
  const imageUploadErrorHandler = (error : any) => console.log(error.message);
  const postBoardErrorHandler = (error : any) => console.log(error.message);

  useEffect(() => {
    setFestivalNameList(SIMPLELIST);
  }, [])


  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }} onClick = {onCloseFestivalSearchHandler}>
      <Divider />
      <Box sx={{ ml: '200px', mr: '200px', p: '100px 50px', backgroundColor: '#ffffff' }}>
        <Box>
          <Box sx={{ mb: '220px', mr: '30px', ml: '30px', display: 'flex', justifyContent: 'space-between' }}>

            <Box onClick = {onClickFestivalSearchBox}>
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
                  <Box sx={{ width : '100%', height : '200px', border: '1px solid', fontSize: '15px', overflow : 'scroll', position : 'absolute', top : '56px' }}>
                    {/*//? 첫줄 nameItem은 객체, useEffect로 mock데이터에 festival의 전체 값을 일단 들고왔음
                    //? 클릭하면 nameItem 객체의 festivalName값을 매개변수로 전달
                    //? 셋째 줄 nameItem은 FestivalNameItemList(component)에서 선언된 festivalName, 2, 3줄은 같은 map 순서의 mock를 갖고있는 것 */}
                    {festivalNameList.map((nameItem) => ( 
                    <Grid onClick = {() => onClickFestivalNameHandler(nameItem.festivalName)}> 
                      <FestivalNameItemList item={nameItem}/>
                    </Grid>))}
                    {'스크롤 내리기'}
                  </Box>
                ) : (<></>)} 
              </FormControl>

            </Box>

            <Box sx={{ width: '320px', height : '30px', display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '18px' }}>축제 이름 : </Typography> 
              </Box>

              <Box sx={{ width: '220px', height : '100%', border : '1px solid', display : 'flex', justifyContent : 'space-between' }}>
                <Typography sx = {{ fontSize : '18px' }}>{selectedFestivalName}</Typography>
                <IconButton onClick = {onDeleteFestivallNameHandler}>
                  <ClearIcon/>
                </IconButton>
              </Box>

            </Box>

            <Box>
              <IconButton onClick = {onImageUploadButtonHandler}>
                <InsertPhotoOutlinedIcon />
                <input 
                ref = {imageRef} 
                hidden type = 'file'
                accept = 'image/*' 
                onChange = {(event) => onImageUploadChangeHandler(event)}
                onKeyDown = {(event) => onContentKeyPressHandler(event)}/>
              </IconButton>
            </Box>
          </Box>
        </Box>
        
            <Box>
            <Input fullWidth disableUnderline placeholder='제목을 작성해주세요.'
              sx={{ fontSize: '34px', fontWeight: 600, color: '#2f4f4f'}}
              onChange={(event) => setBoardTitle(event.target.value)} />
            </Box>
            <Divider sx={{ mt: '35px', mb: '45px', ml: '20px', mr: '20px' }} />
            <Box>
            <Typography>
              <Input
                fullWidth disableUnderline placeholder='본문을 작성해주세요.'
                multiline minRows={1}
                sx={{ fontSize: '18px', fontWeight: 600 }}
                onChange={(event) => setBoardContent(event.target.value)}
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
