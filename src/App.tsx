import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from "./views/NavigationBar";
import MainHead from "./views/Main/MainHead";
import Footer from "./views/Footer";
import MainContent from "./views/Main/MainContent";

function App() {
  return (
    <>
      <NavigationBar />
      <MainHead />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
