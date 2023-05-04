import React from 'react'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'

export default function ReviewBoardWriteView() {

  return (
    <Box>
      <Box>
      제목을 포함한 상단
        <Box>
          <Box>여기 검색</Box>
          <Box>
            <Box>여기 축제 이름</Box>
            <Box>여기 사진 업로드</Box>
          </Box>
        </Box>

        <Box>제목</Box>
      </Box>

      <Divider sx = {{ mt : '35px', mb : '45px', ml : '20px', mr : '20px'}}/> 
      <Box>
        내용
      </Box>
    </Box>
  )
}
