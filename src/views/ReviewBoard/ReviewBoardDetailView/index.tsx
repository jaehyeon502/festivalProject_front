import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography, Pagination, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { REVIEW_BOARD_LIST } from 'src/mock';
import { IReviewBoard } from 'src/interfaces';

export default function ReviewBoardDetailView() {

  const [reviewBoard, setReviewBoard] = useState<IReviewBoard>(); //? 잘못된 게시물 번호를 넣을 수도 있으니 null 타입
  const { reviewBoardNumber } = useParams();
  const navigator = useNavigate();

  useEffect(() => {

    //? 해당 후기 게시물의 존재 여부 검증
    if (!reviewBoardNumber) {
      navigator('/');
      return;
    }

    // //? 일치하는 후기 게시물 Number 들고오기, 일치하는 번호에 있는 mock 데이터를 담는다.
    const reviewBoardData = REVIEW_BOARD_LIST.find((item) => item.boardNumber === parseInt(reviewBoardNumber));

    // //? 제대로 들고왔는지
    if (!reviewBoardData) {
      navigator('/');
    }

    setReviewBoard(reviewBoardData);

  }, [])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }}>
      <Box sx={{ backgroundColor: '#FFFFFF', height: '80%', ml: '200px', mr: '200px' }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '20%' }}>
          <Box sx={{ mt: '200px', ml: '50px' }}>
            <Typography sx={{ fontSize: '34px', fontWeight: 600 }}>{reviewBoard?.boardTitle}</Typography>
          </Box>

          <Box sx={{ mt: '40px', mr: '50px', mb: '30px', width: '500px', border : '1px solid', display: 'flex'}}>
              <Avatar sx={{ width: '80px', height: '80px' }} src={reviewBoard?.writerProfileUrl ? reviewBoard.writerProfileUrl : ''} />

              <Typography>작성자 명 : {reviewBoard?.writerNickname}</Typography>
              <Typography>{reviewBoard?.boardWriteDatetime}</Typography>

            <Box sx={{ mt: '40px', border : '1px solid' }}>
              신고
            </Box>
          </Box>

        </Box>
        <Divider />

        <Box>
          <Box sx={{ ml: '60px', mr: '60px', mt: '30px' }}>
            <img src={reviewBoard?.boardImgUrl ? reviewBoard.boardImgUrl : ''} />
            <Typography>{reviewBoard?.boardContent}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '30px' }}>
            <Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>추천 {reviewBoard?.recommendCount}</Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>댓글 수 {reviewBoard?.commentCount} </Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>조회수 {reviewBoard?.viewCount}</Box>
            </Box>

            <Box sx={{ mr: '40px' }}>
              <Box sx={{ display: 'inline', ml: '25px' }}>다음 글</Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>이전 글</Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '20px', mb: '30px' }} />

        <Box sx={{ pb: '20px' }}>
          <Box sx={{ ml: '30px' }}>
            <Box sx={{ mb: '15px' }}>댓글 작성자 명 | 작성일</Box>
            <Box>댓글 내용</Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination></Pagination>
          </Box>
        </Box>

      </Box>
    </Box>

  )
}