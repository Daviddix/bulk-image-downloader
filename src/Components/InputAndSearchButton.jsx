import { useState } from "react"
import { useNavigate } from "react-router-dom"
import searchIcon from "../assets/search.svg"

function InputAndSearchButton() {
  const [searchInput, setSearchInput] = useState("")
  const [inputError, setInputError] = useState(false)
  const navigate = useNavigate()

  function formValidator(e,value){
    e.preventDefault()
    if (value.trim()) {
      navigate(`/${value}`)
    }else{
      setInputError(true)
    }
  }

  return (
    <>
    <form 
    onSubmit={(e)=> formValidator(e,searchInput)}
    className="input-and-search-container">

    <input
    value={searchInput}
    onChange={(e)=>{
      setInputError(false)
      setSearchInput(e.target.value)
    }}
    type="text" 
    placeholder="Shoes" />
    <img src={searchIcon} alt="search button" />
    </form>

    {inputError && <p className="err">Please enter a value</p>}
    </>
  )
}

export default InputAndSearchButton