import React, { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import {
  Box, Divider, Fab, FormControl,
  Grid, IconButton, Input, InputAdornment, OutlinedInput, Popover, Stack, Typography
} from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { IPreviewFestivalItem } from 'src/interfaces';
import { SIMPLELIST } from 'src/mock';
import FestivalNameItemList from 'src/components/FestivalNameItemList';

export default function ReviewBoardWriteView() {

  const [reviewBoardTitle, setReviewBoardTitle] = useState<string>('');
  const [reviewBoardContent, setReviewBoardContent] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [festivalNameList, setFestivalNameList] = useState<IPreviewFestivalItem[]>([]);
  const [boardContent, setBoardContent] = useState<string>('');
  const [selectedFestivalName, setSelectedFestivalName] = useState<string>('');

  const navigator = useNavigate();

  //          Event Handler          //
  const onClickFestivalSearchButton = (event: MouseEvent<HTMLButtonElement>) => {
    setShow(true);
  };

  //? 검색창 외 화면 아무 곳이나 누를 경우 검색창 사라지게
  const onCloseFestivalSearchHandler = (event : MouseEvent<HTMLButtonElement>) => {
    setShow(false);
  }

  const onFestivalSearchKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setShow(true);
  };

  const onContentKeyPressHandler = (event : KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    setBoardContent(boardContent + '\n');
  }

  const onClickFestivalNameHandler = () => {
    setSelectedFestivalName('축제');
    setShow(false);
  }

  const onBoardWriteHandler = () => {
    if (!reviewBoardTitle.trim()) {
      alert('제목이 입력되지 않았습니다.')
      return;
    }
    if (!reviewBoardContent.trim()) {
      alert('내용이 입력되지 않았습니다.')
      return;
    }
    if(!selectedFestivalName.trim()){
      alert('축제명이 선택되지 않았습니다.')
      return;
    }

    navigator('/')
  }

  useEffect(() => {
    setFestivalNameList(SIMPLELIST);
  }, [])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }}>
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
                  <Box sx={{ width : '100%', height : '200px',border: '1px solid', fontSize: '15px', overflow : 'scroll' }}>
                    {festivalNameList.map((item) => (
                    <Grid onClick = {onClickFestivalNameHandler}>
                      <FestivalNameItemList festivalNameItem={item}  />
                    </Grid>))}
                    {'스크롤 내리기'}
                  </Box>
                ) : (<></>)}
              </FormControl>

            </Box>

            <Box sx={{ width: '310px', height : '30px',display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '18px' }}>축제 이름 : </Typography>
              </Box>

              <Box sx={{ width: '210px', height : '100%', border : '1px solid' }}>
                <Typography sx = {{ fontSize : '18px'}}>{selectedFestivalName}</Typography>
              </Box>

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
              onChange={(event) => setReviewBoardTitle(event.target.value)} />
            </Box>
            <Divider sx={{ mt: '35px', mb: '45px', ml: '20px', mr: '20px' }} />
            <Box>
            <Typography>
              <Input
                fullWidth disableUnderline placeholder='본문을 작성해주세요.'
                multiline minRows={1}
                sx={{ fontSize: '18px', fontWeight: 600 }}
                onChange={(event) => setReviewBoardContent(event.target.value)}
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
