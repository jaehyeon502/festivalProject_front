import React, { MouseEvent, useEffect, useState } from 'react';
import { Box, Divider, Typography, Pagination, Avatar, Stack, IconButton, Input, Card, Button, Menu, MenuItem } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Comment, ReviewBoard } from 'src/interfaces';
import CommentListItem from 'src/components/CommentListItem';
import { usePagingHook } from 'src/hooks';
import { getpagecount } from 'src/utils';
import WarningIcon from '@mui/icons-material/Warning';
import { useCookies } from 'react-cookie';
import { DELETE_REVIEW_BOARD_COMMENT_URL, DELETE_REVIEW_BOARD_URL, GET_ALL_REVIEWBOARD_LIST_URL, GET_REVIEW_BOARD_URL, PATCH_REVIEW_BOARD_COMMENT_URL, POST_REVIEW_BOARD_COMMENT_URL, POST_REVIEW_BOARD_RECOMMEND_URL, authorizationHeader } from 'src/constants/api';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { DeleteCommentResponseDto, DeleteReviewBoardResponseDto, GetReviewBoardListResponseDto, GetReviewBoardResponseDto, PatchCommentResponseDto, PostCommentResponseDto, RecommendReviewBoardResponseDto } from 'src/apis/response/board';
import { PatchCommentRequestDto, PostCommentRequestDto, RecommendReviewBoardRequestDto } from 'src/apis/request/board';
import Recommend from 'src/interfaces/Recommend.interface';
import { useSignInStore } from 'src/stores';

