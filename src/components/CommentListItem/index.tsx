import { Avatar, Box, Button, Card, Divider, IconButton, Input, Typography } from '@mui/material'
import { useState, useEffect, Dispatch } from 'react';
import { Comment, FreeBoard, FreeBoardComment, FreeBoardRecommend } from 'src/interfaces'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSignInStore } from 'src/stores';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { DELETE_FREE_BOARD_COMMENT, DELETE_REVIEW_BOARD_COMMENT_URL, PATCH_FREE_BOARD_COMMENT_URL, PATCH_REVIEW_BOARD_COMMENT_URL, authorizationHeader } from 'src/constants/api';
import ResponseDto from 'src/apis/response';
import { DeleteCommentResponseDto, PatchCommentResponseDto, PostCommentResponseDto } from 'src/apis/response/board';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PatchCommentRequestDto } from 'src/apis/request/board';
import { PatchFreeBoardCommentRequestDto } from 'src/apis/request/freeboard';
import { DeleteFreeBoardCommentResponseDto, GetFreeBoardResponseDto, PatchFreeBoardCommentResponseDto, PostFreeBoardCommentResponseDto } from 'src/apis/response/freeboard';
import Recommend from 'src/interfaces/Recommend.interface';
import { usePagingHook } from 'src/hooks';

interface Props {
  item: FreeBoardComment | Comment;
}
export default function CommentListItem({ item }: Props) {

  const [cookies] = useCookies();

  const [freeBoard, setFreeBoard] = useState<FreeBoard>(); 
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList } = usePagingHook(4);
  const [recommendList, setRecommendList] = useState<(FreeBoardRecommend | Recommend)[]>([]);

  const { signInUser } = useSignInStore();
  const [flag, setFlag] = useState<boolean>(false);
  const [comment, setComment] = useState<Comment>();
  const [drag, setDrag] = useState<boolean>(false);
  const [ freeBoardCommentUpdate, setFreeBoardCommentUpdate ] = useState<boolean>(false);
  const [ commentContent, setCommentUpdateContent ] = useState<string>('');
  const [ menuFlag, setMenuFlag] = useState<boolean>(false);

  const navigator = useNavigate();
  const accessToken = cookies.accessToken;
  const commentNumber : number = item.commentNumber;

  const path = useLocation();
  const { boardNumber } = useParams();

  //          Event Handler          //
  const onPatchCommentHandler = () => {
    const data : PatchCommentRequestDto = { boardNumber : parseInt(boardNumber as string), commentNumber, commentContent }

    axios.patch(PATCH_REVIEW_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
    .then((response) => patchCommentResponseHandler(response))
    .catch((error) => patchCommentErrorHandler(error));
  }

  const patchFreeBoardCommentHandler = () => {
    const data: PatchFreeBoardCommentRequestDto = { boardNumber: parseInt(boardNumber as string), commentNumber, commentContent } 
    axios.patch(PATCH_FREE_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
        .then((response) => patchFreeBoardCommentResponseHandler(response))
        .catch((error) => patchFreeBoardCommentErrorHandler(error))
  }

  const onDeleteFreeBoardCommentHandler = () => {
    axios.delete(DELETE_FREE_BOARD_COMMENT(commentNumber), authorizationHeader(accessToken))
        .then((response) => onDeleteFreeBoardCommentResponseHandler(response))
        .catch((error) => onDeleteFreeBoardCommentErrorHandler(error))
  }

  const onDeleteCommentHandler = () => {
    axios.delete(DELETE_REVIEW_BOARD_COMMENT_URL(commentNumber), authorizationHeader(accessToken))
    .then((response) => deleteCommentResponseHandler(response))
    .catch((error) => deleteCommentErrorHandler(error))
  }
  //           Response Handler          //
  const patchCommentResponseHandler = (response : AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchCommentResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }
  }

  const deleteCommentResponseHandler = (response : AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<DeleteCommentResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }
    navigator(`/reviewBoard/detail/${boardNumber}`);
  }

  const patchFreeBoardCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchFreeBoardCommentResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    navigator(`/freeBoard/detail/${boardNumber}`);
  }

  const onDeleteFreeBoardCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data} = response.data as ResponseDto<DeleteFreeBoardCommentResponseDto>
    if (!result || !data){ 
      alert(message);
      return;
    }
  }
  //          Error Handler          //
  const patchCommentErrorHandler = (error : any) => console.log(error.message);
  const deleteCommentErrorHandler = (error : any) => console.log(error.message);
  const patchFreeBoardCommentErrorHandler = (error: any) => console.log(error.message);
  const onDeleteFreeBoardCommentErrorHandler = (error: any) => console.log(error.message);

  const onClickCommentDragButton = () => {
    if(drag === true){
      setDrag(false);
      return;
    }
    setDrag(true);
  }

  useEffect(() => {
    const owner = signInUser !== null && item?.writerUserId === signInUser.userId;
    if (owner) setFlag(true);

  }, [])

  return (
    <Box>
      <Box sx={{  width : '1455px', display: 'flex', justifyContent:'space-between', ml: '20px', mb: '12px' }}>
        <Box sx={{ display: 'flex' }}>
          <Avatar sx={{ mr: '10px', width: '50px', height: '50px' }} src={item?.writerProfileUrl ? item?.writerProfileUrl : ''} />
          <Typography sx={{ mr: '10px' }}>{item?.writerNickname + ' | '}</Typography>
          <Typography sx={{ mr: '10px' }}>{item?.writeDatetime}</Typography>
        </Box>

        <Box sx={{ mr: '40px'}}>

          {flag
            ?
            <IconButton onClick={onClickCommentDragButton}>
              <DragIndicatorIcon />
            </IconButton>
            :
            <></>
          }

          {drag
            ?
            <Box sx = {{position : 'absolute'}}>
              <Typography onClick = {() => setFreeBoardCommentUpdate(true)}>댓글 수정</Typography>
              <Divider />
              <Typography onClick = {onDeleteFreeBoardCommentHandler}>댓글 삭제</Typography>
            </Box>
            : 
            <></>
          }

        </Box>
      </Box>
      <Typography sx={{ fontSize: '17px', ml: '20px', mb: '8px', mt: '8px', mr: '20px' }}>{item?.commentContent}</Typography>
      {freeBoardCommentUpdate ? (<Box sx={{ pt: '20px', pb: '15px', pl: '50px', pr: '50px' }}>
        <Card variant='outlined' sx={{ p: '20px' }}>
          <Input minRows={3} multiline disableUnderline fullWidth onChange={(event) => setCommentUpdateContent(event.target.value)}/>
          <Box sx={{ display: 'flex', justifyContent: 'end'}}>
            <Button sx={{ p : '4px 20px', backgroundColor : '#00ffff', color : 'black', fontSize: '16px', fontWeight : 700, borderRadius: '42px' }} onClick={patchFreeBoardCommentHandler}>댓글 수정</Button>
          </Box>
        </Card>
      </Box>) : (<></>)}
    </Box>
  )
}
