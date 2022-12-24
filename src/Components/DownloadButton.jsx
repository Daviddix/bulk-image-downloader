import downloadIcon from "../assets/download.svg"

function DownloadButton({title, onClick, currentCollectionPack}) {
  return (
    <button 
    onClick={onClick}
    className="download-button">
    <img src={downloadIcon} alt="download icon" />
     {title}
    </button>
  )
}

export default DownloadButton