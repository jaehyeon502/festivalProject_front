import { Box, Button, TextField, Typography } from '@mui/material'
import React, { Dispatch, useState } from 'react'
import { useSignInStore } from 'src/stores';


interface Props {
  setAuthenticationView: Dispatch<React.SetStateAction<boolean>>;

}

export default function SigninView({setAuthenticationView}: Props) {
    //          hook          //
  const[userId,setUserId]=useState<string>('');
  const[password,setPassword]=useState<string>('');
  const {setSignInUser}=useSignInStore();

    //          Event Handler          //

    const loginHandler=()=>{

    }
  return (
    <Box display="flex" sx={{ height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
        <Box sx={{ display:'flex', flexDirection:'column' }}>
            <Typography variant='h6' fontWeight={900} >로그인</Typography>
            <TextField sx={{ width:'50%', mt:'40px' }} label="아이디" variant="standard"  onChange={(event)=>setUserId(event.target.value)}/>
            <TextField sx={{ width:'50%', mt:'40px' }} label="비밀번호" variant="standard" onChange={(event)=>setPassword(event.target.value)} />
        </Box>

        <Box sx={{ display:'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center' }}>
            <Button sx={{ width:"50%", color:'#222',fontSize: '18px', fontWeight:900 }} >로그인</Button>
            <Typography sx={{ fontSize: '12px' }}>신규사용자 이신가요?<Typography component='span' sx={{ ml:'10px' ,fontSize:'16px', fontWeight: 900, cursor:'pointer' }} onClick={() => setAuthenticationView(false)}>회원가입</Typography></Typography>
        </Box>
    </Box>
  )
}
