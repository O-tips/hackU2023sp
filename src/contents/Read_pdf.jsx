import logo from '../logo.svg'
import '../App.css';
import '../Read_pdf.css'
import React from 'react';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import { Button } from '@mui/material';


  
function Read_pdf() {
    return (
        <>
       {/* 例としてお茶大紹介を掲載 */}
       <iframe src="https://www.ocha.ac.jp/plaza/info/d002661_d/fil/ochadai_guide_2023.pdf" className='image'></iframe >
        </>
      );
}

export default Read_pdf;