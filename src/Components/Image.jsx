function Image({src, color, setImagePreviewSrc,setBgColor}) {

  function handleImageClick(src, color){
    setImagePreviewSrc(src)
    setBgColor(color)
  }
  return (
    <div 
    onClick={()=>{
      handleImageClick(src, color)
    }}
    className="pack-image-container">
             <img src={src} alt="image" />
          </div>
  )
}

export default Image