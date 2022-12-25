import { Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import { useRef, useState } from 'react'
import downloadIcon from "../assets/download.svg"
import { useNavigate } from 'react-router-dom'
import JSZip from 'jszip'
import saveAs from "file-saver"

function collectionPack({title, total, previewPhotoOne, previewPhotoTwo, previewPhotoThree, user,id, altDescription, setDownloadIndicator}) {
    const sliderRef = useRef()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    const key = "g7d7KRxOl8fE437qOTxlsf9XYcd3ApDgtZlLs5XMa3Y"

    function handleViewImagesClick(id,total,title,user){
        navigate(`/packview/${id}`)
        localStorage.setItem("total-images", total)
        localStorage.setItem("images-title", title)
        localStorage.setItem("images-user", user)
    }
        let page = 1
        let perPage = 30
        let totalImages = total
        let images = []

    function handleImageDownload(){
            return fetch(`https://api.unsplash.com/collections/${id}/photos?client_id=${key}&page=${page}&per_page=${perPage}`)           
            .then(response => response.json())
            .then(data=>{
                images.push(...data)
                if (images.length == totalImages) {
                    setDownloadIndicator(true)
                    setTimeout(() => {
                        setDownloadIndicator(false)
                    }, 2000)
                    
                    const zip = new JSZip             
            let photoZip = zip.folder(`${title} by ${user}`)
            const promises = [] 
            for (let i = 0; i < images.length; i++) {
               const promise = fetch(images[i].urls.regular)
                .then(response => response.blob())
                .then(blob => {
                    photoZip.file(`${title + [i]}.jpg`, blob)
                    promises.push(promise)
                    if (promises.length == images.length) {
                        Promise.all(promises).then(()=> {
                        zip.generateAsync({type:"blob"}).then((content)=>{
                        saveAs(content, `${title} by ${user} image pack.zip`)
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
            .catch((err)=>{
                alert("Seems like an error ocurred while trying to download, please check your internet connection and try again")
            })
    }     

  return (
    <div className="pack">
            <Swiper 
            ref={sliderRef}
            className="carousel" 
            onSlideChange={(e)=>{
                setActiveIndex(e.activeIndex)
            }}
            >
                <SwiperSlide><img src={previewPhotoOne} alt={altDescription} /></SwiperSlide>

                <SwiperSlide><img src={previewPhotoTwo} alt={`photo relating to ${title}`} /></SwiperSlide>

                <SwiperSlide><img src={previewPhotoThree} alt={`photo relating to ${title}`} /></SwiperSlide>
            </Swiper>
            <div className="dots">
                <span 
                onClick={()=>{
                    sliderRef.current.swiper.slideTo(0)
                }}
                className={activeIndex == 0? "active" : ""}></span>

                {total >=2 && <span 
                onClick={()=>{
                    sliderRef.current.swiper.slideTo(1)
                }}
                className={activeIndex == 1? "active" : ""}></span>}
                {total >= 3 && <span 
                onClick={()=>{
                    sliderRef.current.swiper.slideTo(2)
                }}
                className={activeIndex == 2? "active" : ""}></span>}
            </div>

            <p className="pack-name">• {title} by {user}</p>
            <p className="pack-number">• {total} images</p>

            <div className="buttons">
                <button 
                onClick={handleImageDownload}
                className="download-button">
                <img src={downloadIcon} alt="download icon" />
                Download
                </button>

                <button 
                onClick={()=> handleViewImagesClick(id, total, title, user)}
                className='view-images-button'>View Images</button>
            </div>
     </div>
  )
}

export default collectionPack