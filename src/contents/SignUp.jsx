import logo from '../logo.svg';
import '../App.css';
import React , { useState, useEffect }from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";


function SignUp() {
<<<<<<< HEAD

=======
  const [data, setData] = React.useState();
>>>>>>> e94eeeb8a4205929acb9370061224de10526dde7
  const [mail, setMail] = React.useState();
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [count, setCount] = useState(0);
<<<<<<< HEAD
=======
  const [errorMessage, setErrorMessage] = useState('')
>>>>>>> e94eeeb8a4205929acb9370061224de10526dde7

  const inputProps = {
    step: 300,
  };  
  const url = "https://wordbookapi.herokuapp.com/users/signup";

  // useEffect(() => {
  //   console.log(mail)
  // },[mail]);

  const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
     });
	};

  const Submit=async()=>{
    let formdata = new FormData()
    // formdata.append('upload_file', image)
    console.log({mail})
    console.log({password})
    formdata.append("mail", mail)
    formdata.append("password", password)
    const requestOptions={
        method:"POST",
        body:{
          "mail" : [{mail}],
          "password" : {password}
        }
  }
  console.log(requestOptions)
  const response =await fetch(url,requestOptions)
  const data=await response.json()
}

  const handleSubmit=(e)=>{
      e.preventDefault()
      Submit()
  }

   
    return (
    <>
      <h1>新規登録</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
        <TextField id="outlined-basic" label="ユーザー名" variant="outlined" value={name} onChange={(event) => setName(event.target.value)}/>
        {/* <TextField id="outlined-basic" label="メールアドレス" variant="outlined"  inputProps={inputProps}/> */}
        <TextField id="outlined-basic" label="メールアドレス" variant="outlined"  value={mail} onChange={(event) => setMail(event.target.value)}/>
        <TextField id="outlined-basic" label="パスワード" variant="outlined"  value={password} onChange={(event) => setPassword(event.target.value)}/>
        <div>ここに処理を書いていきます</div>
        <p>{mail}</p>
        <p>{name}</p>
        <p>{password}</p>
        {/* {data ? <div>{data.Hello}</div> :  */}
        <Button 
        variant="contained"
        onClick={handleSubmit}
        >新規登録</Button>
      </Stack>
    </Box>
    </Grid>
    
    </>
    );
}

export default SignUp;