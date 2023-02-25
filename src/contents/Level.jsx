import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { UserContextProvider, useUserContext } from "../UserContext.tsx";
import '../Level.css'
import {Link} from "react-router-dom";
import { Button,Grid } from '@mui/material';

import { UserContext } from './context';

function Level() {
    const [value, setValue] = React.useState(1);
    // const { user, setUser } = useUserContext();

    const [user, setUser] = React.useContext(UserContext)

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const updateLevel=(newlevel, user)=>{

      // api投げる
      // let user_id = Submit()


      let user_id = -1



      let data = {"user_id":user["user_id"],"name":user["user_name"],"level":parseInt(newlevel)}
      console.log(data)
      fetch("http://localhost:8000.herokuapp.com/users/settings/", {
        method: 'PUT', 
        headers:  new Headers({ 
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
      }).then(res =>{
        console.log(res)
        // console.log(res["url"])
        // return res.json()
      // }).then(data => {
      //   console.log(data)
      }).catch(
        error =>{
          console.log("サインアップできませんでした　時間空いてもう一回")
          alert("サインアップできませんでした　時間を置いてからもう一度試してみてください")
        }
      )


  }

    

    const decideLevel = (event) => {
      // user.level = value
      // console.log(event.value)
      let newUser = {"user_id":user["user_id"],"user_name":user["user_name"],"user_mail":user["user_mail"],"user_level":value}
      setUser(newUser)
      updateLevel(value,newUser)
    }

    // const displayLevel = (event) => {
    //   return value
    // }
  
    return (
    <Grid container direction="column" alignItems="center">
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"
        className='padding3'>レベルを選択してください</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {/* <FormControlLabel value="level1" control={<Radio />} label="レベル1" />
          <FormControlLabel value="level2" control={<Radio />} label="レベル2" />
          <FormControlLabel value="level3" control={<Radio />} label="レベル3" />
          <FormControlLabel value="level4" control={<Radio />} label="レベル4" />
          <FormControlLabel value="level5" control={<Radio />} label="レベル5" />
          <FormControlLabel value="level6" control={<Radio />} label="レベル6" />
          <FormControlLabel value="level7" control={<Radio />} label="レベル7" /> */}
          
          <FormControlLabel value={1} control={<Radio />} label={"レベル1"} />
          <FormControlLabel value={2} control={<Radio />} label={"レベル2"} />
          <FormControlLabel value={3} control={<Radio />} label={"レベル3"} />
          <FormControlLabel value={4} control={<Radio />} label={"レベル4"} />
          <FormControlLabel value={5} control={<Radio />} label={"レベル5"} />
          <FormControlLabel value={6} control={<Radio />} label={"レベル6"} />
          <FormControlLabel value={7} control={<Radio />} label={"レベル7"} />
          
          <Button 
          variant="outlined"
          onClick={decideLevel}
          component={Link} to="/"
          >決定</Button>

          {/* <p>あなたが現在選択しているレベルは{displayLevel()}です</p> */}
        </RadioGroup>
      </FormControl>
    </Grid>
    );
}

export default Level;