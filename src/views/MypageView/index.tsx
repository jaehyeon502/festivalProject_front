import { Avatar, Box, Button, Card, Grid, IconButton, Input, Pagination, Stack, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ResponseDto from 'src/apis/response';
import { GetMyReviewBoardListResponseDto } from 'src/apis/response/board';
import FestivalReviewBoardList from 'src/components/FestivalReiviewBoardList'
import { FILE_UPLOAD_URL, GET_ALL_REVIEWBOARD_LIST_URL, PATCH_USER_PROFILE, authorizationHeader, multipartHeader } from 'src/constants/api';
import { usePagingHook } from 'src/hooks';
import { useSignInStore } from 'src/stores';
import { getpagecount } from 'src/utils';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { PatchUserProfileResponseDto } from 'src/apis/response/user';
import { PatchUserNicknameRequestDto, PatchUserProfileRequestDto } from 'src/apis/request/user';

export default function MypageView() {
  //          HOOk            //
  const{festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList} = usePagingHook(5);

  const navigator = useNavigate();
  const imageRef = useRef<HTMLInputElement | null>(null);

  const {signInUser} = useSignInStore();
  const { setSignInUser } = useSignInStore();

  const [ userProfileUrl, setUserProfileUrl ] = useState<string>('');
  const [ onChangeClick, setOnChangeClick ] = useState<boolean>(false);
  const [ updatedUserNickname, setUpdatedUserNickname ] = useState<string>('');
  const [ updatedUserProfileUrl, setUpdatedUserProfileUrl ] = useState<string | null>(null);

  const [cookies] = useCookies();


  const accessToken = cookies.accessToken;   

  const profileChangeButtonClick = () => {
    setOnChangeClick(true);
  }

  //          EVENT HANDLER           //
  const getMyReviewBoardResponse=(accessToken:string)=>{
      axios
      .get(GET_ALL_REVIEWBOARD_LIST_URL,authorizationHeader(accessToken))
      .then((response)=>getMyReviewBoardResponseHandler(response))
      .catch((error)=>getMyReviewBoardErrorHandler(error))
  }

  const onClickChangeProfileButtonHandler = () => {
    if(!imageRef.current) return;
    imageRef.current.click();
  }

  const onUserProfileUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return;
    const data = new FormData();
    data.append('file', event.target.files[0]);

    axios.post(FILE_UPLOAD_URL, data, multipartHeader())
      .then((response) => userChangeProfileResponseHandler(response))
      .catch((error) => userChangeProfileErrorHandler(error))
  }

  const userChangeProfileResponseHandler = (response: AxiosResponse<any, any>) => {
    const profileUrl = response.data as string;
    setUpdatedUserProfileUrl(profileUrl);
  }

  const patchProfileResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PatchUserProfileResponseDto>
    if(!result || !data) {
      alert(message);
      return;
    }
    setSignInUser(data);
    alert('변경되었습니다!')
    setOnChangeClick(false);
  }

  const completeChangeResponseHandler = () => {

    const data = {
      nickname: updatedUserNickname,
      profileUrl: updatedUserProfileUrl
    };

    axios.patch(PATCH_USER_PROFILE, data, authorizationHeader(accessToken))
      .then((response) => patchProfileResponseHandler(response))
      .catch((error) => patchProfileErrorHandler(error));
  }
  
  //          Response Handler          //
  const getMyReviewBoardResponseHandler = (response:AxiosResponse<any,any>)=>{
    const {result,message,data} = response.data as ResponseDto<GetMyReviewBoardListResponseDto[]>
    if(!result || data === null) return;
    setFestivalList(data)
  
  }

  //            Error Handler           //
  const getMyReviewBoardErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const userChangeProfileErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const patchProfileErrorHandler = (error: any) => {
    console.log(error.message);
  }

  //          Use effect        //
  useEffect(() => {
    getMyReviewBoardResponse(accessToken);

  }, []);

  useEffect(() => {
    if(accessToken == null){
        navigator('/');
    }

    if (signInUser) {
      setUpdatedUserNickname(signInUser.nickname);
      setUpdatedUserProfileUrl(signInUser.profileUrl);
    }
  
  }, []);

  return (
    <Box sx={{p:'40px 120px'}} >
        <Box>
            <Typography sx={{fontSize:'20px',fontWeight:900}}>내가 작성한 후기 게시글</Typography>
        </Box>
        <Box sx={{m:'20px 0px 80px'}}>
            <Grid container spacing={3}>
                <Grid item sm={12} md={8}>
                    <Stack spacing={2}>
                    {viewList.map((festivalBoardList)=>(<FestivalReviewBoardList festivalBoardList={festivalBoardList as GetMyReviewBoardListResponseDto }/>)) }
                    </Stack>
                </Grid>
                <Grid item sm={12} md={3}> 
                    <Box sx={{display:'flex',alignItems:'center'}}>
                      <Avatar sx={{height:'120px' ,width:'120px'}} src={signInUser?.profileUrl as string}/>
                      <Box sx={{ml:'15px'}}>
                        <Typography sx={{fontSize:'20px',fontWeight:700}}>아이디 : {signInUser?.userId}</Typography>
                        <Typography sx={{fontSize:'20px',fontWeight:700}}>닉네임 : {signInUser?.nickname}</Typography>
                          <Box>
                            <Button variant="contained" component="label" onClick={() => profileChangeButtonClick()}>
                              수정
                            </Button>
                          </Box>
                      </Box>
                    </Box>
                    { onChangeClick ? ( 
                    <Box sx={{mt:'15px'}}>
                      <Typography sx={{fontSize:'20px',fontWeight:700}}>프로필 수정</Typography>
                        <Card sx={{height:'220px',p:'25px'}}>
                          <Stack sx={{ alignItems: 'center'}}>
                            <Typography sx={{ fontSize:'15px', fontWeight:700}}>변경할 닉네임 : <Input defaultValue={updatedUserNickname} sx={{ fontSize: '15px', fontWeight: 500}} onChange={(event) => setUpdatedUserNickname(event.target.value)} /></Typography>
                            <Typography>변경하고 싶은 사진 : 
                              <IconButton onClick={() => onClickChangeProfileButtonHandler()}>
                                <ImageOutlinedIcon />
                                <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => onUserProfileUploadChangeHandler(event)} />
                              </IconButton> 
                            </Typography>
                            <Avatar sx={{height:'120px', width:'120px'}} src={updatedUserProfileUrl ? updatedUserProfileUrl : ''}>
                            </Avatar>
                          </Stack>
                          <Box>
                            <Button sx={{ mt: '5px'}} variant="contained" component="label" onClick={() => completeChangeResponseHandler()} >
                              완료
                            </Button>
                          </Box>
                        </Card>
                      </Box>
                    ) : (
                      <Box sx={{mt:'15px'}}>
                      <Typography sx={{fontSize:'20px',fontWeight:700}}>내 관심 축제</Typography>
                        <Card sx={{height:'200px',p:'25px'}}>
                          <Stack sx={{alignItems:'center'}}>
                              { signInUser?.interestedFestival?.map((type) => <Card><Typography sx={{fontSize:'30px'}}>{type}</Typography></Card>) }
                          </Stack>
                        </Card>
                      </Box>
                    )}
                    
                </Grid>
            </Grid>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}} >
          <Pagination  sx={{mt:'20px',ml:'20px',mr:'20px'}} page={pageNumber} count={getpagecount(festivalList,COUNT)} onChange={(event, value) => onPageHandler(value)} />
        </Box>
    </Box>
  )
}
