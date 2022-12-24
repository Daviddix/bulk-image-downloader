import InputAndSearchButton from '../../Components/InputAndSearchButton'
import styles from './Results.css'
import BackToTop from '../../Components/BackToTop'
import searchingSvg from "../../assets/searching.svg"
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CollectionPack from '../../Components/CollectionPack'
import ErrorComponent from '../../Components/ErrorComponent'

function Results() {    
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const {searchTerm} = useParams()  
    const [collectionArray, setCollectionArray] = useState([])
    const key = "nSGaXcvn30yl4gUPEV4q1C-G_Djvs8mzKOBVCPpd_dM"

    useEffect(()=>{
        setIsLoading(true)
        fetch(`https://api.unsplash.com/search/collections/?per_page=20&client_id=${key}&query=${searchTerm}`)
        .then(response => response.json())
        .then(collection =>{      
            if (collection.total == 0) {
                throw new Error
            }      
            setError(false)
            setCollectionArray(collection.results)
            setIsLoading(false)

        })
        .catch(()=>{
            setCollectionArray([])
            setError(true)
            setIsLoading(false)
        })
    }, [searchTerm])

    const collectionPack = collectionArray.map((collection)=>{
        return <CollectionPack
                key={collection.id}
                id={collection.id}
                title={collection.title}
                total={collection.total_photos}
                user={collection.user.username}
                previewPhotoOne={collection.preview_photos[0]?.urls.small}
                previewPhotoTwo={collection.preview_photos[1]?.urls.small}
                previewPhotoThree={collection.preview_photos[2]?.urls.small}
        />
    })

  return (
    <div className="bg">
        <header className="header">
        <InputAndSearchButton  />
        </header>

    <main className='results'>      
        <p className='resultName'>Showing results for <span className="product">{searchTerm}</span></p>
        {error && <ErrorComponent />}

        <div className="pack-container">

        {collectionPack}

        </div>     
       
    </main>

    {isLoading && <div className="loader">
        <img src={searchingSvg} alt="image of a woman holding binoculars" />
        <p>Searching for images...</p>
    </div>}
    
    <BackToTop />
    </div>
  )
}

export default Results