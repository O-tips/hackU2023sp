import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [data, setData] = React.useState();
  const url = "https://wordbookapi.herokuapp.com/users/signup";

	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};
    return (
    <>
      <h1>新規登録</h1>
      <Grid container direction="column" alignItems="center">
      <Box sx={{ width: '70%' }}>
      <Stack spacing={2}>
        <TextField id="outlined-basic" label="ユーザー名" variant="outlined" />
        <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
        <TextField id="outlined-basic" label="パスワード" variant="outlined" />
        <div>ここに処理を書いていきます</div>
        {data ? <div>{data.Hello}</div> : 
        <Button 
        variant="contained"
        onClick={GetData}
        >新規登録</Button>}
      </Stack>
    </Box>
    </Grid>
    </>
    );
}

export default SignUp;