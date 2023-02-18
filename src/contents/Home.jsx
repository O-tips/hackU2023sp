import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import '../Home.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';


import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function Home() {
    /*
    const uploadFile=()=> {
        
        let formData = new FormData(); 
        formData.append("file", fileupload.files[0]);
        network request using POST method of fetch
        fetch('FASTAPIのURLをはる', {
            method: "POST", 
            body: formData
        }); 
        alert('You have successfully upload the file!');
    }*/

    return (
        <><div className='Fileupload'>
            <p>New File</p>
            <Button variant="outlined">ファイルを選択</Button>
            {/* <button 
            //input hidden
            type="file"
            >
            ファイルを選択
            </button> */}
            <Button variant="contained">開く</Button>
            {/* <button
            background-color="#579C9"
            >
            開く
            </button> */}
        </div>
        <div className='PaperList'>
            <div class="padding5"></div>
            <Button class="border">
	        <p class="left">00/00 論文１</p>
            </Button>
            <ArticleIcon color="primary"/>
            <DeleteIcon color="primary"/>
            <div class="padding5"></div>
            <Button class="border">
	        <p class="left">01/00 論文２</p>
            </Button>
            <ArticleIcon color="primary"/>
	        <DeleteIcon color="primary"/>
            
            

        </div>
        </>       
    );
}
export default Home;
