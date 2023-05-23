import React, { MouseEvent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Box, Divider, Typography, Pagination, Avatar, Stack, IconButton, Input, Card, Button, Menu, MenuItem } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FreeBoard, FreeBoardComment, FreeBoardRecommend } from 'src/interfaces';
import { usePagingHook } from 'src/hooks';
import { getpagecount } from 'src/utils';
import WarningIcon from '@mui/icons-material/Warning';
import { DELETE_FREE_BOARD, FREE_BOARD_RECOMMEND_URL, GET_FREE_BOARD_URL, POST_FREE_BOARD_COMMENT_URL, authorizationHeader } from 'src/constants/api';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { DeleteFreeBoardResponseDto, FreeBoardRecommendResponseDto, GetFreeBoardResponseDto, PostFreeBoardCommentResponseDto } from 'src/apis/response/freeboard';
import { useSignInStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { FreeBoardRecommendRequestDto, PostFreeBoardCommentRequestDto } from 'src/apis/request/freeboard';
import CommentListItem from 'src/components/CommentListItem';

export default function FreeBoardDetailView() {
  
  const path = useLocation();

  //          Hook          //
  const {signInUser} = useSignInStore();

  const [freeBoard, setFreeBoard] = useState<FreeBoard>();

  const [recommendList, setRecommendList] = useState<FreeBoardRecommend[]>([]);
  const [recommendStatus, setRecommendStatus] = useState<boolean>(false);

  const [ menuFlag, setMenuFlag] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [ commentContent, setCommentContent ] = useState<string>('');
  const { boardNumber } = useParams();

  const navigator = useNavigate();

  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);

  const [cookies] = useCookies();
  const accessToken = cookies.accessToken;
  let isLoad = false;

  const setFreeBoardResponse = (data : GetFreeBoardResponseDto | PostFreeBoardCommentResponseDto | FreeBoardRecommendResponseDto) =>{
    const { freeBoard, commentList, recommendList } = data;
    setFreeBoard(freeBoard);
    setFestivalList(commentList);
    setRecommendList(recommendList);
  }

  //          Event Handler          //
  const onClickRecommendHandler = () => {
    onRecommendHandler();
  }

  const onRecommendHandler = () => {
    const data: FreeBoardRecommendRequestDto = { boardNumber: parseInt(boardNumber as string) };
    axios.post(FREE_BOARD_RECOMMEND_URL, data, authorizationHeader(accessToken))
        .then((response) => onRecommendResponseHandler(response))
        .catch((error) => onRecommendErrorHandler(error))
  }

  const onRecommendResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<FreeBoardRecommendResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    setFreeBoardResponse(data);
  }

  const onRecommendErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const onDeleteFreeBoardHandler = () => {
    if(!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    if(freeBoard?.writerUserId !== signInUser?.userId) {
      alert('권한이 없습니다.');
      return;
    }

    axios.delete(DELETE_FREE_BOARD(boardNumber as string), authorizationHeader(accessToken))
        .then((response) => onDeleteFreeBoardResponseHandler(response))
        .catch((error) => onDeleteFreeBoardErrorHandler(error))
  }

  const onPostFreeBoardCommentHandler = () => {
    if(!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const data: PostFreeBoardCommentRequestDto = { boardNumber: parseInt(boardNumber as string), commentContent};
    axios.post(POST_FREE_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
        .then((response) => onPostFreeBoardCommentResponseHandler(response))
        .catch((error) => onPostFreeBoardCommentErrorHandler(error))
  }

  const getFreeBoard = () => {
    axios.get(GET_FREE_BOARD_URL(boardNumber as string))
        .then((response) => getFreeBoardResponse(response))
        .catch((error) => getFreeBoardError(error))
  }

  //? 다음 글
  const onClickNextBoardHandler = () => {
    let freeBoardNumber : number = boardNumber ? Number(boardNumber) + 1 : Number(boardNumber);
    while(!boardNumber) freeBoardNumber += 1;

    if (freeBoardNumber > 1000) {
      alert('다음 글이 없습니다.');
      return;
    }
    navigator(`/freeBoard/detail/${freeBoardNumber}`);
  }

  //? 이전 글
  const onClickPreviousBoardHandler = () => {
    let freeBoardNumber: number = boardNumber ? Number(boardNumber) - 1 : Number(boardNumber);
    while(!boardNumber) freeBoardNumber -= 1;

    if (freeBoardNumber < 1) {
      alert('이전 글이 없습니다.');
      return;
    }
    navigator(`/freeBoard/detail/${freeBoardNumber}`);
  }

  const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(null);
    setMenuOpen(true);
  }

  const onMenuCloseHandler = () => {
    setAnchorElement(null);
    setMenuOpen(false);
  }

  //          Response Handler          //
  const onPostFreeBoardCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PostFreeBoardCommentResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    setFreeBoardResponse(data);
    setCommentContent('');
  }
  const onDeleteFreeBoardResponseHandler = (response: AxiosResponse<any, any>) => {
    const {result, message, data} = response.data as ResponseDto<DeleteFreeBoardResponseDto>
    if (!result || !data || !data.resultStatus) {
      alert(message);
      return;
    }
    alert('삭제되었습니다.');
    navigator('/freeboard/list');
  }
  const getFreeBoardResponse = (response: AxiosResponse<any, any>) => {
    const {result, message, data } = response.data as ResponseDto<GetFreeBoardResponseDto>
    if(!result || !data) return;
    setFreeBoardResponse(data);
  }
  //          Error Handler          //
  const onPostFreeBoardCommentErrorHandler = (error: any) => {
    console.log(error.message);
  }
  const onDeleteFreeBoardErrorHandler = (error: any) => {
    console.log(error.message);
  }
  const getFreeBoardError = (error: any) => {
    console.log(error.message);
  }

  //          use Effect          //
  useEffect(() => {

    if (isLoad) return;
    //? boardNumber가 존재하는지 검증
    if (!boardNumber) {
      navigator("/");
      return;
    }
    isLoad = true;
    getFreeBoard();
    console.log(freeBoard);
  }, [path]);

  useEffect(() => {
    if (!signInUser) return;

    const boardOwner = signInUser !== null && freeBoard?.writerUserId === signInUser.userId;
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

        {menuFlag && (
          <Box sx={{ mr: '50px' }} display='flex' justifyContent='flex-end'>
            <IconButton onClick={(event) => onMenuClickHandler(event)}>
              <DragHandleIcon />
            </IconButton>
      
        </Box>
        )}
        <Menu sx ={{ position : 'absolute', top : '-490px', left : '1425px'}} anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler}>
          <MenuItem sx={{ p: '10px 59px', opacity: 0.5 }} onClick={() => navigator(`/reviewboard/update/${freeBoard?.boardNumber}`)}>게시글 수정</MenuItem>
          <Divider />
          <MenuItem sx={{ p: '10px 59px', color: '#ff0000', opacity: 0.5 }} onClick={() => onDeleteFreeBoardHandler()}>게시글 삭제</MenuItem>
        </Menu>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '20%' }}>
          <Typography sx={{ ml: '50px', fontSize: '34px', fontWeight: 600 }}>{freeBoard?.boardTitle}</Typography>
          <Typography sx={{ mt: '10px', mr: '50px', fontSize: '20px' }}>{freeBoard?.boardWriteDatetime}</Typography>
        </Box>

        <Divider sx={{ mr: '50px', ml: '50px', borderBottomWidth: 2, borderColor: '#000000' }} />

        <Box>
          <Box sx={{ ml: '60px', mr: '60px', mt: '30px' }}>
            <Typography sx={{ fontSize: '18px', mt: '10px' }}>{freeBoard?.boardContent}</Typography>
            {freeBoard?.boardImgUrl && (<Box sx={{ width: '100%', mt: '20px' }} component='img' src={freeBoard?.boardImgUrl} />)}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '30px' }}>
            <Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>
                <IconButton onClick={() => onClickRecommendHandler()} >
                  {recommendStatus ?
                    <ThumbUpIcon sx={{ width: '20px', height: '20px', color: 'blue' }} />
                    :
                    <ThumbUpOutlinedIcon sx={{ width: '20px', height: '20px' }} />}
                </IconButton>
                추천 {freeBoard?.recommendCount}</Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>댓글 수 {freeBoard?.commentCount} </Box>
              <Box sx={{ display: 'inline', ml: '25px' }}>조회수 {freeBoard?.viewCount}</Box>
            </Box>

            <Box sx={{ mr: '40px', fontWeight: 550 }}>
              <Box sx={{ display: 'inline', ml: '25px' }}  onClick={onClickNextBoardHandler}>
                <IconButton sx={{ color: 'black' }}>
                  <ArrowUpwardIcon />
                </IconButton>
                다음 글
              </Box>

              <Box sx={{ display: 'inline', ml: '25px' }}  onClick={onClickPreviousBoardHandler}>
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
              {viewList.map((commentItem) => <CommentListItem types='freeBoard' setCommentList={setFestivalList} item={commentItem as FreeBoardComment} />)}
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination page={pageNumber} count={getpagecount(festivalList, COUNT)} onChange={(event, value) => onPageHandler(value)}></Pagination>
          </Box>

          <Box sx={{ pt: '20px', pb: '15px', pl: '50px', pr: '50px' }}>
            <Card variant='outlined' sx={{ p: '20px' }}>
              <Input minRows={3} multiline disableUnderline fullWidth onChange={(event) => setCommentContent(event.target.value)} />
              <Box sx={{ display: 'flex', justifyContent: 'end'}}>
                <Button sx={{ p : '4px 20px', backgroundColor : '#00ffff', color : 'black', fontSize: '16px', fontWeight : 700, borderRadius: '42px' }} onClick={() => onPostFreeBoardCommentHandler()}>댓글 작성</Button>
              </Box>
            </Card>
          </Box>

        </Box>

      </Box>
    </Box>

  )
}