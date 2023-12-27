import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';

function AddBid() {

  const [formData, setFormData] = useState({house_alias: null});
  const [optionsData, setOptionsData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const params = useLocation();

  const getOptions = useCallback(() => {
    Axios.get(`http://localhost:5000/api/v1/houses`)
    .then(response => {
      console.log(response.data);
      console.log(Object.entries(response.data.houses));
      const houses = Object.entries(response.data.houses);
      const housesArr = houses.map(item => ({
        "value": item[1].alias_no,
        "label": item[1].alias_no
      }))
      setOptionsData(housesArr);
    })
  }, []);

  const redirect = useCallback(() => {
      Axios.get(`http://localhost:5000/api/v1/employees/auction/${params.state.company_no}/${params.state.token}`)
      .then(response  => {
          console.log(response);
          if (response.data.status === 401)  {
              navigate('/')
          }
          else if (response.data.bid !== 'None') {
              navigate(`/bid/${params.state.company_no}/${params.state.token}`, {
                state: {
                    company_no: params.state.company_no,
                    token: params.state.token
                }})
          }
          getOptions();
      })
    }, [navigate, params.state.company_no, params.state.token, getOptions])

  useEffect(() => {  
    redirect();
  }, [redirect])

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitting...")
      console.log(formData.house_alias)

      if (formData.house_alias === null) {
        setErrorMsg("Select a number");
      } else {
        Axios.post(`http://localhost:5000/api/v1/employees/auction/${params.state.company_no}/${params.state.token}`, {alias: formData.house_alias}).then(response => {
            if (response.data) {
                console.log(response.data)
                if (response.data.status === 401) {
                    setErrorMsg(response.data.error); 
                } else if (response.data.status === 409) {
                    setErrorMsg(response.data.error);
                }
                else {
                    navigate(`/bid/${params.state.company_no}/${params.state.token}`, {
                        state: {
                            company_no: params.state.company_no,
                            token: params.state.token
                        }
                    })
                }
          }
        })
      }
  }

  const handleChange = (event) => {
      const { value } = event; 
      console.log(value)
      setFormData({house_alias: value});
  }

  return (
            <div>
            <div className='transparent-container'>
                <div className='description-container'>
                    <h1 className='heading-1'>Select a house property</h1>
                    <p className='body-text'>Pick a number from the dropdown below.</p>  
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='house_alias' className='input-label'>Enter your company number</label>                    
                    <Select id='house_alias' name='house_alias' options={optionsData} onChange={handleChange} defaultValue={""} />
                    <p className='error-text'>{errorMsg}</p>
                    <button type='submit' className='button-hero'>Place Bid</button>
                </form>
            </div>            
        </div>
  )
}

export default AddBid