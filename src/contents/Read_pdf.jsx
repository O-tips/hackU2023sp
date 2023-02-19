import logo from '../logo.svg';
import '../App.css';
import React from 'react';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import { Button } from '@mui/material';

function Read_pdf() {
    return (<>
    Read_pdf

    <Button variant="contained">PDFを追加</Button>
    
    </>);
}

export default Read_pdf;