import { Box, IconButton, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ width: '100%', height: "100px" , backgroundColor : "#666666", display : 'flex', p: '40px 120px 50px 120px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:'column' }}>
        <Box>
          <Typography sx={{ fontSize:'20px', fontWeight:'400', color:'#ffffff' }}>festival Project</Typography>
        </Box>
        <Box>
          <Typography component='span' sx={{ fontSize:'12px', fontWeight:'400', color:'#ffffff' }}>hyesung6516@naver.com,</Typography>
        </Box>
      </Box>
    </Box>
  )
}