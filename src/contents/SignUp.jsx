import logo from '../logo.svg';
import '../App.css';
import React , { useState, useEffect, useContext}from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";
import { UserContextProvider, useUserContext } from "../UserContext.tsx";
import { UserContext } from './context';

function SignUp() {
  const [user2, setUser2] = useContext(UserContext);

  const [data, setData] = React.useState();
  const [mail, setMail] = React.useState("");
  const [name, setName] = React.useState("");
  const [userID, setUserID] = React.useState();
  const [password, setPassword] = React.useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const [aaa, setaaa]=useState();
  const inputProps = {
    step: 300,
  };  

  const url = "http://localhost:8000/users/signup";
  // const url ="https://wordbookapi.herokuapp.com/users/signup"

  // useEffect(() => {
  //   console.log(mail)
  // },[mail]);

//   const Submit = () => {
//   // const Submit=async()=>{
//     // console.log(typeof JSON.stringify({mail}))
//     // console.log(typeof JSON.stringify({password}))
  
//     // const data = {
//     //     "mail": JSON.stringify({mail}),
//     //     "password": JSON.stringify({password})
//     // }
//     // const response =await fetch(url, {
//     // method: 'POST', 
//     // headers: {
//     //   'Content-Type': 'application/json',
//     // },
//     // body: JSON.stringify(data),
//     // })
//     // const userID=await response.json["user_id"]
//     // console.log(userID)
//     // return userID

//     let user_id = -1

//     let data = {"mail":mail,"password":password}
//     fetch(url, {
//       method: 'POST', 
//       headers:  new Headers({ 
//         'Content-Type': 'application/json',
//       }),
//       body: JSON.stringify(data),
//     }).then(res =>{
//       // console.log(res)
//       // console.log(res["url"])
//       return res.json()
//     }).then(data => {
//       console.log(data)
//       user_id = data["user_id"]
//     }).catch(
//       error =>{
//         console.log("サインアップできませんでした")
//       }
//     )
//     console.log(user_id)

//     return user_id
    
// }

  const handleSubmit=(e)=>{
      e.preventDefault()
      
      if (!name) {
        alert("ユーザー名を入力してください");
      }
      if(!mail){
        alert("メールアドレスを入力してください");
      }     
      if(!password){
        alert("パスワードを入力してください");
      }
      if(!name||!name||!password){
        return;
      }

      // api投げる
      // let user_id = Submit()

      let user_id = -1

      let data = {"mail":mail,"password":password}
      fetch(url, {
        method: 'POST', 
        headers:  new Headers({ 
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
      }).then(res =>{
        // console.log(res)
        // console.log(res["url"])
        return res.json()
      }).then(data => {
        console.log(data)
        user_id = data["user_id"]
        console.log(user_id)
        if(user_id>0){
          let new_user = {"user_id":user_id,"user_name":name,"user_mail":mail,"user_level":1}
          setUser2(new_user)
          navigate('/Home')
        }else{
          alert("サインアップできませんでした")
        }
      }).catch(
        error =>{
          console.log("サインアップできませんでした　時間空いてもう一回")
          alert("サインアップできませんでした　時間を置いてからもう一度試してみてください")
        }
      )


  }

const [touchedName, setTouchedName] = useState(false);
const handleBlurName = () => {
  setTouchedName(true);
};

const renderNameInput = () => {
  if (touchedName && name.trim() === "") {
    return (
      <TextField
        error
        id="outlined-error-helper-text"
        label="ユーザー名"
        helperText="ユーザー名を入力してください"
        value={name}
        onBlur={handleBlurName}
        onChange={(event) => setName(event.target.value)}
      />
    );
  } else {
    return (
      <TextField
        id="outlined-basic"
        label="ユーザー名"
        variant="outlined"
        value={name}
        onBlur={handleBlurName}
        onChange={(event) => setName(event.target.value)}
      />
    );
  }
};

const [touched, setTouched] = useState(false);
const handleBlur = () => {
  setTouched(true);
};

const renderMailInput = () => {
  if (touched && mail.trim() === "") {
    return (
      <TextField
        error id="outlined-error-helper-text"
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
      <h1>新規登録</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
      
        {renderNameInput()}
        {renderMailInput()}
              {/* <TextField id="outlined-basic" label="メールアドレス" variant="outlined"  inputProps={inputProps}/> */}
        {renderPasswordInput()}
        <Button 
        variant="contained"
        onClick={handleSubmit}
        component={Link} to="/"
        >新規登録</Button>
      </Stack>
    </Box>
    </Grid>
    
    </>
    );
}

export default SignUp;