import downloadIcon from "../../assets/download.svg"
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
import JSZip from "jszip"

function PackView() {
   const {collectionId} = useParams()
   const navigate = useNavigate()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(false)
   const [imagePreviewSrc, setImagePreviewSrc] = useState("")
   const [bgColor, setBgColor] = useState("")
   const [previewPhotosArray, setPreviewPhotosArray] = useState([])
   const key = "nSGaXcvn30yl4gUPEV4q1C-G_Djvs8mzKOBVCPpd_dM"

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

        let page = 1
        let perPage = 30
        let totalImages = localStorage.getItem("total-images")
        let images = []

        function handleImageDownload(){
            return fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${key}&page=${page}&per_page=${perPage}`)
            .then(response => response.json())
            .then(data=>{
                images.push(...data)
                if (images.length == totalImages) {
                    console.log(images)
                    const zip = new JSZip             
            let photoZip = zip.folder(`${title} by ${user}`)
            const promises = [] 
            for (let i = 0; i < images.length; i++) {
               const promise = fetch(images[i].urls.regular)
                .then(response => response.blob())
                .then(blob => {
                    photoZip.file(`test${i}.jpg`, blob)
                    promises.push(promise)
                    if (promises.length == images.length) {
                        Promise.all(promises).then(()=> {
                        zip.generateAsync({type:"blob"}).then((content)=>{
                        saveAs(content, `${title} image pack.zip`)
            })
            })
            }
            })
            }
                }else{
                    page++
                    handleImageDownload()
                }
            })
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

        {!error && <button 
                onClick={handleImageDownload}
                className="download-button">
                <img src={downloadIcon} alt="download icon" />
                Download
                </button>}

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