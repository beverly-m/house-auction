import React from 'react'
import { Link } from 'react-router-dom'

function NoPage() {
  return (
    <div className='description-container bid-info-container'>
      <h1 className='text-404'>404</h1>
      <p>Page does not exist</p>
      <Link to='/'><button className='button-hero'>Back to Home</button></Link> 
    </div>
  )
}

export default NoPage