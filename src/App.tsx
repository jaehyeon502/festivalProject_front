import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import NavigationBar from "./views/NavigationBar";
import Footer from "./views/Footer";
import Main from './views/Main'
import AuthenticationView from './views/AuthenticationView'
import ReviewBoardWriteView from './views/ReviewBoard/ReviewBoardWriteView';
import ReviewBoardDetailView from './views/ReviewBoard/ReviewBoardDetailView';
import ReviewBoardUpdateView from './views/ReviewBoard/ReviewBoardUpdateView';
import MypageView from './views/MyPageView';
import ReviewBoardListView from './views/ReviewBoard/ReviewBoardListView';
import SignUpView from './views/AuthenticationView/SignUpView';
import FreeBoardWriteView from './views/FreeBoard/FreeBoardWriteView';
import FreeBoardDetailView from './views/FreeBoard/FreeBoardDetailView';
import FreeBoardUpdateView from './views/FreeBoard/FreeBoardUpdateView';
import FreeBoardListView from './views/FreeBoard/FreeBoardListView';
import { useSignInStore } from './stores';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import { GET_USER_URL, authorizationHeader } from './constants/api';
import ResponseDto from './apis/response';
import { GetUserResponseDto } from './apis/response/user';

function App() {

  //          Hook            //
  const path = useLocation();
  const { setSignInUser } = useSignInStore();
  const [cookies] = useCookies();

  //          Event Handler            //
  const getUser = (accessToken: string) => {
    axios.get(GET_USER_URL, authorizationHeader(accessToken))
      .then((response) => getUserResponseHandler(response))
      .catch((error) => getUserErrorHandler(error))
  }

  //         Response Handler             //
  const getUserResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<any>;

    if (!result || !data) return;

    const user = data as GetUserResponseDto;
    setSignInUser(user);
  }

  //          Error Handler          //
  const getUserErrorHandler = (error: any) => console.log(error.message);

  //          Use Effect          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) getUser(accessToken);
  }, [path])

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={(<Main />)} />
        <Route path="/auth" element={(<AuthenticationView />)} />
        <Route path="/mypage" element={(<MypageView />)} />
        <Route path="/auth">
          <Route path="sign-in" element={(<AuthenticationView />)} />
          <Route path="sign-up" element={(<SignUpView />)} />
        </Route>
        <Route path="/reviewboard">
          <Route path='write' element={(<ReviewBoardWriteView />)} />
          <Route path='detail/:boardNumber' element={(<ReviewBoardDetailView />)} />
          <Route path='update/:boardNumber' element={(<ReviewBoardUpdateView />)} />
          <Route path='list' element={(<ReviewBoardListView />)} />
        </Route>
        <Route path="/freeboard">
          <Route path='write' element={(<FreeBoardWriteView />)} />
          <Route path='detail/:boardNumber' element={(<FreeBoardDetailView />)} />
          <Route path='update/:boardNumber' element={(<FreeBoardUpdateView />)} />
          <Route path='list' element={(<FreeBoardListView />)} />
        </Route>
      </Routes>
      {path.pathname !== "/auth/sign-in" && path.pathname !== "/auth/sign-up" && <Footer />}
    </>
  );
}

export default App;
