import { useContext, useState } from 'react';
import SearchTermContext from '../context/SearchTermContext'

const SearchForm = () => {

  console.log('SearchForm rendered');

  const { setSearchTerm } = useContext(SearchTermContext)

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue)
  }

  return (
    <div className='SearchForm'>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchForm