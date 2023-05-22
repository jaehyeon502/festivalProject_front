import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { Comment, FreeBoardComment } from 'src/interfaces'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSignInStore } from 'src/stores';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { DELETE_REVIEW_BOARD_COMMENT_URL, PATCH_REVIEW_BOARD_COMMENT_URL, authorizationHeader } from 'src/constants/api';
import ResponseDto from 'src/apis/response';
import { DeleteCommentResponseDto, PatchCommentResponseDto } from 'src/apis/response/board';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PatchCommentRequestDto } from 'src/apis/request/board';

interface Props {
  item: Comment;
}
export default function CommentListItem({ item }: Props) {

  const [cookies] = useCookies();

  const { signInUser } = useSignInStore();
  const [flag, setFlag] = useState<boolean>(false);
  const [comment, setComment] = useState<Comment>();
  const [drag, setDrag] = useState<boolean>(false);

  const navigator = useNavigate();
  const accessToken = cookies.accessToken;
  const commentNumber : number  = item.commentNumber;
  const commentContent = item.commentContent;

  const path = useLocation();
  const { boardNumber } = useParams();

  //          Event Handler          //
  const onPatchCommentHandler = () => {

    const data : PatchCommentRequestDto = {
      boardNumber : parseInt(boardNumber as string),
      commentNumber,
      commentContent
    }

    axios.patch(PATCH_REVIEW_BOARD_COMMENT_URL, authorizationHeader(accessToken))
    .then((response) => patchCommentResponseHandler(response))
    .catch((error) => patchCommentErrorHandler(error));
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
    // if(!result || !data){
    //   alert(message);
    //   return;
    // }
    // navigator(`/reviewBoard/detail/${boardNumber}`)
  }

  //          Error Handler          //
  const patchCommentErrorHandler = (error : any) => console.log(error.message);
  const deleteCommentErrorHandler = (error : any) => console.log(error.message);

  const onClickCommentDragButton = () => {
    if(drag === true){
      setDrag(false);
      return;
    }
    setDrag(true);
  }

  useEffect(() => {
    const owner = signInUser !== null && item?.writerId === signInUser.userId;
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
              <Typography onClick = {onPatchCommentHandler}>댓글 수정</Typography>
              <Divider />
              <Typography onClick = {() => onDeleteCommentHandler()}>댓글 삭제</Typography>
            </Box>
            : 
            <></>
          }

        </Box>
      </Box>
      <Typography sx={{ fontSize: '17px', ml: '20px', mb: '8px', mt: '8px', mr: '20px' }}>{item?.commentContent}</Typography>
    </Box>
  )
}
