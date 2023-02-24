import logo from '../logo.svg';
import '../App.css';
import '../InitialDisplay.css';
import React, { useContext } from 'react';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import {UserContext} from './context';
import Home from './Home';
const InitialDisplay=()=>{

  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate()
  console.log(user)
  if(user["user_id"]<=0){
    return (
    <>
    <div className='display'>
    <div className="container">
      <Button 
      component={Link} 
      to="/SignUp"
      variant="contained"
      className="button">新規登録</Button>
    
      <Button
      component={Link} 
      to="/SignIn"
      variant="contained"
      className="button">ログイン</Button>
    </div>
    </div>
    </>);
  }else{
    let user_id = user["user_id"]

    return <Home />;
  }
}
export default InitialDisplay;