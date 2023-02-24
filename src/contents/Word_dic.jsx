import logo from '../logo.svg';
import '../App.css';
import "../Word_dic.css";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box,Grid } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { WordContextProvider, useWordContext } from "../WordContext.tsx";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';
import { useState, useEffect }from 'react';

const tmp_words = new Array()
interface wordtype {
  id: number;
  word: string;
  meaning: string;
}

function Word(props) {
  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.word}</Typography>
      </AccordionSummary>
      <AccordionDetails class="details">
        <Typography class="meaning">
        {props.meaning}
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
        </Typography>
        < IconButton>
          <CheckIcon 
          style={{ color: '#00e676' }}
          />
        </ IconButton>
        < IconButton>
          <ClearIcon 
          style={{ color: 'red' }}
          />
        </ IconButton>
      </AccordionDetails>
    </Accordion>

  )
}

function Word_dic() {
  const { word, setWord } = useWordContext();
  const [ allWords,setAllWords] = React.useState();
  var array = word.words;
  // const url = "https://wordbookapi.herokuapp.com/"
  const url = "http://0.0.0.0:8000/";


  async function getDict(id) {
    try {
        let tmp_url = url + "theses/view/dict?thesis_id=" + id
        console.log(tmp_url)
        const response = await fetch(tmp_url, {
            method: 'GET', 
        })
        return response.json().then(function (value) {
          console.log(value[0])
          setAllWords(value)
        })
    } catch (error) {
        console.error(error);
    }
  }

  async function extractWord(user_level) {
    let l = allWords.length

    for (let i = 0; i < l; i++) {
      if(allWords[i]["word_level"] >= user_level){
        const tmp : wordtype = await {
          "id" : allWords[i]["word_id"],
          "word" : allWords[i]["word"],
          "meaning" : allWords[i]["word_mean"]
        }
        tmp_words.push(tmp)
      }
    }
    return tmp_words
  }

  useEffect(() => {
    (async() => {
      await getDict(14)
      await console.log(allWords[0])
      word.words = await extractWord(1)
    })()
  }, []);

  return (<>
  <p>
    Word_dic
  </p>
  <p>
    {word.thesis_name}
  </p>

    <div>
    <Grid container direction="column" alignItems="center">
    <Box sx={{ width: '70%' }}>
      {array.map((val) => 
          <Word word={val["word"]} meaning={val["meaning"]} id={val["id"]}/>
      )}      
      </Box>
      </Grid>
      
    </div>
    
    
  </>);
}
export default Word_dic;