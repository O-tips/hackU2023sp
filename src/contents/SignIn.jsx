import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button,Grid,Box,TextField,Stack } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";


function SignIn() {  
  const [mail, setMail] = React.useState();
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [count, setCount] = useState(0);

  const inputProps = {
    step: 300,
  };  
  const url = "https://wordbookapi.herokuapp.com/users/signin";

	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};
    return (
      <>
      <h1>ログイン</h1>
      		<div>
			<div>ここに処理を書いていきます</div>
			{data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
		</div>
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