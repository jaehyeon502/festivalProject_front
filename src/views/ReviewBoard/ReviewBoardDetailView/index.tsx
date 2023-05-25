import { MouseEvent, useEffect, useState } from 'react';
import { Box, Divider, Typography, Pagination, Avatar, Stack, IconButton, Input, Card, Button, Menu, MenuItem } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Comment, ReviewBoard } from 'src/interfaces';
import CommentListItem from 'src/components/CommentListItem';
import { usePagingHook } from 'src/hooks';
import { getpagecount } from 'src/utils';
import WarningIcon from '@mui/icons-material/Warning';
import { useCookies } from 'react-cookie';
import { DELETE_REVIEW_BOARD_URL, GET_ALL_REVIEWBOARD_LIST_URL, GET_REVIEW_BOARD_URL, POST_REVIEW_BOARD_COMMENT_URL, POST_REVIEW_BOARD_RECOMMEND_URL, authorizationHeader } from 'src/constants/api';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { DeleteReviewBoardResponseDto, GetReviewBoardListResponseDto, GetReviewBoardResponseDto, GetSearchReviewBoardListResponseDto, PostCommentResponseDto, RecommendReviewBoardResponseDto } from 'src/apis/response/board';
import { PostCommentRequestDto, RecommendReviewBoardRequestDto } from 'src/apis/request/board';
import Recommend from 'src/interfaces/Recommend.interface';
import { useReviewBoardStore, useSignInStore } from 'src/stores';
import ReviewBoardListItem from 'src/components/ReviewBoardListItem';

