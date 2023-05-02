import { Box } from '@mui/material'
import React from 'react'

export default function MainRightContent() {
  return (
    <Box sx={{ width: '40%', height: '100%', backgroundColor:'beige', border : 1 }}>
      
      <Box sx = {{ height : '60%' , mt : '40px', mr : '30px', ml : '30px', border : 1}}>
       최상단 축제 정보 보여야됨
      </Box>
      <Box sx = {{ height : '20%', mt : '30px', mr : '30px', ml : '30px', border : 1}}>
       한 줄 평
      </Box>
    </Box>
  )
}
