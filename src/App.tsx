import React from 'react';
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
import { useSignInStore } from './stores';

function App() {

  const path = useLocation();
  const {signInUser}=useSignInStore();

  console.log("로그인"+signInUser)
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={(<Main />)} />
        <Route path="/auth" element={(<AuthenticationView />)} />
        <Route path="/mypage" element={(<MypageView/>)}/>
        <Route path = "/reviewboard">
          <Route path = 'write' element = {(<ReviewBoardWriteView/>)}/>
          <Route path = 'detail/:boardNumber' element = {(<ReviewBoardDetailView/>)}/>
          <Route path = 'update/:boardNumber' element = {(<ReviewBoardUpdateView/>)}/>
        </Route>
      </Routes>
      {path.pathname !== "/auth" && <Footer />}
    </>
  );
}

export default App;