export default function ReviewBoardDetailView() {

  //          Hook          //
  const path = useLocation();

  const { boardNumber } = useParams();
  const [board, setBoard] = useState<ReviewBoard>();

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
  const { reviewBoardList } = useReviewBoardStore();
  const accessToken = cookies.accessToken;
  let isCheck = false;

  //          Event Handler          //
  const onClickRecommendHandler = () => onRecommendHandler()

  const getBoard = () => {
    axios.get(GET_REVIEW_BOARD_URL(boardNumber as string))
      .then((response) => getBoardResponseHandler(response))
      .catch((error) => getBoardErrorHandler(error));
  }

  const getReviewBoardList = () => {
    axios.get(GET_ALL_REVIEWBOARD_LIST_URL)
      .then((response) => getReviewBoardListResponseHandler(response))
      .catch((error) => getReviewBoardErrorHandler(error))
  }

  const onRecommendHandler = () => {
    if (!accessToken) return;
    const data: RecommendReviewBoardRequestDto = { boardNumber: parseInt(boardNumber as string) };

    axios.post(POST_REVIEW_BOARD_RECOMMEND_URL, data, authorizationHeader(accessToken))
      .then((response) => recommendResponseHandler(response))
      .catch((error) => recommendErrorHandler(error))
  }

  const onPostCommentHandler = () => {
    if (!accessToken) return;
    const data: PostCommentRequestDto = { boardNumber: parseInt(boardNumber as string), commentContent }

    axios.post(POST_REVIEW_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
      .then((response) => postCommentReponseHandler(response))
      .catch((error) => postCommentErrorHandler(error))
  }

  const onClickNextBoardHandler = () => {

    const nextBoardNumberIndex = reviewBoardList.findIndex((reviewNumber) => reviewNumber === Number(boardNumber as string)) - 1;

    if (nextBoardNumberIndex < 0) {
      alert('다음 글이 없습니다.');
      return;
    }
    const nextBoardNumber = reviewBoardList[nextBoardNumberIndex];

    navigator(`/reviewBoard/detail/${nextBoardNumber}`);
  }

  const onClickPreviousBoardHandler = () => {
    const previousBoardNumberIndex = reviewBoardList.findIndex((reviewNumber) => reviewNumber === Number(boardNumber as string)) + 1;
    console.log(previousBoardNumberIndex)

    if (previousBoardNumberIndex >= reviewBoardList.length) {
      alert('이전 글이 없습니다.')
      return;
    }
    const previousBoardNumber = reviewBoardList[previousBoardNumberIndex];

    navigator(`/reviewBoard/detail/${previousBoardNumber}`);
  }

  const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(null);
    setMenuOpen(true);
  }

  const onMenuCloseHandler = () => {
    setAnchorElement(null);
    setMenuOpen(false);
  }

  const onDeleteBoardHandler = () => {
    if (!accessToken) return;
    if (board?.writerUserId !== signInUser?.userId) return;

    axios.delete(DELETE_REVIEW_BOARD_URL(boardNumber as string), authorizationHeader(accessToken))
      .then((response) => deleteBoardResponseHandler(response))
      .catch((error) => deleteBoardErrorHandler(error))
  }

  //          Response Handler          //
  const getBoardResponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<GetReviewBoardResponseDto>
    if (!result || !data) {
      //alert(message);
      return;
    }
    setReviewBoardResponse(data);
  }

  const getReviewBoardListResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetReviewBoardResponseDto[]>
    if (!result || data === null) return;
    setFestivalList(data);
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

  const deleteBoardResponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<DeleteReviewBoardResponseDto>;
    if (!result || !data || !data.resultStatus) return;
    navigator('/reviewBoard/list');
  }

  //          Error Handler          //
  const getBoardErrorHandler = (error: any) => console.log(error.message);
  const recommendErrorHandler = (error: any) => console.log(error.message);
  const postCommentErrorHandler = (error: any) => console.log(error.message);
  const deleteBoardErrorHandler = (error: any) => console.log(error.message);
  const getReviewBoardErrorHandler = (error: any) => console.log(error.message);

  //^ Function
  const setReviewBoardResponse = (data: GetReviewBoardResponseDto | RecommendReviewBoardResponseDto | PostCommentResponseDto) => {

    const { board, commentList, recommendList } = data;
    setBoard(board);
    setFestivalList(commentList);
    setRecommendList(recommendList);
    // setComment(commentList);
  }

  //          Use Effect          //
  useEffect(() => {
    if (isCheck === true) return;
    getBoard();
    isCheck = true;

  }, [path])

  useEffect(() => {
    if (!signInUser) return;

    const boardOwner = signInUser !== null && board?.writerUserId === signInUser.userId;
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
              <Avatar sx={{ width: '80px', height: '80px', m: '10px' }} src={board?.writerProfileUrl ? board.writerProfileUrl : ''} />

              <Typography sx={{ mt: '10px', mr: '10px', fontWeight: 550 }}>작성자 명 : {board?.writerNickname}</Typography>
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
        <Menu sx={{ position: 'absolute', top: '-490px', left: '1425px' }} anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler}>
          <MenuItem sx={{ p: '10px 59px', opacity: 0.5 }} onClick={() => navigator(`/reviewboard/update/${boardNumber}`)}>게시글 수정</MenuItem>
          <Divider />
          <MenuItem sx={{ p: '10px 59px', color: '#ff0000', opacity: 0.5 }} onClick={() => onDeleteBoardHandler()}>게시글 삭제</MenuItem>
        </Menu>


        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '20%' }}>
          <Typography sx={{ ml: '50px', fontSize: '34px', fontWeight: 600 }}>{board?.boardTitle}</Typography>
          <Typography sx={{ mt: '10px', mr: '50px', fontSize: '20px' }}>{board?.boardWriteDatetime}</Typography>
        </Box>

        <Divider sx={{ mr: '50px', ml: '50px', borderBottomWidth: 2, borderColor: '#000000' }} />

        <Box>
          <Box sx={{ ml: '60px', mr: '60px', mt: '30px' }}>
            <img src={board?.boardImgUrl ? board.boardImgUrl : ''} />
            <Typography sx={{ fontSize: '18px', mt: '10px' }}>{board?.boardContent}</Typography>
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
                추천 {board?.recommendCount}</Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>댓글 수 {board?.commentCount} </Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>조회수 {board?.viewCount}</Box>
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
          <Box sx={{ ml: '30px' }}>
            <Stack>
              {viewList.map((commentItem) => <CommentListItem types='board' setCommentList={setFestivalList} item={commentItem as Comment} setBoard={setBoard} />)}
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
