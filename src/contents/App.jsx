import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import Home from './Home';
import AddRecipes from './AddRecipes';
import Recipe from './Recipe';
import SignIn from './SignIn';
import SignUp from './SignUp';


import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecipes" element={<AddRecipes />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
