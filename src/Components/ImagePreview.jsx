import shoe10 from "../assets/shoe-10.jpg"
import closeButton from "../assets/x.svg"
import preview from "../pages/PackView/ImagePreview.css"

function ImageViewer() {
  return (
    <div className="background">
      <div className="preview-content">
        <img src={closeButton} alt="close image preview" className="close-button"/>

        <div className="image-container">
            <img src={shoe10} alt="" />
        </div>
      </div>
        
    </div>
  )
}

export default ImageViewer