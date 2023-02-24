import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { UserContextProvider, useUserContext } from "../UserContext.tsx";
import '../Level.css'
import { Button,Grid } from '@mui/material';

function Level() {
    const [value, setValue] = React.useState(0);
    const { user, setUser } = useUserContext();

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const decideLevel = (event) => {
      user.level = value
    }

    const displayLevel = (event) => {
      return value
    }
  
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
          >決定</Button>

          <p>あなたが現在選択しているレベルは{displayLevel()}です</p>
        </RadioGroup>
      </FormControl>
    </Grid>
    );
}

export default Level;