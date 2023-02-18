import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function SignIn() {  

    return (
    <> 

  <h1>新規登録</h1>
  <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
  <TextField id="outlined-basic" label="パスワード" variant="outlined" />
  <Button variant="contained">新規登録</Button>

  </>
);
}
export default SignIn;