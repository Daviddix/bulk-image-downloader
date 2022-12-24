import { Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import { useRef, useState } from 'react'
import DownloadButton from './DownloadButton'
import { useNavigate } from 'react-router-dom'
import JSZip from 'jszip'

function collectionPack({title, total, previewPhotoOne, previewPhotoTwo, previewPhotoThree, user,id}) {
    const sliderRef = useRef()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    const key = "zpf7VaeKXkulZaTHFRI1ZpnkVuStzNVz1NwoM8A-NEI"
    function handleViewImagesClick(id){
        navigate(`/packview/${id}`)
    }

    function handleImageDownload(){
        const zip = new JSZip
        fetch(`https://api.unsplash.com/collections/${id}/photos?client_id=${key}&per_page=30`)
        .then(response => response.json())
        .then(images=>{            
            const imagesArray = [...images]
            console.log(imagesArray)
            let photoZip = zip.folder(`${title} by ${user}`)
            const promises = [] 
            let z;
            let flag;
            for (let i = 0; i < imagesArray.length; i++) {
               const promise = fetch(imagesArray[i].urls.small)
                .then(response => response.blob())
                .then(blob => {
                    z = photoZip.file(`test${i}.jpg`, blob)
                    promises.push(promise)
                    if (promises.length == imagesArray.length) {
                        Promise.all(promises).then(()=> {
                        zip.generateAsync({type:"blob"}).then((content)=>{
                        saveAs(content, `${title} image pack.zip`)
            })
            })
            }
            })
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
                <DownloadButton 
                onClick={handleImageDownload}
                title={"Download"} />

                <button 
                onClick={()=> handleViewImagesClick(id)}
                className='view-images-button'>View Images</button>
            </div>
        </div>
  )
}

export default collectionPack