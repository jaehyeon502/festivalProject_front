import { Avatar, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography, FormHelperText } from "@mui/material";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SignUpCheckboxListItem from "src/components/SignUpCheckboxListItem";
import { Festival } from "src/interfaces";
import { usePagingHook } from "src/hooks";
import { SIGN_UP_CHECKBOX_LIST } from "src/mock";
import { useNavigate } from "react-router-dom";
import { useSignUpStore } from "src/stores";
import { CheckUserIdRequestDto, CheckUserNicknameRequestDto, CheckUserTelNumberRequestDto } from "src/apis/request/user";
import axios, { AxiosResponse } from "axios";
import { FILE_UPLOAD_URL, GET_FESTIVAL_TYPE_CHECKBOX_LIST_URL, GET_INTERESTED_FESTIVAL_LIST_URL, SIGN_UP_URL, VALIDATE_NICKNAME_URL, VALIDATE_TELNUMBER_URL, VALIDATE_USER_ID_URL, multipartHeader } from "src/constants/api";
import { CheckUserIdResponseDto, CheckUserNicknameResponseDto, CheckUserTelNumberResponseDto } from "src/apis/response/user";
import ResponseDto from "src/apis/response";
import CheckIcon from '@mui/icons-material/Check';
import { SignUpRequestDto } from "src/apis/request/auth";
import { SignUpResponseDto } from "src/apis/response/auth";
import { GetFestivalTypeListResponseDto } from "src/apis/response/festival";

