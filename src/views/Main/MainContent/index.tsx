import React from 'react'
import Box from '@mui/material/Box';

export default function index() {
  return (
    <Box sx={{ width: '100%', height: '900px', display:'flex', justifyContent: 'center'}}>
        <Box sx={{ width:'80vw', height:'100%', backgroundColor:'#dedede', display: 'flex' }}>
            <Box sx={{ width: '55%', height: '100%', mr:'5%', backgroundColor:'beige' }}></Box>
            <Box sx={{ width: '40%', height: '100%', backgroundColor:'beige' }}></Box>
        </Box>
    </Box>
  )
}