import logo from '../logo.svg';
import '../App.css';
import React, { useState } from 'react';
import Home from './Home';
import Recipe from './Read_pdf';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './Header';
import Background from '../assets/background.jpg';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import InitialDisplay from './InitialDisplay';
import Read_pdf from './Read_pdf';
import Word_dic from './Word_dic';
import Level from './Level';
import { UserContextProvider, useUserContext } from "../UserContext.tsx";

import { UserContext, ThesisTypeContext} from './context';

function App() {

  const [user, setUser]=useState({
    "user_id":-1,
    "user_name":"default",
    "user_mail":"default",
    "user_level":-1
  });

  const [thesis, setThesis]=useState([])



  // const [thesis,setThesis] = useState("https://www.ocha.ac.jp/plaza/info/d002661_d/fil/ochadai_guide_2023.pdf");


  return (
    <div className="App">
      <UserContext.Provider value={[user,setUser]}>
      <ThesisTypeContext.Provider value={[thesis, setThesis]}>
      <Header/>      
      <Routes>
        <Route path="/" element={<InitialDisplay />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Read_pdf" element={<Read_pdf />} />
        <Route path="/Word_dic" element={<Word_dic />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />      
        <Route path="/Level" element={<Level />} />
      </Routes>
      </ThesisTypeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
