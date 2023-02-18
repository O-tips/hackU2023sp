import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
  
function SignUp() {

    return (
        <> 
        <h1>ログイン</h1>
        <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
        <TextField id="outlined-basic" label="パスワード" variant="outlined" />
        <Button variant="contained">ログイン</Button>
        </>
 );
}

export default SignUp;