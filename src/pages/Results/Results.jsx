import DownloadButton from '../../Components/DownloadButton'
import InputAndSearchButton from '../../Components/InputAndSearchButton'
import styles from './Results.css'
import arrowUp from "../../assets/arrow-up.svg"
import shoe1 from "../../assets/shoe-1.jpeg"
import shoe2 from "../../assets/shoe-2.jpeg"
import shoe3 from "../../assets/shoe-3.png"
import BackToTop from '../../Components/BackToTop'
import { Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import { useState } from 'react'
import { useRef } from 'react'

function Results() {
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef()
  return (
    <div className="bg">
        <header className="header">
        <InputAndSearchButton />
        </header>

    <main className='results'>      
        <p className='resultName'>Showing results for <span className="product">sneakers</span></p>

        <div className="pack-container">

        <div className="pack">
            <Swiper 
            ref={sliderRef}
            className="carousel" 
            onSlideChange={(e)=>{
                setActiveIndex(e.activeIndex)
            }}
            >
                <SwiperSlide><img src={shoe1} alt="" /></SwiperSlide>
                <SwiperSlide><img src={shoe2} alt="" /></SwiperSlide>
                <SwiperSlide><img src={shoe3} alt="" /></SwiperSlide>
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

            <p className="pack-name">• Sneakers Pack Album vol 1.</p>
            <p className="pack-number">• 20 images</p>

            <div className="buttons">
                <DownloadButton title={"Download"} />
                <button className='view-images-button'>View Images</button>
            </div>
        </div>

        </div>

        

        
    </main>
    
    <BackToTop />
    </div>
  )
}

export default Results