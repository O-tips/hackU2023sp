import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";



function SignIn() {  

    return (
      <>
      <h1>ログイン</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
        <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
        <TextField id="outlined-basic" label="パスワード" variant="outlined" />
        <Button variant="contained">ログイン</Button>
        <Button color="inherit" variant="outlined" component={Link} to="/SignUp">初めての方はこちらから</Button>
      </Stack>
    </Box>
    </Grid>
      </>
);
}
export default SignIn;