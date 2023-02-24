import logo from '../logo.svg';
import '../App.css';
import React , { useState, useEffect ,useContext}from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";
import { UserContextProvider, useUserContext } from "../UserContext.tsx";
import { react } from '@babel/types';

import { UserContext } from './context';


const SignIn=()=>{  
  // Undefinedになることを防ぐため、数字なら0、文字列なら空の文字列を初期値として代入
  const [data, setData] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [count, setCount] = useState(0);
  const [userID, setuserID] = useState(0);
  const navigate = useNavigate()
  const { user, setUser } = useUserContext();

  
  React.useState();
  const inputProps = {
    step: 300,
  };  

  const url = "http://localhost:8000/users/signin";

 const Submit=async()=>{
    let user_id = -1;
    const data = {
        "mail": JSON.stringify({mail}),
        "password": JSON.stringify({password})
    }
    const response =await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json()) // コピーを作成
    .then(responsedata => {
      const responseBody = responsedata;
      let user_id = responseBody.json()
      setuserID(user_id);
      console.log(responseBody.json());
    }).catch(error => {
      console.log("サインインできませんでした");
      console.error("サインインできませんでした");
    })
    return user_id;
}

  const handleSubmit=(e)=>{
      e.preventDefault()
      let user_id = Submit()
      if(user_id > 0){
        let new_user = {"user_id":user_id,"user_name":name,"user_mail":mail,"user_level":1}
        navigate('/Home')
      }else{
        
      }
  }

  
  const [touched, setTouched] = useState(false);
  const handleBlur = () => {
    setTouched(true);
  };
  
  const renderMailInput = () => {
    if (touched && mail.trim() === "") {
      return (
        <TextField
          error
          id="outlined-error-helper-text"
          label="メールアドレス"
          helperText="メールアドレスを入力してください."
          value={mail}
          onBlur={handleBlur}
          onChange={(event) => setMail(event.target.value)}
        />
      );
    } else {
      return (
        <TextField
          id="outlined-basic"
          label="メールアドレス"
          variant="outlined"
          value={mail}
          onBlur={handleBlur}
          onChange={(event) => setMail(event.target.value)}
        />
      );
    }
  };
  const [touchedPassword, setTouchedPassword] = useState(false);
  const handleBlurPassword = () => {
    setTouchedPassword(true);
  };

  const renderPasswordInput = () => {
    if (touchedPassword && password.trim() === "") {
      return (
        <TextField
          error
          id="outlined-error-helper-text"
          label="パスワード"
          helperText="パスワードを入力してください."
          value={password}
          onBlur={handleBlurPassword}
          onChange={(event) => setPassword(event.target.value)}
        />
      );
    } else {
      return (
        <TextField
          id="outlined-basic"
          label="パスワード"
          variant="outlined"
          value={password}
          onBlur={handleBlurPassword}
          onChange={(event) => setPassword(event.target.value)}
        />
      );
    }
  };

    return (
      <>
      <h1>ログイン</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
        {/* <TextField id="outlined-basic" label="ユーザー名" variant="outlined" value={name} onChange={(event) => setName(event.target.value)}/> */}
        {renderMailInput()}
              {/* <TextField id="outlined-basic" label="メールアドレス" variant="outlined"  inputProps={inputProps}/> */}
        {renderPasswordInput()}
        <Button 
        variant="contained"
        // onClick = {() => {
        //   {this.handleSubmit};
        //   navigate('/Home');
        // }}
        onClick={handleSubmit}
        >ログイン</Button>
        <Button variant='outlined' component={Link} to="/SignUp">初めての方はこちらから</Button>
      </Stack>
    </Box>
    </Grid>
    
    </>
);
}
export default SignIn;