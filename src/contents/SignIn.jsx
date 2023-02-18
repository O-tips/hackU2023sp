import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function SignIn() {  
    
const { register, handleSubmit } = useForm();
const onSubmit = (data) => console.log(data);
    return (
    <> 
    <div className="App">
    <h1>ログイン</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" {...register('password')} type="password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </div>
  </>
);
}
export default SignIn;