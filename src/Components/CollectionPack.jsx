import { Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import { useRef, useState } from 'react'
import downloadIcon from "../assets/download.svg"
import { useNavigate } from 'react-router-dom'
import JSZip from 'jszip'
import saveAs from "file-saver"
import { useEffect } from 'react'

function collectionPack({title, total, previewPhotoOne, previewPhotoTwo, previewPhotoThree, user,id}) {
    const sliderRef = useRef()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    const [currentImageArray, setCurrentImageArray] = useState([])
    const key = "nSGaXcvn30yl4gUPEV4q1C-G_Djvs8mzKOBVCPpd_dM"

    function handleViewImagesClick(id){
        navigate(`/packview/${id}`)
    }
        let page = 1
        let perPage = 30
        let totalImages = total
        let images = []

        useEffect(()=>{
            localStorage.setItem("total-images", total)
        }, [])

        function handleImageDownload(){
            return fetch(`https://api.unsplash.com/collections/${id}/photos?client_id=${key}&page=${page}&per_page=${perPage}`)           
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
    <div className="pack">
            <Swiper 
            ref={sliderRef}
            className="carousel" 
            onSlideChange={(e)=>{
                setActiveIndex(e.activeIndex)
            }}
            >
                <SwiperSlide><img src={previewPhotoOne} alt="" /></SwiperSlide>

                <SwiperSlide><img src={previewPhotoTwo} alt="" /></SwiperSlide>

                <SwiperSlide><img src={previewPhotoThree} alt="" /></SwiperSlide>
            </Swiper>
            <div className="dots">
                <span 
                onClick={()=>{
                    sliderRef.current.swiper.slideTo(0)
                }}
                className={activeIndex == 0? "active" : ""}></span>

                <span 
                onClick={()=>{
                    sliderRef.current.swiper.slideTo(1)
                }}
                className={activeIndex == 1? "active" : ""}></span>
                <span 
                onClick={()=>{
                    sliderRef.current.swiper.slideTo(2)
                }}
                className={activeIndex == 2? "active" : ""}></span>
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
                onClick={()=> handleViewImagesClick(id)}
                className='view-images-button'>View Images</button>
            </div>
        </div>
  )
}

export default collectionPack