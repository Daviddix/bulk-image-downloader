import searchIcon from "../assets/search.svg"

function InputAndSearchButton() {
  return (
    <form className="input-and-search-container">
    <input type="text" placeholder="Shoes" />
    <img src={searchIcon} alt="search button" />
</form>
  )
}

export default InputAndSearchButton