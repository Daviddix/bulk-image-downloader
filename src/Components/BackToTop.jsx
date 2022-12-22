import React from 'react'
import UpArrow from "../assets/arrow-up.svg"

function BackToTop() {
  function backToTop(){
    window.scrollTo({
        top:0,
        left:0,
        behavior : "smooth"
    })
}

  return (
    <div 
    onClick={backToTop}
    className='back-to-top-container'>
        <img src={UpArrow} alt="go back to the top of the page" />
    </div>
  )
}

export default BackToTop