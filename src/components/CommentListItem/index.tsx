<<<<<<< HEAD
import { Avatar, Box, Button, Card, Divider, IconButton, Input, Typography } from '@mui/material'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Comment, FreeBoard, FreeBoardComment, FreeBoardRecommend, ReviewBoard } from 'src/interfaces'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSignInStore } from 'src/stores';
=======
import { useState, useEffect } from 'react';
>>>>>>> e31f8416f59ec7f03579583634145d164ab3929c
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import { Avatar, Box, Button, Card, Divider, IconButton, Input, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Comment, FreeBoardComment } from 'src/interfaces'
import { useSignInStore } from 'src/stores';
import { DELETE_FREE_BOARD_COMMENT, DELETE_REVIEW_BOARD_COMMENT_URL, PATCH_FREE_BOARD_COMMENT_URL, PATCH_REVIEW_BOARD_COMMENT_URL, authorizationHeader } from 'src/constants/api';
import ResponseDto from 'src/apis/response';
import { DeleteCommentResponseDto, PatchCommentResponseDto } from 'src/apis/response/board';
import { PatchCommentRequestDto } from 'src/apis/request/board';
import { PatchFreeBoardCommentRequestDto } from 'src/apis/request/freeboard';
import { DeleteFreeBoardCommentResponseDto, PatchFreeBoardCommentResponseDto } from 'src/apis/response/freeboard';

interface Props {
  item: FreeBoardComment | Comment;
  setCommentList: any;
  types: string;
  setBoard: any;

}
export default function CommentListItem({ item, setCommentList, types, setBoard }: Props) {

  const [cookies] = useCookies();

  const { signInUser } = useSignInStore();
  const [flag, setFlag] = useState<boolean>(false);
  const [drag, setDrag] = useState<boolean>(false);
  const [freeBoardCommentUpdate, setFreeBoardCommentUpdate] = useState<boolean>(false);
  const [commentContent, setCommentUpdateContent] = useState<string>('');

  const accessToken = cookies.accessToken;
  const commentNumber: number = item.commentNumber;

  const { boardNumber } = useParams();

  //          Event Handler          //
  const onPatchCommentHandler = () => {
    if (types === 'freeBoard') {
      const data: PatchFreeBoardCommentRequestDto = { boardNumber: parseInt(boardNumber as string), commentNumber, commentContent }

      axios.patch(PATCH_FREE_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
        .then((response) => patchFreeBoardCommentResponseHandler(response))
        .catch((error) => patchFreeBoardCommentErrorHandler(error))
    }
    if (types === 'board') {
      const data: PatchCommentRequestDto = { boardNumber: parseInt(boardNumber as string), commentNumber, commentContent }

      axios.patch(PATCH_REVIEW_BOARD_COMMENT_URL, data, authorizationHeader(accessToken))
        .then((response) => patchCommentResponseHandler(response))
        .catch((error) => patchCommentErrorHandler(error));
    }
  }

  const onDeleteCommentHandler = () => {
    if (types === 'freeBoard') {
      axios.delete(DELETE_FREE_BOARD_COMMENT(commentNumber), authorizationHeader(accessToken))
        .then((response) => onDeleteFreeBoardCommentResponseHandler(response))
        .catch((error) => onDeleteFreeBoardCommentErrorHandler(error))
    }
    if (types === 'board') {
      axios.delete(DELETE_REVIEW_BOARD_COMMENT_URL(commentNumber), authorizationHeader(accessToken))
        .then((response) => deleteCommentResponseHandler(response))
        .catch((error) => deleteCommentErrorHandler(error))
    }
  }
  const onClickCommentDragButton = () => {
    if (drag === true) {
      setDrag(false);
      return;
    }
    setDrag(true);
  }

  //           Response Handler          //
  const patchCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchCommentResponseDto>;
    if (!result || !data) {
      alert(message);
      return;
    }
    setCommentList(data.commentList);
    setCommentUpdateContent('');
    setFreeBoardCommentUpdate(false);
    setDrag(false);
  }

  const patchFreeBoardCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchFreeBoardCommentResponseDto>
    if (!result || data === null) {
      alert(message);
      return;
    }
    setCommentList(data.commentList);
    setCommentUpdateContent('');
    setFreeBoardCommentUpdate(false);
    setDrag(false);
  }

  const deleteCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<DeleteCommentResponseDto>;
    if (!result || !data) {
      alert(message);
      return;
    }
    setBoard(data.board);
    setCommentList(data.commentList);
    setDrag(false);
  }

  const onDeleteFreeBoardCommentResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<DeleteFreeBoardCommentResponseDto>
    if (!result || !data) {
      alert(message);
      return;
    }
<<<<<<< HEAD
    setBoard(data.freeBoard);
=======

>>>>>>> e31f8416f59ec7f03579583634145d164ab3929c
    setCommentList(data.commentList);
    setDrag(false);
  }
  //          Error Handler          //
  const patchCommentErrorHandler = (error: any) => console.log(error.message);
  const deleteCommentErrorHandler = (error: any) => console.log(error.message);
  const patchFreeBoardCommentErrorHandler = (error: any) => console.log(error.message);
  const onDeleteFreeBoardCommentErrorHandler = (error: any) => console.log(error.message);

  //          Use Effect          //
  useEffect(() => {
    const owner = signInUser !== null && item?.writerUserId === signInUser.userId;
    if (owner) setFlag(true);

  }, [])

  return (
    <Box>
<<<<<<< HEAD
      <Box sx={{  width : '100%', display: 'flex', justifyContent:'space-between', ml: '20px', mb: '12px' }}>
=======
      <Box sx={{ width: '1455px', display: 'flex', justifyContent: 'space-between', ml: '20px', mb: '12px' }}>
>>>>>>> e31f8416f59ec7f03579583634145d164ab3929c
        <Box sx={{ display: 'flex' }}>
          <Avatar sx={{ mr: '10px', width: '50px', height: '50px' }} src={item?.writerProfileUrl ? item?.writerProfileUrl : ''} />
          <Typography sx={{ mr: '10px' }}>{item?.writerNickname + ' | '}</Typography>
          <Typography sx={{ mr: '10px' }}>{item?.writeDatetime}</Typography>

<<<<<<< HEAD
          </Box>
        <Box sx={{ mr: '40px'}}>
=======
        <Box sx={{ mr: '40px' }}>

>>>>>>> e31f8416f59ec7f03579583634145d164ab3929c
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
            <Box sx={{ position: 'absolute' }}>
              <Typography onClick={() => setFreeBoardCommentUpdate(true)}>댓글 수정</Typography>
              <Divider />
              <Typography onClick={() => onDeleteCommentHandler()}>댓글 삭제</Typography>
            </Box>
            :
            <></>
          }


        </Box>

      </Box>
      <Typography sx={{ fontSize: '17px', ml: '20px', mb: '8px', mt: '8px', mr: '20px' }}>{item?.commentContent}</Typography>
      {freeBoardCommentUpdate ? (<Box sx={{ pt: '20px', pb: '15px', pl: '50px', pr: '50px' }}>
        <Card variant='outlined' sx={{ p: '20px' }}>
          <Input minRows={3} multiline disableUnderline fullWidth value={commentContent} onChange={(event) => setCommentUpdateContent(event.target.value)} />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button sx={{ p: '4px 20px', backgroundColor: '#00ffff', color: 'black', fontSize: '16px', fontWeight: 700, borderRadius: '42px' }} onClick={() => onPatchCommentHandler()}>댓글 수정</Button>
          </Box>
        </Card>
      </Box>) : (<></>)}
    </Box>
  )
}
