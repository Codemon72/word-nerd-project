import { useContext, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'

const SearchForm = () => {
  console.log('SearchForm rendered')

  const { inputValue, setInputValue, searchTerm, setSearchTerm } =
    useContext(SearchTermContext)

  const inputElement = document.getElementById('inputElement')

  useEffect(() => {
    if (searchTerm !== '') {
      inputElement.focus()
      inputElement.select()
    }
  }, [searchTerm, inputElement])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(inputValue)
  }

  return (
    <div className='SearchForm'>
      <form onSubmit={handleSubmit}>
        <input
          id='inputElement'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
