import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Button,Grid } from '@mui/material';

function Level() {
    const [value, setValue] = React.useState('level1');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
    <Grid container direction="column" alignItems="center">
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">レベルを選択してください</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="level1" control={<Radio />} label="レベル1" />
          <FormControlLabel value="level2" control={<Radio />} label="レベル2" />
          <FormControlLabel value="level3" control={<Radio />} label="レベル3" />
          <Button variant="outlined">決定</Button>
        </RadioGroup>
      </FormControl>
    </Grid>
    );
}

export default Level;