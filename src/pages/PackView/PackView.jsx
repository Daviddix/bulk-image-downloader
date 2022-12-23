import DownloadButton from '../../Components/DownloadButton'
import InputAndSearchButton from '../../Components/InputAndSearchButton'
import arrowLeft from "../../assets/arrow-left.svg"
import searchingSvg from "../../assets/searching.svg"
import styles from "../PackView/PackView.css"
import result from "../Results/Results.css"
import ImagePreviewer from '../../Components/ImagePreview'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Image from '../../Components/Image'
import ErrorComponent from '../../Components/ErrorComponent'

function PackView() {
   const {collectionId} = useParams()
   const navigate = useNavigate()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(false)
   const [imagePreviewSrc, setImagePreviewSrc] = useState("")
   const [bgColor, setBgColor] = useState("")
   const [previewPhotosArray, setPreviewPhotosArray] = useState([])
   const key = "grlfAMIokyV8ggKFoRN7DuagfFeBWdcr8sxvWgpCvaQ"

   const collectionPhotos = previewPhotosArray.map((photo)=>{
      return <Image 
               key={photo.id}
               setImagePreviewSrc={setImagePreviewSrc}
               setBgColor={setBgColor}
               color={photo.color}
               src={photo.urls.regular} />
   })

   useEffect(()=>{
      fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${key}&per_page=30`)
      .then(response => response.json())
      .then(photos =>{
        setError(false)
         setPreviewPhotosArray(photos)
         setIsLoading(false)
      })
      .catch((err)=>{
        setError(true)
        setIsLoading(false)
      })
   }, [])

   function navigateToPreviousPage(){
    navigate(-1)
   }


  return (
    <div className="bg">
      <div className="header">
            <img 
            onClick={navigateToPreviousPage}
            src={arrowLeft} 
            alt="back to results page" />
        <InputAndSearchButton />
        </div>

    <main className='pack-view'>      
        <p className="pack-name">Sneakers Pack Album vol 1. [preview]<br />
        <span className='pack-info'>*You can preview an image by clicking/tapping on it*</span>
         </p>
        {error && <ErrorComponent />}

        <div className="pack-images">
         {collectionPhotos}           
        </div>

        {!error && <DownloadButton title={"Download Pack"} />}

        {imagePreviewSrc && <ImagePreviewer src={imagePreviewSrc} bgColor={bgColor} setImagePreviewSrc={setImagePreviewSrc} /> }
    </main>

    {isLoading && <div className="loader">
        <img src={searchingSvg} alt="image of a woman holding binoculars" />
        <p>Loading Preview...</p>
    </div>}
    </div>

    
  )
}

export default PackView