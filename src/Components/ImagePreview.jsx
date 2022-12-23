import closeButton from "../assets/x.svg"
import preview from "../pages/PackView/ImagePreview.css"

function ImageViewer({src, bgColor,setImagePreviewSrc}) {
  const style = {
    backgroundColor : `${bgColor}67`
  }

  return (
    <div className="background" style={style}>

      <div className="preview-content">
        <img 
        onClick={()=>{
          setImagePreviewSrc("")
        }}
        src={closeButton} 
        alt="close image preview" 
        className="close-button"/>

        <div className="image-container">
            <img src={src} alt="" />
        </div>
      </div>
        
    </div>
  )
}

export default ImageViewer