import logo from '../logo.svg';
import '../App.css';
import '../InitialDisplay.css';
import React from 'react';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function InitialDisplay() {
    return (
    <>
    <div className='display'>
    <div className="container">
      <button className="button">新規登録</button>
      <button className="button">ログイン</button>
    </div>
    </div>
    </>);
}
export default InitialDisplay;