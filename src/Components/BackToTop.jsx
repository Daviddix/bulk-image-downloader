import React from 'react'
import UpArrow from "../assets/arrow-up.svg"

function BackToTop() {
  return (
    <div className='back-to-top-container'>
        <img src={UpArrow} alt="go back to the top of the page" />
    </div>
  )
}

export default BackToTop