import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from "../tabs/layout";
import Dashboard from "../tabs/dashboard";

const Admin = () => {
  return (
    <div>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path='/admin/dashboard' element={<Dashboard />} />
                </Route> 
            </Routes>
    </div>
  )
}

export default Admin