import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button } from '@mui/material';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function Home() {
    // const uploadFile=()=> {
        
    //     let formData = new FormData(); 
    //     formData.append("file", fileupload.files[0]);
    //         //network request using POST method of fetch
    //     fetch('FASTAPIのURLをはる', {
    //     method: "POST", 
    //     body: formData
    //     }); 
    //     alert('You have successfully upload the file!');

    // }

    return (
        <>Home</>
        // <Button input
        // hidden
        // type="file"
        // onChange={uploadFile()}>ファイルをアップロード</Button>
    );
}
export default Home;