function FirstPage() {

  //          Hook          //
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
  const { userId, password, passwordCheck, nickname, profileUrl, telNumber, signUpError } = useSignUpStore();
  const { setUserId, setPassword, setPasswordCheck, setNickname, setProfileUrl, setTelNumber } = useSignUpStore();
  const { setUserIdPatternCheck, setNicknamePatternCheck, setPasswordPatternCheck, setTelNumberPatternCheck } = useSignUpStore();
  const { setUserIdValidate, setNicknameValidate, setPasswordValidate, setTelNumberValidate } = useSignUpStore();
  const { userIdValidate, nicknameValidate, passwordValidate, telNumberValidate } = useSignUpStore();
  const { userIdPatternCheck, nicknamePatternCheck, passwordPatternCheck, telNumberPatternCheck } = useSignUpStore();

  const userIdValidator = /^[A-Za-z0-9]{8,25}$/;
  const passwordValidator = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!?@_]).{8,20}$/;
  const nicknameValidator = /^[A-Za-z0-9]{8,25}$/;
  const telNumberVaildator = /^[0-9]{3}-[0-9]{3,4}-[0-9]{3,4}$/;

  //          Event Handler          //
  const onUserIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const isMatched = userIdValidator.test(value);
    setUserIdPatternCheck(isMatched);
    setUserId(value);
  }

  const onUserIdValidateButtonHandler = () => {
    if (!setUserIdPatternCheck) return;
    const data: CheckUserIdRequestDto = { userId };
    
    axios.post(VALIDATE_USER_ID_URL, data)
        .then((response) => onUserIdValidateButtonResponseHandler(response))
        .catch((error) => onUserIdValidateButtonErrorHandler(error))
  }
  
    const onPasswordChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      const isMatched = passwordValidator.test(value);
      setPasswordPatternCheck(isMatched);
      setPassword(value);
    }
  
    const onPasswordCheckChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      const isMatched = password === value;
      setPasswordValidate(isMatched);
      setPasswordCheck(value);
    }

  const onNicknameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = nicknameValidator.test(value);
    setNicknamePatternCheck(isMatched);
    setNickname(value);
  }

  const onNicknameValidateButtonHandler = () => {
    if (!setNicknamePatternCheck) return;
    const data: CheckUserNicknameRequestDto = { nickname };

    axios.post(VALIDATE_NICKNAME_URL, data)
        .then((response) => onNicknameValidateButtonResponseHandler(response))
        .catch((error) => onNicknameValidateButtonErrorHandler(error))
  }

  const onProfileUploadButtonHandler = () => {
    if(!imageRef.current) return;
    imageRef.current.click();
  }

  const onProfileUploadChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const data = new FormData();
    data.append('file', event.target.files[0]);
    axios.post(FILE_UPLOAD_URL, data, multipartHeader())
        .then((response) => onProfileUploadChangeResponseHandler(response))
        .catch((error) => onProfileUploadChangeErrorHandler(error))
  }

  const onTelNumberChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = telNumberVaildator.test(value);
    setTelNumberPatternCheck(isMatched);
    setTelNumber(value);
  }

  const onTelNumberValidateButtonHandler = () => {
    if (!setTelNumberPatternCheck)return;
    const data: CheckUserTelNumberRequestDto = { telNumber };

    axios.post(VALIDATE_TELNUMBER_URL, data)
        .then((response) => onTelNumberValidateButtonResponseHandler(response))
        .catch((error) => onTelNumberValidateButtonErrorHandler(error))
  }

  //          Response Handler          //
  const onUserIdValidateButtonResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<CheckUserIdResponseDto>;
    if (!result || !data) {
      alert(message);
      return;
    }
    setUserIdValidate(data.resultState);
  }

  const onNicknameValidateButtonResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<CheckUserNicknameResponseDto>;
    if (!result || !data) {
      alert(message);
      return;
    }
    setNicknameValidate(data.resultState);
  }

  const onProfileUploadChangeResponseHandler = (response: AxiosResponse<any, any>) => {
    const profile = response.data as string;
    console.log(profile);
    setProfileUrl(profile);
  }

  const onTelNumberValidateButtonResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<CheckUserTelNumberResponseDto>;
    if (!result || !data) {
      alert(message);
      return;
    }
    setTelNumberValidate(data.resultState);
  }

  //          Error Handler          //
  const onUserIdValidateButtonErrorHandler = (error: any) => {
    alert(error.message);
  }

  const onNicknameValidateButtonErrorHandler = (error: any) => {
    alert(error.message);
  }
  const onProfileUploadChangeErrorHandler = (error: any) => {
    alert(error.message);
  }

  const onTelNumberValidateButtonErrorHandler = (error: any) => {
    alert(error.message);
  }

  return (
    <Box>
      <FormControl sx={{ mt: "40px" }} error={signUpError} fullWidth variant="standard">
        <InputLabel>아이디*</InputLabel>
        <Input type="text" endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => onUserIdValidateButtonHandler()}>
              <CheckIcon />
            </IconButton>
          </InputAdornment>} 
          value={userId} 
          onChange={(event) => onUserIdChangeHandler(event)} />
          {
          userIdPatternCheck === null ? (<></>) :
          !userIdPatternCheck ? (<FormHelperText sx={{ color: 'red' }}>아이디 형식이 맞지 않습니다.</FormHelperText>) :
          userIdValidate === null ? (<FormHelperText sx={{ color: 'orange' }}>아이디 중복체크를 해주세요.</FormHelperText>) :
          userIdValidate ? (<FormHelperText sx={{ color:'red' }}>이미사용중인 아이디입니다.</FormHelperText>) : 
                          (<FormHelperText sx={{ color:'green' }}>사용 가능한 아이디입니다<div className=""></div></FormHelperText>)
          }
      </FormControl>
          <FormControl sx={{ mt: "40px" }} error={signUpError} fullWidth variant="standard">
            <InputLabel>비밀번호*</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={password}
              onChange={(event) => onPasswordChangeHandler(event)}
            />
            {
              passwordPatternCheck === false ? (<FormHelperText sx={{ color:'red' }}>{'영문자 + 숫자 + 특수문자(!?@_)를 포함한 8-20자를 입력해주세요.'}</FormHelperText>) : (<></>)
            }
          </FormControl>
          <FormControl sx={{ mt: "40px" }} error={signUpError} fullWidth variant="standard">
            <InputLabel>비밀번호 확인*</InputLabel>
            <Input
              type={showPasswordCheck ? "text" : "password"}
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                  {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              }
              value={passwordCheck}
              onChange={(event) => onPasswordCheckChangeHandler(event)}
            />
            { passwordValidate === false ? (<FormHelperText sx={{ color: 'red' }}>비밀번호가 서로 일치하지 않습니다.</FormHelperText>) : (<></>) }
          </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "30px",
        }}
      >
        <FormControl
          sx={{ mt: "40px", justifyContent: "center" }}
          error={signUpError}
          fullWidth
          variant="standard"
        >
          <InputLabel>닉네임*</InputLabel>
          <Input type="text" endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => onNicknameValidateButtonHandler()}>
                <CheckIcon />
              </IconButton>
            </InputAdornment>}
            value={nickname} 
            onChange={(event) => onNicknameChangeHandler(event)}/>
            {
            nicknamePatternCheck === null ? (<></>) :
            !nicknamePatternCheck ? (<FormHelperText sx={{ color: 'red' }}>닉네임 형식이 맞지 않습니다.</FormHelperText>) :
            nicknameValidate === null ? (<FormHelperText sx={{ color: 'orange' }}>닉네임 중복체크를 해주세요.</FormHelperText>) :
            nicknameValidate ? (<FormHelperText sx={{ color:'red' }}>이미사용중인 닉네임입니다.</FormHelperText>) : 
                              (<FormHelperText sx={{ color:'green' }}>사용 가능한 닉네임입니다.<div className=""></div></FormHelperText>)
            }
        </FormControl>
        <Avatar sx={{ width: "80px", height: "80px", cursor: "pointer" }} onClick={() => onProfileUploadButtonHandler()}/>
          <input ref={imageRef} hidden type='file' accept="image/*" onChange={(event) => onProfileUploadChangeHandler(event)} />
      </Box>

      <FormControl
        sx={{ mt: "40px", justifyContent: "center" }}
        error={signUpError}
        fullWidth
        variant="standard"
      >
        <InputLabel>휴대전화번호*</InputLabel>
        <Input type="text"endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => onTelNumberValidateButtonHandler()}>
              <CheckIcon />
            </IconButton>
          </InputAdornment>}
        onChange={(event) => onTelNumberChangeHandler(event)}/>
        {
        telNumberPatternCheck === null ? (<></>) :
        !telNumberPatternCheck ? (<FormHelperText sx={{ color: 'red' }}>휴대전화번호 형식이 맞지 않습니다.</FormHelperText>) :
        telNumberValidate === null ? (<FormHelperText sx={{ color:'orange' }}>휴대전화번호 중복체크를 해주세요.</FormHelperText>) : 
        telNumberValidate ? (<FormHelperText sx={{ color: 'red' }}>중복된 휴대전화번호입니다.</FormHelperText>) : 
                            (<FormHelperText sx={{ color: 'green' }}>사용 가능한 휴대전화번호입니다.</FormHelperText>)
        }
      </FormControl>
    </Box>
  );
}

