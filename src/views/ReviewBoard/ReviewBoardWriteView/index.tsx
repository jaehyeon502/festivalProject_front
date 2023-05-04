import React, {KeyboardEvent, MouseEvent, useState} from 'react'
import { Box, Divider, Fab, FormControl, 
    Grid, IconButton, Input, InputAdornment, OutlinedInput, Popover, Stack, Typography } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';

export default function ReviewBoardWriteView() {

    const [reviewBoardTitle, setReviewBoardTitle] = useState<string>('');
    const [reviewBoardContent, setReviewBoardContent] = useState<string>('');
    const [searchEl, setSearchEl] = useState<HTMLButtonElement | null>(null);
    const [value, setValue] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    
    const navigator = useNavigate();
    const open = Boolean(searchEl);
    const id = open ? 'simple-popover' : undefined;
    
    //          Event Handler          //
    const onClickFestivalSearchButton = (event : MouseEvent<HTMLButtonElement>) => {
        setShow(true);
        setSearchEl(event.currentTarget);
    };

    const onCloseFestivalSearch = () => {
        setSearchEl(null);
    };

    const onFestivalSearchKeyPress = (event : KeyboardEvent<HTMLDivElement>) => {
      if(event.key !== 'Enter') return;
      setShow(true);
      alert('키 누름')
    };

    const onBoardWriteHandler = () => {
        if(!reviewBoardTitle.trim()){
            alert('제목이 입력되지 않았습니다.')
            return;
        }
        if(!reviewBoardContent.trim()){
            alert('내용이 입력되지 않았습니다.')
            return;
        }

        navigator('/')
    }
   

  return (
    <Box sx = {{ backgroundColor : '#c0c0c0'}}>
     <Divider/>
     <Box sx = {{ height : '1000px', ml : '200px', mr : '200px', p : '100px 50px', backgroundColor : '#ffffff'}}>
      <Box>
        <Box sx= {{ mb : '220px', mr : '30px', ml : '30px', display : 'flex', justifyContent : 'space-between'}}>
         
          <Box >
            <FormControl sx = {{ mb : '20px'}} variant="outlined">
          <OutlinedInput onKeyPress={(event) => onFestivalSearchKeyPress(event)}
            endAdornment = {
                <InputAdornment position='end'>
                    <IconButton edge = 'end' onClick={onClickFestivalSearchButton}>
                        <SearchSharpIcon/>
                    </IconButton>
                    <Popover id = {id} open = {open} anchorEl = {searchEl} onClose = {onCloseFestivalSearch}
                    anchorOrigin={{
                        vertical : 'bottom',
                        horizontal : 'center'
                    }}>
                        <Typography>검색한 축제 이름</Typography>

                    </Popover>
                </InputAdornment>
            }
            sx = {{ borderRadius : '20px'}}/>
            </FormControl>
            { show ? (
                <Box>
                검색한 축제 이름
                </Box>
            ) : (<></>) }
            
          </Box>

          <Box sx = {{ width : '310px', display : 'flex', justifyContent : 'space-between'}}>
            <Box>
                <Typography sx = {{fontSize : '18px'}}>축제 이름 : </Typography>
            </Box>

            <Box sx = {{ width : '220px'}}>
            <Input/>
            </Box>

          </Box>

          <Box>
            <IconButton>
            <InsertPhotoOutlinedIcon/>
            </IconButton>
            <Input placeholder='업로드는 Back과 연동 후에'/>
          </Box>

        </Box>

        <Box>
           <Input fullWidth disableUnderline placeholder='제목을 작성해주세요.'
           sx = {{ fontSize : '34px', fontWeight :  600, color : '#2f4f4f'}}
           onChange={(event) => setReviewBoardTitle(event.target.value)}/>
        </Box>
      </Box>
      <Divider sx = {{ mt : '35px', mb : '45px', ml : '20px', mr : '20px'}}/> 
      <Box>
        <Typography>
            <Input fullWidth disableUnderline placeholder='본문을 작성해주세요.'
            sx = {{ fontSize : '18px', fontWeight : 600}}
            onChange = {(event) => setReviewBoardContent(event.target.value)}/>
        </Typography>
      </Box>
     </Box>

      <Fab sx = {{ position : 'fixed', zIndex : 999, bottom : '200px', right : '240px', backgroundColor : '#f0fff0'}}
        onClick = {onBoardWriteHandler}>
        <ModeEditOutlineOutlinedIcon/>
      </Fab>
    </Box>
  )
}
