import React from 'react';
import './App.css';

import { Route, Routes, useLocation } from 'react-router-dom';

import NavigationBar from "./views/NavigationBar";
import Footer from "./views/Footer";
import Main from './views/Main'
import AuthenticationView from './views/AuthenticationView'

function App() {

  const path = useLocation();

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={(<Main />)} />
        <Route path="/auth" element={(<AuthenticationView />)} />
      </Routes>
      {path.pathname !== "/auth" && <Footer />}
    </>
  );
}

export default App;