export default function ReviewBoardDetailView() {

  //          Hook          //
  const path = useLocation();

  const { boardNumber } = useParams();
  const [reviewBoard, setReviewBoard] = useState<ReviewBoard>();

  const [recommendStatus, setRecommendStatus] = useState<boolean>(false);
  const [recommendList, setRecommendList] = useState<Recommend[]>([])

  const [commentContent, setCommentContent] = useState<string>('');
  const [comment, setComment] = useState<Comment[]>([]);

  const [menuFlag, setMenuFlag] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const navigator = useNavigate();
  const [cookies] = useCookies();
  const { signInUser } = useSignInStore();
  const accessToken = cookies.accessToken;
  let isCheck = false;

  //          Event Handler          //
  const onClickRecommendHandler = () => onRecommendHandler()

  const getReviewBoardList = () => {
    axios.get(GET_ALL_REVIEWBOARD_LIST_URL)
    .then((response) => getReviewBoardListResponseHandler(response))
    .catch((error) => getReviewBoardErrorHandler(error))
  }

  //? 후기 게시물 조회
  const getBoard = () => {
    axios.get(GET_REVIEW_BOARD_URL(boardNumber as string))
      .then((response) => getBoardResponseHandler(response))
      .catch((error) => getBoardErrorHandler(error));
  }

  //? 추천 누르기
  const onRecommendHandler = () => {
    if (!accessToken) return;

    //? 해당 게시물임을 누르는 것임을 알기 위해 data에 현재 url에 있는 번호 넣어주기
    const data: RecommendReviewBoardRequestDto = { boardNumber: parseInt(boardNumber as string) };

    axios.post(POST_REVIEW_BOARD_RECOMMEND_URL, data, authorizationHeader(accessToken))
      .then((response) => recommendResponseHandler(response))
      .catch((error) => recommendErrorHandler(error))
  }

  //? 댓글 달기
  const onPostCommentHandler = () => {
    if (!accessToken) return;

    const data: PostCommentRequestDto = { boardNumber: parseInt(boardNumber as string), commentContent }

    axios.post(POST_REVIEW_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
      .then((response) => postCommentReponseHandler(response))
      .catch((error) => postCommentErrorHandler(error))
  }

  //? 다음 글
  const onClickNextBoardHandler = () => {
    let nextboardNumber: number = boardNumber ? Number(boardNumber) + 1 : Number(boardNumber);
    while(!boardNumber) nextboardNumber += 1;

    // getReviewBoardList();
    // console.log(boardNumber);
    // console.log(festivalList.length);
    //Todo 짜증; Back에서 글 삭제 시 게시물 번호도 날리고 이후에 인덱스도 1씩 감소시켜야된다.
    //Todo 게시물 전체 갯수를 가져와도 현재 삭제 후 갯수랑 이전에 삭제 전 게시물 총 갯수랑 다름
    //Todo 아니면 DB board 테이블의 마지막 인덱스를 가져올 수 있을까?

    if (nextboardNumber > 1000) {
      alert('다음 글이 없습니다.');
      return;
    }
    navigator(`/reviewBoard/detail/${nextboardNumber}`)
  }

  //? 이전 글
  const onClickPreviousBoardHandler = () => {
    let pboardNumber: number = boardNumber ? Number(boardNumber) - 1 : Number(boardNumber);
    while(!boardNumber) pboardNumber -= 1;

    if (pboardNumber < 1) {
      alert('이전 글이 없습니다.');
      return;
    }
    navigator(`/reviewBoard/detail/${pboardNumber}`)
  }

  //? 수정, 삭제 메뉴 클릭
  const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(null);
    setMenuOpen(true);
  }

  //? 수정, 삭제 메뉴 닫기
  const onMenuCloseHandler = () => {
    setAnchorElement(null);
    setMenuOpen(false);
  }

  //? 후기 게시물 삭제
  const onDeleteBoardHandler = () => {
    if(!accessToken)  return;
    if(reviewBoard?.writerUserId !== signInUser?.userId) return; //? 애초에 작성자가 다르면 메뉴바 자체가 안보인다.

    axios.delete(DELETE_REVIEW_BOARD_URL(boardNumber as string), authorizationHeader(accessToken))
    .then((response) => deleteBoardResponseHandler(response))
    .catch((error) => deleteBoardErrorHandler(error))
  }

  //          Response Handler          //
  const getReviewBoardListResponseHandler = (response: AxiosResponse<any, any>)=> {
    const { result, message, data } = response.data as ResponseDto<GetReviewBoardListResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data);
  }
  
  const getBoardResponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<GetReviewBoardResponseDto>
    if (!result || !data) {
      alert(message);
      //navigator('/');
      return;
    }
    setReviewBoardResponse(data);

  }

  const recommendResponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<RecommendReviewBoardResponseDto>
    if (!result || !data) {
      alert(message);
      return;
    }
    setReviewBoardResponse(data);
  }

  const postCommentReponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<PostCommentResponseDto>
    if (!result || !data) return;
    setReviewBoardResponse(data);
  }

  const deleteBoardResponseHandler = (response : AxiosResponse<any, any>) => {

    const { result, message, data} = response.data as ResponseDto<DeleteReviewBoardResponseDto>;
    // if(!result || !data || data.resultStatus) return;
    navigator('/reviewBoard/list');
  }

  //          Error Handler          //
  const getBoardErrorHandler = (error: any) => console.log(error.message);
  const getReviewBoardErrorHandler = (error : any) => console.log(error.message);
  const recommendErrorHandler = (error: any) => console.log(error.message);
  const postCommentErrorHandler = (error: any) => console.log(error.message);
  const deleteBoardErrorHandler = (error: any) => console.log(error.message);

  //^ Function
  //? 글 조회는 Dto 1개에 집합 객체가 3개 묶여있어서 하나 바뀔 때 마다 이 함수에서 한 개 씩 바꿔주는 듯
  const setReviewBoardResponse = (data: GetReviewBoardResponseDto | RecommendReviewBoardResponseDto | PostCommentResponseDto) => {

    const { board, commentList, recommendList } = data;
    setReviewBoard(board);
    setFestivalList(commentList);
    setRecommendList(recommendList);
    setComment(commentList);
  }

  useEffect(() => {
    
    if (isCheck === true) return;
    getBoard();
    isCheck = true;

  }, [path])

  useEffect(() => {
    if (!signInUser) return;

    const boardOwner = signInUser !== null && reviewBoard?.writerUserId === signInUser.userId;
    setMenuFlag(boardOwner);

    const recommend = recommendList.find((recommend) => recommend.userId === signInUser.userId);
    setRecommendStatus(recommend !== undefined);
  }, [recommendList])

  return (
    <Box sx={{ backgroundColor: '#c0c0c0' }}>
      <Box sx={{ backgroundColor: '#FFFFFF', height: '80%', ml: '200px', mr: '200px' }}>

        <Box display='flex' justifyContent='flex-end'>
          <Box sx={{ mb: '30px', width: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ width: '80px', height: '80px', m: '10px' }} src={reviewBoard?.writerProfileUrl ? reviewBoard.writerProfileUrl : ''} />

              <Typography sx={{ mt: '10px', mr: '10px', fontWeight: 550 }}>작성자 명 : {reviewBoard?.writerNickname}</Typography>
            </Box>
            <Box sx={{ mt: '40px', ml: '10px', fontWeight: 600 }}>
              <IconButton sx={{ color: 'red' }}>
                <WarningIcon />
              </IconButton>
              신고
            </Box>
          </Box>
        </Box>

        {menuFlag && (
          <Box sx={{ mr: '50px' }} display='flex' justifyContent='flex-end'>
            <IconButton onClick={(event) => onMenuClickHandler(event)}>
              <DragHandleIcon />
            </IconButton>
      
        </Box>
        )}
        <Menu sx ={{ position : 'absolute', top : '-490px', left : '1425px'}} anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler}>
          <MenuItem sx={{ p: '10px 59px', opacity: 0.5 }} onClick={() => navigator(`/reviewboard/update/${reviewBoard?.boardNumber}`)}>게시글 수정</MenuItem>
          <Divider />
          <MenuItem sx={{ p: '10px 59px', color: '#ff0000', opacity: 0.5 }} onClick={() => onDeleteBoardHandler()}>게시글 삭제</MenuItem>
        </Menu>
        

        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '20%' }}>
          <Typography sx={{ ml: '50px', fontSize: '34px', fontWeight: 600 }}>{reviewBoard?.boardTitle}</Typography>
          <Typography sx={{ mt: '10px', mr: '50px', fontSize: '20px' }}>{reviewBoard?.boardWriteDatetime}</Typography>
        </Box>

        <Divider sx={{ mr: '50px', ml: '50px', borderBottomWidth: 2, borderColor: '#000000' }} />

        <Box>
          <Box sx={{ ml: '60px', mr: '60px', mt: '30px' }}>
            <img src={reviewBoard?.boardImgUrl ? reviewBoard.boardImgUrl : ''} />
            <Typography sx={{ fontSize: '18px', mt: '10px' }}>{reviewBoard?.boardContent}</Typography>
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
                추천 {reviewBoard?.recommendCount}</Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>댓글 수 {reviewBoard?.commentCount} </Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>조회수 {reviewBoard?.viewCount}</Box>
            </Box>

            <Box sx={{ mr: '40px', fontWeight: 550 }}>
              <Box sx={{ display: 'inline', ml: '25px' }} onClick={onClickNextBoardHandler}>
                <IconButton sx={{ color: 'black' }}>
                  <ArrowUpwardIcon />
                </IconButton>
                다음 글
              </Box>

              <Box sx={{ display: 'inline', ml: '25px' }} onClick={onClickPreviousBoardHandler}>
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
          <Box sx={{ ml: '30px', display : 'flex', justifyContent : 'space-between'}}>
            <Stack>
              {viewList.map((commentItem) => <CommentListItem types='board' setCommentList={setFestivalList} item={commentItem as Comment} />)}
            </Stack>
          </Box>


          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)}></Pagination>
          </Box>

          <Box sx={{ pt: '20px', pb: '15px', pl: '50px', pr: '50px' }}>
            <Card variant='outlined' sx={{ p: '20px' }}>
              <Input
                minRows={3}
                multiline disableUnderline fullWidth
                onChange={(event) => setCommentContent(event.target.value)} />
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  onClick={() => onPostCommentHandler()}
                  sx={{
                    p: '4px 20px',
                    backgroundColor: '#00ffff',
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 700,
                    borderRadius: '42px'
                  }}>댓글 작성</Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>

  )
}
