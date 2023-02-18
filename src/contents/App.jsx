import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import Home from './Home';
import AddRecipes from './AddRecipes';
import Recipe from './Read_pdf';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Background from '../assets/background.jpg';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import Initial_display from './Initial_display';
import Read_pdf from './Read_pdf';
import Word_dic from './Word_dic';

function App() {


  return (
    <div className="App">
      <Header/>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecipes" element={<AddRecipes />} />
        <Route path="/Read_pdf" element={<Read_pdf />} />
        <Route path="/Word_dic" element={<Word_dic />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Initial_display" element={<Initial_display />} />
      </Routes>
    </div>
  );
}

export default App;
