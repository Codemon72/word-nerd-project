import { useState } from 'react';

const SearchForm = () => {

  const API_URL = "https://api.datamuse.com/words?rel_syn=";

  const [searchTerm, setSearchTerm] = useState('');

  const fetchWords = async () => {
    try {
      const response = await fetch(API_URL + searchTerm);
      if (!response.ok) { // errors from server
        throw Error(response.statusText);
      }
      const data = await response.json();
      console.log(data)

    } catch (error) { // errors from network / connection
      console.log(error.message);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWords();
  }

  return (
    <div>SearchForm
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchForm