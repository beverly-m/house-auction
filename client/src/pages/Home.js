import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({company_no: ''});
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        Axios.post(`http://localhost:5000/api/v1/employees/${formData.company_no}`).then(response => {
            if (response.data) {
                if (response.data.status === 401) {
                    setErrorMsg(response.data.error); 
                } else {
                    navigate(`/newbid/${formData.company_no}/${response.data.token}`, {
                        state: {
                            company_no: formData.company_no,
                            token: response.data.token
                        }
                    })
                }
        }
        })
    }

    const handleChange = (event) => {
        const { value } = event.target; 
        setFormData({company_no: value});
    }

    return (
        <div className='main-container'>
            <div className='img-container'>
                <div className='transparent-container'>
                    <div className='description-container'>
                        <h1 className='heading-1'>From Numbers to New Beginnings: Your Home Awaits!</h1>
                        <p className='body-text'>Enter our property bid featuring 56 diverse houses represented solely by numbers. Without visual previews, the excitement lies in selecting a number to reveal your future home—a mystery waiting to unfold. Embrace the anticipation and seize the opportunity to secure your ideal living space—your dream home could be just a number away!</p>  
                    </div>
                    <form className='home-form-container' onSubmit={handleSubmit}>
                        <label htmlFor='company_number' className='input-label'>Enter your company number:</label>
                        <input type='text' id='company_number' name='company_number' value={formData.company_no} onChange={handleChange} className='input-text' required></input>
                        {errorMsg.length !== 0 ? 
                        <div className='error-message'>
                            <p className='error-text'>{errorMsg}</p>
                        </div> : 
                        <div></div>
                        }
                        <button type='submit' className='button-hero'>SUBMIT</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default Home