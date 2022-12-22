import DownloadButton from '../../Components/DownloadButton'
import InputAndSearchButton from '../../Components/InputAndSearchButton'
import arrowLeft from "../../assets/arrow-left.svg"
import searchingSvg from "../../assets/searching.svg"
import styles from "../PackView/PackView.css"
import result from "../Results/Results.css"
import ImagePreviewer from '../../Components/ImagePreview'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Image from '../../Components/Image'

function PackView() {
   const {collectionId} = useParams()
   const [isLoading, setIsLoading] = useState(true)
   const [previewPhotosArray, setPreviewPhotosArray] = useState([])
   const key = "grlfAMIokyV8ggKFoRN7DuagfFeBWdcr8sxvWgpCvaQ"

   const collectionPhotos = previewPhotosArray.map((photo)=>{
      return <Image 
               key={photo.id}
               src={photo.urls.regular} />
   })

   useEffect(()=>{
      fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${key}&per_page=30`)
      .then(response => response.json())
      .then(photos =>{
         setPreviewPhotosArray(photos)
         setIsLoading(false)
      })
   }, [])


  return (
    <div className="bg">
      <div className="header">
            <img src={arrowLeft} alt="back to results page" />
        <InputAndSearchButton />
        </div>

    <main className='pack-view'>      
        <p className="pack-name">Sneakers Pack Album vol 1. preview</p>

        <div className="pack-images">
         {collectionPhotos}           
        </div>

        <DownloadButton title={"Download Pack"} />

        {/* <ImagePreviewer /> */}
    </main>

    {isLoading && <div className="loader">
        <img src={searchingSvg} alt="image of a woman holding binoculars" />
        <p>Loading Preview...</p>
    </div>}
    </div>

    
  )
}

export default PackView