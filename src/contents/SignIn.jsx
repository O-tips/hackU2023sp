import logo from '../logo.svg';
import '../App.css';
import React , { useState, useEffect }from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";
import { UserContextProvider, useUserContext } from "../UserContext.tsx";
import { react } from '@babel/types';


function SignIn() {  
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

  const url = "https://wordbookapi.herokuapp.com/users/signin";

 const Submit=async()=>{
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
      setuserID(responseBody.json());
      console.log(responseBody.json());
    })

    // const userID=await response.json()
    
    // setuserID(response.json());
    // console.log(response.json());
    response.body?.cancel();
}

  const handleSubmit=(e)=>{
      e.preventDefault()
      Submit()
      if(userID >= 0){
        navigate('/')
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
          helperText="メールアドレスを入力してください"
          value={mail}
          onBlur={handleBlur}
          onChange={(e) => setMail(e.target.value)}
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
          onChange={(e) => setMail(e.target.value)}
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
          helperText="パスワードを入力してください"
          value={password}
          onBlur={handleBlurPassword}
          onChange={(e) => setPassword(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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
        //   navigate('/');
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