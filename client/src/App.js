import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Axios from 'axios';
import Home from "./pages/Home";
import AddBid from "./pages/AddBid";
import BidInfo from "./pages/BidInfo";
import NoPage from "./pages/NoPage";
import "./index";
import logo from "./images/PPC_logo_red.png";

function App() {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/");
    setData(response.data);
  }

  useEffect(() => {
    getData(); 
  }, []);

  return (
    <BrowserRouter>
        <div className='nav-container'>
            <Link to='/'><img className='Logo' src={logo} alt='PPC Logo'/></Link> 
            <h3 className='heading-3 nav-text'>House Property Auction</h3>
        </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/newbid/:id/:token" element={<AddBid />} />
        <Route path="/bid/:id/:token" element={<BidInfo />} /> 
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <div className='footer-container'>
        <p>© PPC Zimbabwe 2024</p>
      </div>
    </BrowserRouter>
  )
}

export default App;
