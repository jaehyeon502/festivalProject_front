import { Box, Button, TextField, Typography } from '@mui/material'
import React, { Dispatch } from 'react'


interface Props {
  setAuthenticationView: Dispatch<React.SetStateAction<boolean>>;

}

export default function SigninView({setAuthenticationView}: Props) {
  return (
    <Box display="flex" sx={{ height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
            <Typography variant='h6' fontWeight={900} >로그인</Typography>
            <TextField fullWidth label="아이디" variant="standard" />
            <TextField fullWidth sx={{ mt:'40px' }} label="비밀번호" variant="standard" />
        </Box>

        <Box sx={{ display:'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center' }}>
            <Button sx={{ width:"50%", color:'#222',fontSize: '18px', fontWeight:900 }}>로그인</Button>
            <Typography sx={{ fontSize: '12px' }}>신규사용자 이신가요?<Typography component='span' sx={{ ml:'10px' ,fontSize:'16px', fontWeight: 900, cursor:'pointer' }} onClick={() => setAuthenticationView(false)}>회원가입</Typography></Typography>
        </Box>
    </Box>
  )
}
