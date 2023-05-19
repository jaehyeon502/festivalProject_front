import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography, Pagination, Avatar, Stack, IconButton, Input, Card, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { COMMENT_LIST} from 'src/mock';
import { Comment, FreeBoard, FreeBoardComment, FreeBoardRecommend } from 'src/interfaces';
import CommentListItem from 'src/components/CommentListItem';
import { usePagingHook } from 'src/hooks';
import { getpagecount } from 'src/utils';
import WarningIcon from '@mui/icons-material/Warning';
import { GET_FREE_BOARD_URL } from 'src/constants/api';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { GetFreeBoardResponseDto } from 'src/apis/response/freeboard';
import { useSignInStore } from 'src/stores';

export default function FreeBoardDetailView() {
  
  const path = useLocation();

  //          Hook          //
  const {signInUser} = useSignInStore();
  const [freeBoard, setFreeBoard] = useState<FreeBoard>(); 
  const [freeBoardCommentList, setFreeBoardCommentList] = useState<FreeBoardComment[]>([]);
  const [freeBoardrecommendList, setFreeBoardRecommendList] = useState<FreeBoardRecommend[]>([]);

  const [recommendStatus, setRecommendStatus] = useState<boolean>(false);
  const [ menuFlag, setMenuFlag] = useState<boolean>(false);
  const { freeBoardNumber } = useParams();
  const navigator = useNavigate();
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  let isLoad = false;

  const setReviewBoardResponse = (data : GetFreeBoardResponseDto) =>{
    
    const { freeBoard, freeBoardCommentList, freeBoardRecommendList } = data;
    setFreeBoard(freeBoard);
    setFestivalList(freeBoardCommentList);
    setFreeBoardRecommendList(freeBoardRecommendList);

    const boardOwner = signInUser !== null && freeBoard?.writerUserId === signInUser.userId;
    setMenuFlag(boardOwner);
  }

  //          Event Handler          //
  const onClickRecommendHandler = () => {
    if (recommendStatus === true) {
      setRecommendStatus(false);
      return;
    }
    setRecommendStatus(true);
  }

  const getFreeBoard = () => {
    axios.get(GET_FREE_BOARD_URL(freeBoardNumber as string))
        .then((response) => getFreeBoardResponse(response))
        .catch((error) => getFreeBoardError(error))
  }

  const getFreeBoardResponse = (response: AxiosResponse<any, any>) => {
    const {result, message, data } = response.data as ResponseDto<GetFreeBoardResponseDto>
    if(!result || !data) return;
    setReviewBoardResponse(data);
  }

  const getFreeBoardError = (error: any) => {
    console.log(error.message);
  }



  // const onClickNextBoardHandler = () => {
  //   const boardNumber: number = freeBoardNumber ? Number(freeBoardNumber) + 1 : Number(freeBoardNumber);
  //   if (boardNumber > FREE_BOARD_LIST.length) {
  //     alert('다음 글이 없습니다.');
  //     return;
  //   }
  //   navigator(`/freeBoard/detail/${boardNumber}`)
  // }

  // const onClickPreviousBoardHandler = () => {
  //   const boardNumber: number = freeBoardNumber ? Number(freeBoardNumber) - 1 : Number(freeBoardNumber);
  //   if (boardNumber < 1) {
  //     alert('이전 글이 없습니다.');
  //     return;
  //   }
  //   navigator(`/freeBoard/detail/${boardNumber}`) 
  // }

  useEffect(() => {

    if (isLoad) return;
    //? boardNumber가 존재하는지 검증
    if (!freeBoardNumber) {
      navigator("/");
      return;
    }
    isLoad = true;
    getFreeBoard();

    // //? 일치하는 후기 게시물 Number 들고오기, 일치하는 번호에 있는 mock 데이터를 담는다.
    // //? List 중 하나만 들고올 때 <-> 여러 개 들고올 땐 map돌려서
    // const freeBoardData = FREE_BOARD_LIST.find((item) => item.freeBoardNumber === parseInt(freeBoardNumber));

    // //? 제대로 들고왔는지
    // if (!freeBoardData) {
    //   navigator('/');
    // }

    // setFreeBoard(freeBoardData);
    // setFestivalList(COMMENT_LIST);

  }, [])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }}>
      <Box sx={{ backgroundColor: '#FFFFFF', height: '80%', ml: '200px', mr: '200px' }}>

        <Box display='flex' justifyContent='flex-end'>
          <Box sx={{ mb: '30px', width: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ width: '80px', height: '80px', m: '10px' }} src={freeBoard?.writerProfileUrl ? freeBoard.writerProfileUrl : ''} />

              <Typography sx={{ mt: '10px', mr: '10px', fontWeight: 550 }}>작성자 명 : {freeBoard?.writerNickname}</Typography>
            </Box>
            <Box sx={{ mt: '40px', ml: '10px', fontWeight: 600 }}>
              <IconButton sx={{ color: 'red' }}>
                <WarningIcon />
              </IconButton>
              신고
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '20%' }}>
          <Typography sx={{ ml: '50px', fontSize: '34px', fontWeight: 600 }}>{freeBoard?.freeBoardTitle}</Typography>
          <Typography sx={{ mt: '10px', mr: '50px', fontSize: '20px' }}>{freeBoard?.freeBoardWriteDatetime}</Typography>
        </Box>

        <Divider sx={{ mr: '50px', ml: '50px', borderBottomWidth: 2, borderColor: '#000000' }} />

        <Box>
          <Box sx={{ ml: '60px', mr: '60px', mt: '30px' }}>
            <img src={freeBoard?.freeBoardImgUrl ? freeBoard.freeBoardImgUrl : ''} />
            <Typography sx={{ fontSize: '18px', mt: '10px' }}>{freeBoard?.freeBoardContent}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '30px' }}>
            <Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>
                <IconButton onClick={onClickRecommendHandler} >
                  {recommendStatus ?
                    <ThumbUpIcon sx={{ width: '20px', height: '20px', color: 'blue' }} />
                    :
                    <ThumbUpOutlinedIcon sx={{ width: '20px', height: '20px' }} />}
                </IconButton>
                추천 {freeBoard?.recommendCount}</Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>댓글 수 {freeBoard?.commentCount} </Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>조회수 {freeBoard?.viewCount}</Box>
              <Button onClick={() => navigator(`/freeboard/update/${freeBoard?.freeBoardNumber}`)}>수정</Button>
            </Box>

            <Box sx={{ mr: '40px', fontWeight: 550 }}>
              <Box sx={{ display: 'inline', ml: '25px' }} >
                <IconButton sx={{ color: 'black' }}>
                  <ArrowUpwardIcon />
                </IconButton>
                다음 글
              </Box>

              <Box sx={{ display: 'inline', ml: '25px' }} >
                <IconButton sx={{ color: 'black' }}>
                  <ArrowDownwardIcon />
                </IconButton>
                이전 글
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: '20px', mb: '30px', mr: '50px', ml: '50px', borderBottomWidth: 2, borderColor: '#000000' }} />

        <Box sx={{ pb: '20px' }}>
          <Box sx={{ ml: '30px' }}>
            <Stack>
              {/**viewList.map((commentItem) => <CommentListItem item2={commentItem as FreeBoardComment} />)**/}
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)}></Pagination>
          </Box>

          <Box sx={{ pt: '20px', pb: '15px', pl: '50px', pr: '50px' }}>
            <Card variant='outlined' sx={{ p: '20px' }}>
              <Input minRows={3} multiline disableUnderline fullWidth/>
              <Box sx={{ display: 'flex', justifyContent: 'end'}}>
                <Button sx={{ p : '4px 20px', backgroundColor : '#00ffff', color : 'black', fontSize: '16px', fontWeight : 700, borderRadius: '42px' }}>댓글 작성</Button>
              </Box>
            </Card>
          </Box>

        </Box>

      </Box>
    </Box>

  )
}