import DownloadButton from '../../Components/DownloadButton'
import InputAndSearchButton from '../../Components/InputAndSearchButton'
import shoe1 from "../../assets/shoe-1.jpeg"
import shoe2 from "../../assets/shoe-2.jpeg"
import shoe3 from "../../assets/shoe-3.png"
import shoe4 from "../../assets/shoe-4.jpg"
import shoe5 from "../../assets/shoe-5.jpg"
import shoe6 from "../../assets/shoe-6.jpg"
import shoe7 from "../../assets/shoe-7.jpg"
import shoe8 from "../../assets/shoe-8.jpeg"
import shoe9 from "../../assets/shoe-9.jpeg"
import arrowLeft from "../../assets/arrow-left.svg"
import styles from "../PackView/PackView.css"
import result from "../Results/Results.css"
import ImageViewer from '../../Components/ImagePreview'

function PackView() {
  return (
    <div className="bg">
      <div className="header">
            <img src={arrowLeft} alt="back to results page" />
        <InputAndSearchButton />
        </div>

    <main className='pack-view'>      
        <p className="pack-name">Sneakers Pack Album vol 1.</p>

        <div className="pack-images">
          <div className="pack-image-container">
             <img src={shoe1} alt="image" />
          </div>

          <div className="pack-image-container">
             <img src={shoe3} alt="image" />
          </div>

          <div className="pack-image-container">
             <img src={shoe4} alt="image" />
          </div>

          <div className="pack-image-container">
             <img src={shoe5} alt="image" />
          </div>

          <div className="pack-image-container">
             <img src={shoe6} alt="image" />
          </div>
           
        </div>

        <DownloadButton title={"Download Pack"} />

        {/* <ImageViewer /> */}
    </main>
    </div>
  )
}

export default PackView