function SecondPage() {
  const { interestedFestival, setInterestedFestival } = useSignUpStore();
  const [ signUpCheckboxList, setSignUpCheckboxList ] = useState<GetFestivalTypeListResponseDto[]>([]);
  
  const onSignUpCheckboxList = () => {
    axios.get(GET_FESTIVAL_TYPE_CHECKBOX_LIST_URL)
        .then((response) => onSignUpCheckboxListResponse(response))
        .catch((error) => onSignUpCheckboxListError(error))
  } 

  const onSignUpCheckboxListResponse = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetFestivalTypeListResponseDto[]>
    
    if(!result || data === null ) return;
    setSignUpCheckboxList(data);
  }
  const onSignUpCheckboxListError = (error: any) => {
    alert(error.message);
  }

  useEffect(() => {
    onSignUpCheckboxList();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box>
        <Typography sx={{ mt: "40px" }}>회원님이 관심있는 축제</Typography>
      </Box>
      {signUpCheckboxList.map((festivalCheckboxList) => (
        <SignUpCheckboxListItem
          festivalCheckboxList={festivalCheckboxList as Festival}
        />
      ))}
    </Box>
  );
}

export default function SignUpView() {
  const { userId, password, passwordCheck, nickname, telNumber, profileUrl, interestedFestival, setInterestedFestival } = useSignUpStore();
  const { userIdPatternCheck, passwordPatternCheck, nicknamePatternCheck, telNumberPatternCheck } = useSignUpStore();
  const { userIdValidate, passwordValidate, nicknameValidate, telNumberValidate } = useSignUpStore();
  const {setSignUpError} = useSignUpStore();

  const [page, setPage] = useState<number>(1);
  const navigator = useNavigate();

    //          Event Handler          //
  const onNextPageButtonHandler = () => {
    if (!userId || !password || !passwordCheck || !nickname || !telNumber ) {
      setSignUpError(true);
      return;
    }

    if (!userIdPatternCheck || !passwordPatternCheck || !nicknamePatternCheck || !telNumberPatternCheck ) return;

    if (userIdValidate || !passwordValidate || nicknameValidate || telNumberValidate) return;
    setSignUpError(false);
    setPage(2);
  }

  const onSignUpHandler = () => {
    const data: SignUpRequestDto = { userId, password, nickname, profileUrl, telNumber, interestedFestival};
    axios.post(SIGN_UP_URL, data)
        .then((response) => signUpResponseHandler(response))
        .catch((error) => signUpErrorHandler(error))
  }

  //          Response Handler          //
  const signUpResponseHandler = (response: AxiosResponse<any, any>) => {
    if (!userId || !password || !passwordCheck || !nickname || !telNumber){
      setSignUpError(true);
      setPage(1);
      return;
    }

    if (!userIdPatternCheck || !passwordPatternCheck || !nicknamePatternCheck || !telNumberPatternCheck) {
      setPage(1);
      return;
    }

    if(userIdValidate || !passwordValidate || nicknameValidate || telNumberValidate) {
      setPage(1);
      return;
    }

    const { result, message, data } = response.data as ResponseDto<SignUpResponseDto>;
    if (result) navigator('/auth/sign-in');
    else alert(message);
  }
  //          Error Handler          //
  const signUpErrorHandler = (error: any) => {
    alert(error.message);
  }
  return (
    <Box sx={{ padding: "85px 250px" }}>
      <Box sx={{ width:'100%', height:'700px', display:'flex', justifyContent:'center' }}>
        <Box
          sx={{
            width: "50vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" fontWeight={900}>
                회원가입
              </Typography>
            </Box>
            {page === 1 ? <FirstPage /> : <SecondPage />}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            {page === 1 && <Button sx={{ color:'#222' }} onClick={() => onNextPageButtonHandler()}>다음</Button>}
            {page === 2 && (
              <Box>
                <Button sx={{ color:'#222' }} onClick={() => setPage(1)}>이전</Button>
                <Button sx={{ color:'#222' }} onClick={() => onSignUpHandler()}>회원가입</Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}