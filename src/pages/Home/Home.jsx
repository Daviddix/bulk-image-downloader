import InputAndSearchButton from "../../Components/InputAndSearchButton"
import man from "../../assets/Downloading_1.svg"
import styles from "./Home.css"

function Home() {
  return (
    <main className="home">
        <img 
        className="man-illustration"
        src={man} 
        alt="illustration of a man holding a progress bar" />

        <p className="heading">
            Download <span>Bulk Images</span> without stress
        </p>
        <p className="subheading">Using Bulk Downloader, you can download over 30+ images at once with just one click
        </p>

      <InputAndSearchButton  />
    </main>
  )
}

export default Home