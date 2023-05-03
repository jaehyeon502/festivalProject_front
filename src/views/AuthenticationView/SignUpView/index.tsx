import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SignUpCheckboxListItem from 'src/components/SignUpCheckboxListItem';
import { IPreviewFestivalItem } from 'src/interfaces';
import { usePagingHook } from 'src/hooks';
import { SIGN_UP_CHECKBOX_LIST } from 'src/mock';


function FirstPage() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

  return(
    <Box>
      <FormControl sx={{ mt: '40px' }} fullWidth variant="standard">
        <InputLabel>아이디*</InputLabel>
        <Input type="text" /> 
      </FormControl>
      <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', mt:'30px' }}>
                <FormControl sx={{ mt: '40px', justifyContent:'center' }} fullWidth variant="standard">
                  <InputLabel>닉네임*</InputLabel>
                  <Input type="text" /> 
                </FormControl>
                <Avatar sx={{ width:'80px', height:'80px', cursor:'pointer' }} />
      </Box>
      <FormControl sx={{ mt: "40px" }} fullWidth variant="standard">
        <InputLabel>비밀번호*</InputLabel>
        <Input type={showPassword ? "text" : "password"}
            endAdornment={
            <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
                } />
      </FormControl>
      <FormControl sx={{ mt: "40px" }} fullWidth variant="standard">
        <InputLabel>비밀번호 확인*</InputLabel>
        <Input type={showPasswordCheck ? "text" : "password"}
            endAdornment={
            <InputAdornment position="end">
                <IconButton onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                    {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        } />
      </FormControl>
      
      <FormControl sx={{ mt: '40px', justifyContent:'center' }} fullWidth variant="standard">
        <InputLabel>휴대전화번호*</InputLabel>
        <Input type="text" /> 
      </FormControl>
    </Box>
  )
}

function SecondPage() {

  const [festivalCheckboxList, setFestivalCheckboxList] = useState<IPreviewFestivalItem[]>([]);
  const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList}=usePagingHook(100);
  // const [festivalList, setFestivalList] = useState<IPreviewFestivalItem[]>([]);

  useEffect(() => {
    setFestivalList(SIGN_UP_CHECKBOX_LIST);
  }, []);
  return(
  <Box sx={{ width : '100%', height: '100%' }}>
    <Box>
      <Typography sx={{ mt:'40px' }}>회원님이 관심있는 축제</Typography>
    </Box>
    {viewList.map( (festivalCheckboxList) => (<SignUpCheckboxListItem festivalCheckboxList={festivalCheckboxList} />))}
  </Box>
  )
}

export default function SignUpView() {

  const [page, setPage] = useState<number>(1);

  return (
    <Box sx={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
      <Box>
        <Box sx={{ display:'flex', flexDirection:'column' }}>
          <Typography variant='h6' fontWeight={900}>회원가입</Typography>
        </Box>
        { page === 1 ? (<FirstPage />) : (<SecondPage />)}
      </Box>

      <Box sx={{ display:'flex', justifyContent:'end'}}>
        { page === 1 && <Button onClick={() => setPage(2)}>다음</Button> }
        { page === 2 && 
        (<Box>
          <Button onClick={() => setPage(1)}>이전</Button>
          <Button>회원가입</Button>
        </Box>
        )
        }
      </Box>
    </Box>
  )
}
