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
    <div className='description-container bid-info-container'>
      <h1 className='heading-1'>Company number: {data.company_no}</h1>
      <p>You selected a house property represented by the number:</p>
      <h1 className='heading-1'>{data.house_alias_no}</h1>
    </div>
  )
}

export default BidInfo