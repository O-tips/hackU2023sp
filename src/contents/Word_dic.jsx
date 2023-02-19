import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box,Grid } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function Word_dic() {
    return (<>
    Word_dic

    <div>
    <Grid container direction="column" alignItems="center">
    <Box sx={{ width: '70%' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>単語1</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ color: "#000000", backgroundColor: "#d9d9d9" }}>
          <Typography>
            ここに単語の意味を表示
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>単語2</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ color: "#000000", backgroundColor: "#d9d9d9" }}>
          <Typography>
            ここに単語の意味を表示
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
      </Grid>
      
    </div>
    
    
    </>);
}
export default Word_dic;