import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SignUpCheckboxListItem from "src/components/SignUpCheckboxListItem";
import { IPreviewFestivalItem } from "src/interfaces";
import { usePagingHook } from "src/hooks";
import { SIGN_UP_CHECKBOX_LIST } from "src/mock";
import { useNavigate } from "react-router-dom";
import { useSignUpStore } from "src/stores";

function FirstPage() {

  //          Hook          //
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
  const { userId, password, passwordCheck, nickname, telNumber } = useSignUpStore();
  const { setUserId, setPassword, setPasswordCheck, setNickname, setTelNumber } = useSignUpStore();

  const idValidator = /^[A-Za-z0-9]{8,25}$/;
  const passwordValidator = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!?_]).{8,20}$/;

  //          Event Handler          //
  const onIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const isMatched = idValidator.test(value);
    if (!isMatched) {
      console.log(value);
    }
    setUserId(value);
  }

  const onPasswordChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = passwordValidator.test(value);
    if (!isMatched) {
      console.log(value);
    }
    setPassword(value);
  }

  onNicknameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
  }




  return (
    <Box>
      <FormControl sx={{ mt: "40px" }} fullWidth variant="standard">
        <InputLabel>아이디*</InputLabel>
        <Input type="text" value={userId} onChange={(event) => onIdChangeHandler(event)} />
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
          fullWidth
          variant="standard"
        >
          <InputLabel>닉네임*</InputLabel>
          <Input type="text" value={nickname} onChange={(event) => onNicknameChangeHandler(event)}/>
        </FormControl>
        <Avatar sx={{ width: "80px", height: "80px", cursor: "pointer" }} />
      </Box>
      <FormControl sx={{ mt: "40px" }} fullWidth variant="standard">
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
      </FormControl>
      <FormControl sx={{ mt: "40px" }} fullWidth variant="standard">
        <InputLabel>비밀번호 확인*</InputLabel>
        <Input
          type={showPasswordCheck ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
              >
                {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl
        sx={{ mt: "40px", justifyContent: "center" }}
        fullWidth
        variant="standard"
      >
        <InputLabel>휴대전화번호*</InputLabel>
        <Input type="text" />
      </FormControl>
    </Box>
  );
}

function SecondPage() {
  const { festivalList, viewList, pageNumber, onPageHandler, COUNT, setFestivalList} = usePagingHook(100);

  useEffect(() => {
    setFestivalList(SIGN_UP_CHECKBOX_LIST);
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box>
        <Typography sx={{ mt: "40px" }}>회원님이 관심있는 축제</Typography>
      </Box>
      {viewList.map((festivalCheckboxList) => (
        <SignUpCheckboxListItem
          festivalCheckboxList={festivalCheckboxList as IPreviewFestivalItem}
        />
      ))}
    </Box>
  );
}

export default function SignUpView() {
  const [page, setPage] = useState<number>(1);
  const navigator = useNavigate();

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
            {page === 1 && <Button sx={{ color:'#222' }} onClick={() => setPage(2)}>다음</Button>}
            {page === 2 && (
              <Box>
                <Button sx={{ color:'#222' }} onClick={() => setPage(1)}>이전</Button>
                <Button sx={{ color:'#222' }} onClick={() => navigator('/auth/sign-in')}>회원가입</Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
