import React from 'react'

function Image({src}) {
  return (
    <div className="pack-image-container">
             <img src={src} alt="image" />
          </div>
  )
}

export default Image