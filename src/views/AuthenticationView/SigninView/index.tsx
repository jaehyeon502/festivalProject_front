import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { SignInRequestDto } from 'src/apis/request/auth';
import { SignInResponseDto } from 'src/apis/response/auth';
import ResponseDto from 'src/apis/response';
import { SIGN_IN_URL } from 'src/constants/api';
import { useSignInStore } from 'src/stores';
import { USER } from 'src/mock';
import { getExpires } from 'src/utils';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function SigninView() {
  //          hook          //
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setSignInUser } = useSignInStore();
  const [loginError, setLoginError] = useState<boolean>(false);
  const [cookies,setCookie]=useCookies();
  const navigator=useNavigate();

  //          Event Handler          //

  const loginHandler = () => {
    if (!userId.trim() || !password) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const data: SignInRequestDto = { userId, password };
    axios
      .post(SIGN_IN_URL, data)
      .then((resposne) => signInResposneHandler(resposne))
      .catch((error) => signInErrorHandler(error))
    
  }

  const onPasswordKeyPressHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;
    loginHandler();
  }
  //          Response Handler          //

  const signInResposneHandler = (resposne: AxiosResponse<any, any>) => {
    const { result, message, data } = resposne.data as ResponseDto<SignInResponseDto>;
    if (!result || !data) {
      setLoginError(true);
      return;
    }
    const { token, expiredTime, ...user } = data;
    const expires = getExpires(expiredTime);

    setCookie('accessToken', token,{ expires });
    setSignInUser(user)
    navigator('/');
  }
  //          Error Handler          //
  const signInErrorHandler = (error: any) => {
    console.log(error.message);
  };

  return (
    <Box display="flex" sx={{ height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6' fontWeight={900} >로그인</Typography>
        <TextField sx={{  mt: '40px' }} error={loginError} fullWidth label="아이디" variant="standard" onChange={(event) => setUserId(event.target.value)} />
        <FormControl error={loginError} fullWidth variant="standard" sx={{ mt: "40px" }}>
          <InputLabel>비밀번호</InputLabel>
          <Input type={showPassword ? "text" : "password"} 
            endAdornment={<InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>}
            onChange={(event) => setPassword(event.target.value)}
            onKeyPress={(event) => onPasswordKeyPressHandler(event)}
          />
        </FormControl>

      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {loginError && 
        (<Box sx={{ mb:'20px' }}>
          <Typography sx={{ color:'red', fontSize:'12px', opacity:0.7 }}>아이디 또는 비밀번호를 잘못 입력했습니다.</Typography>
        </Box>)}
        <Button sx={{ width: "50%", color: '#222', fontSize: '18px', fontWeight: 900 }} onClick={() => loginHandler()}>로그인</Button>
        <Typography sx={{ fontSize: '12px' }}>신규사용자 이신가요?<Typography component='span' sx={{ ml: '10px', fontSize: '16px', fontWeight: 900, cursor: 'pointer' }} onClick={() => navigator('/auth/sign-up')}>회원가입</Typography></Typography>
      </Box>
    </Box>
  )
}
