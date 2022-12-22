import { Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import { useRef, useState } from 'react'
import DownloadButton from './DownloadButton'
import { useNavigate } from 'react-router-dom'

function collectionPack({title, total, previewPhotoOne, previewPhotoTwo, previewPhotoThree, user,id}) {
    const sliderRef = useRef()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    function handleViewImagesClick(id){
        navigate(`/packview/${id}`)
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
                <DownloadButton title={"Download"} />

                <button 
                onClick={()=> handleViewImagesClick(id)}
                className='view-images-button'>View Images</button>
            </div>
        </div>
  )
}

export default collectionPack