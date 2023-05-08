import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

export default function ReviewBoardDetailView() {
  
  return (
    <Box sx = {{ backgroundColor : '#c0c0c0'}}>
      <Box sx = {{ backgroundColor : '#F323F3' ,height : '20%'}}>현재 보고 있는 축제 정보</Box>

      <Box sx = {{ backgroundColor : '#FFFFFF', height : '75%'}}>

        <Box>게시물 상단 영역
          <Box>
            <Box>
              유저 프로필
            </Box>
            <Box>
              작성자 명
            </Box>
            <Box>
              평점
            </Box>
            <Box>
              조회수
            </Box>

            <Box>다음 글 이전글 신고</Box>
            
          </Box>

          <Box>
            게시물 제목
          </Box>
        </Box>
        <Divider/>
        <Divider/>

        <Box>게시물 중단 영역</Box>
        <Divider/>
        <Box>댓글 영역</Box>

         </Box>
      </Box>

    )
}