import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Contact from "./Components/Contact";
import Product from "./Components/Product";
import Signin from "./Components/Signin";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";

function App() {

  return <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" component={Home} element={<Home/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route  path="/product/:id" component={Product} element={<Product/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/signin" element={<Signin/>} />
      </Routes>

      <div className='footer'>EA Sports</div>
    </div>
  </Router>
}

export default App;
