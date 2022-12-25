function Image({src, color, setImagePreviewSrc,setBgColor, description}) {

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
             <img src={src} alt={description || "image"} />
          </div>
  )
}

export default Image