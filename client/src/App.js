import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddBid from "./pages/AddBid";
import BidInfo from "./pages/BidInfo";
import NoPage from "./pages/NoPage";
import "./index";
import Layout from './tabs/layout';
import Dashboard from './tabs/dashboard';
import Employees from './tabs/employees';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#d42f13",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      main: "#16161d",
    }
  },
  typography: {
    fontFamily: "Montserrat, Source Sans 3, Helvetica Neue, sans-serif",
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/newbid/:id/:token" element={<AddBid />} />
          <Route path="/bid/:id/:token" element={<BidInfo />} /> 
          <Route path="/*" element={<NoPage />} />
          {/* <Route path="/admin" element={<Admin />} />  */}
          <Route element={<Layout />}>
            <Route path='/admin' element={<Navigate to="/admin/dashboard" replace />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/employees' element={<Employees />} />
          </Route>
        </Routes>
        <div className='footer-container'>
          <p>© PPC Zimbabwe 2024</p>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
