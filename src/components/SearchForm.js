import { useContext, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'

const SearchForm = () => {
  const { inputValue, setInputValue, searchTerm, setSearchTerm } =
    useContext(SearchTermContext)

  const inputElement = document.getElementById('inputElement')

  useEffect(() => {
    // When the searchTerm changes and is not empty, focus on the input element and select its contents
    if (searchTerm !== '') {
      inputElement.focus()
      inputElement.select()
    }
  }, [searchTerm, inputElement])

  const handleInputChange = (event) => {
    // Update the inputValue state with the new value from the input element
    setInputValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Set the searchTerm state with the inputValue when the form is submitted
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
          placeholder='Enter search term'
          autoFocus
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
