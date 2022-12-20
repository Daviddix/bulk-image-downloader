import downloadIcon from "../assets/download.svg"

function DownloadButton({title}) {
  return (
    <button className="download-button">
    <img src={downloadIcon} alt="download icon" />
     {title}
    </button>
  )
}

export default DownloadButton