import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Axios from 'axios';
import Home from "./pages/Home";
import AddBid from "./pages/AddBid";
import BidInfo from "./pages/BidInfo";
import NoPage from "./pages/NoPage";

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
        <div>
            <div className='Logo'><Link to='/'>Logo Image</Link></div> 
            <h3 className='heading-3'>House Property Auction</h3>
        </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/newbid/:id/:token" element={<AddBid />} />
        <Route path="/bid/:id/:token" element={<BidInfo />} /> 
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
