import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import NavigationBar from "./views/NavigationBar";
import Footer from "./views/Footer";
import Main from './views/Main'
import AuthenticationView from './views/AuthenticationView'
import ReviewBoardWriteView from './views/ReviewBoard/ReviewBoardWriteView';
import ReviewBoardDetailView from './views/ReviewBoard/ReviewBoardDetailView';
import ReviewBoardUpdateView from './views/ReviewBoard/ReviewBoardUpdateView';
import MypageView from './views/MypageView';
import ReviewBoardListView from './views/ReviewBoard/ReviewBoardListView';
import SignUpView from './views/AuthenticationView/SignUpView';
import FreeBoardWriteView from './views/Main/FreeBoard/FreeBoardWriteView';
import FreeBoardDetailView from './views/Main/FreeBoard/FreeBoardDetailView';
import FreeBoardUpdateView from './views/Main/FreeBoard/FreeBoardUpdateView';
import FreeBoardListView from './views/Main/FreeBoard/FreeBoardListView';
import { useSignInStore } from './stores';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import { GET_USER_URL, authorizationHeader } from './constants/api';
import ResponseDto from './apis/response';
import { GetUserResponseDto } from './apis/response/user';

function App() {

  const { signInUser }=useSignInStore();
  const path = useLocation();
  const { setSignInUser } = useSignInStore();
  const [ cookies ] = useCookies();

  const getUser = (accessToken : string) => {
    axios.get(GET_USER_URL, authorizationHeader(accessToken))
    .then((response) => getUserResponseHandler(response))
    .catch((error) => getUserErrorHandler(error))
  }

  const getUserResponseHandler = (response : AxiosResponse<any, any>) => {
    const { result, message, data} = response.data as ResponseDto<any>;

    if(!result || !data) return;

    const user = data as GetUserResponseDto;
    setSignInUser(user);
  }

  const getUserErrorHandler = (error : any) => console.log(error.message);

  useEffect( () => {
    const accessToken = cookies.accessToken;
    if(accessToken) getUser(accessToken);
  }, [path])



  return (
    <>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={(<Main />)} />
        <Route path="/auth" element={(<AuthenticationView />)} />
        <Route path="/mypage" element={(<MypageView />)}/>
        <Route path="/auth">
          <Route path="sign-in" element={(<AuthenticationView />)}/>
          <Route path="sign-up" element={(<SignUpView />)}/>
        </Route>
        <Route path = "/reviewboard">
          <Route path = 'write' element = {(<ReviewBoardWriteView/>)}/>
          <Route path = 'detail/:reviewBoardNumber' element = {(<ReviewBoardDetailView/>)}/>
          <Route path = 'update/:reviewBoardNumber' element = {(<ReviewBoardUpdateView/>)}/>
          <Route path = 'list' element = {(<ReviewBoardListView/>)}/>
        </Route>
        <Route path = "/freeboard">
          <Route path = 'write' element = {(<FreeBoardWriteView/>)}/> 
          <Route path = 'detail/:freeBoardNumber' element = {(<FreeBoardDetailView/>)}/> 
          <Route path = 'update/:freeBoardNumber' element = {(<FreeBoardUpdateView/>)}/> 
          <Route path = 'list' element = {(<FreeBoardListView/>)}/> 
        </Route>
      </Routes>
      {path.pathname !== "/auth/sign-in" && path.pathname !== "/auth/sign-up" && <Footer />}
    </>
  );
}

export default App;
