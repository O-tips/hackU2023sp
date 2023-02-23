import logo from '../logo.svg';
import '../App.css';
import React , { useState, useEffect }from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";


function SignIn() {  
  const [data, setData] = React.useState();
  const [mail, setMail] = React.useState();
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [count, setCount] = useState(0);

  const inputProps = {
    step: 300,
  };  

  const url = "https://wordbookapi.herokuapp.com/users/signin";

 const Submit=async()=>{
    console.log(typeof JSON.stringify({mail}))
    console.log(typeof JSON.stringify({password}))
  
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
    const userID=await response.json()
    console.log(userID)
}

  const handleSubmit=(e)=>{
      e.preventDefault()
      Submit()
  }

    return (
      <>
      <h1>ログイン</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
        {/* <TextField id="outlined-basic" label="ユーザー名" variant="outlined" value={name} onChange={(event) => setName(event.target.value)}/> */}
        <TextField id="outlined-basic" label="メールアドレス" variant="outlined"  value={mail} onChange={(event) => setMail(event.target.value)}/>
        <TextField id="outlined-basic" label="パスワード" variant="outlined"  value={password} onChange={(event) => setPassword(event.target.value)}/>
        <Button 
        variant="contained"
        onClick={handleSubmit}
        >ログイン</Button>
      </Stack>
    </Box>
    </Grid>
    
    </>
);
}
export default SignIn;