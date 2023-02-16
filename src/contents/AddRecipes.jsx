import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { TextField, Typography } from '@mui/material';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function AddRecipes() {
    return (
    <>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            登録したいレシピのURLを入力してください
        </Typography>
        <TextField id="outlined-basic" label="Url" variant="standard" />
    </>);
}
export default AddRecipes;