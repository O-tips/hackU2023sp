import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
  
function SignUp() {
    
    return (
    <>
      <h1>新規登録</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
        <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
        <TextField id="outlined-basic" label="パスワード" variant="outlined" />
        <Button variant="contained">新規登録</Button>
      </Stack>
    </Box>
    </Grid>
    </>
    );
}

export default SignUp;