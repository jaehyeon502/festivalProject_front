import { Box, Button, TextField, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { Dispatch, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { SignInRequestDto } from 'src/apis/request/auth';
import { SignInResponseDto } from 'src/apis/response/auth';
import ResponseDto from 'src/apis/response';
import { SIGN_IN_URL } from 'src/constants/api';
import { useSignInStore } from 'src/stores';

import { SIGN_UP_CHECKBOX_LIST, USER } from 'src/mock';

import { getExpires } from 'src/utils';



interface Props {
  setAuthenticationView: Dispatch<React.SetStateAction<boolean>>;

}


export default function SigninView({ setAuthenticationView }: Props) {
  //          hook          //
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signInUser,setSignInUser } = useSignInStore();
const [cookies,setCookie]=useCookies();
const navigator=useNavigate();

  //          Event Handler          //


  const loginHandler = () => {
    setSignInUser(USER);
      navigator("/");
    const data: SignInRequestDto = { userId, password };
    axios
      .post(SIGN_IN_URL, data)
      .then((resposne) => signInResposneHandler(resposne))
      .catch((error) => signInErrorHandler(error))
    
  }
  //          Response Handler          //

  const signInResposneHandler = (resposne: AxiosResponse<any, any>) => {
    const { result, message, data } = resposne.data as ResponseDto<SignInResponseDto>;
    if (!result || !data) {
      alert(message); return;

    }
    const { token, expiredTime, ...user } = data;
    const expires = getExpires(expiredTime);
    setCookie("accessToken",token,{expires});
    setSignInUser(USER)
    console.log(signInUser)
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
        <TextField sx={{ width: '50%', mt: '40px' }} label="아이디" variant="standard" onChange={(event) => setUserId(event.target.value)} />
        <TextField sx={{ width: '50%', mt: '40px' }} type='password' label="비밀번호" variant="standard" onChange={(event) => setPassword(event.target.value)} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Button sx={{ width: "50%", color: '#222', fontSize: '18px', fontWeight: 900 }} onClick={() => loginHandler()}>로그인</Button>
        <Typography sx={{ fontSize: '12px' }}>신규사용자 이신가요?<Typography component='span' sx={{ ml: '10px', fontSize: '16px', fontWeight: 900, cursor: 'pointer' }} onClick={() => setAuthenticationView(false)}>회원가입</Typography></Typography>
      </Box>
    </Box>
  )
}
