import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';

function BidInfo() {
  const [data, setData] = useState("");

  const navigate = useNavigate();
  const params = useLocation();

  const redirect = useCallback(() => {
      Axios.get(`http://localhost:5000/api/v1/employees/auction/${params.state.company_no}/${params.state.token}`)
      .then(response => {
          console.log("Response from backend");
          console.log(response.data.bid);
          
          if (response.data.status === 401)  {
              navigate('/');
          }
          else if (response.data.bid === 'None') {
              navigate(`/newbid/${params.state.company_no}/${params.state.token}`, {
                state: {
                    company_no: params.state.company_no,
                    token: params.state.token
                }})
          }
          setData(response.data.bid);
      })
    }, [navigate, params.state.company_no, params.state.token])

  useEffect(() => {  
    redirect();
  }, [redirect])

  return (
    <div>
      <h3>Company number: {data.company_no}</h3>
      <p>You selected a house property represented by the number {data.house_alias_no}.</p>
    </div>
  )
}

export default BidInfo