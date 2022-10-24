import { useState } from 'react';

const SearchForm = () => {

  const API_URL = "https://api.datamuse.com/words?rel_syn=";

  const [searchTerm, setSearchTerm] = useState('');

  const displayResults = (data) => {
    const resultsElement = document.createElement('ul');

    data.forEach(wordObject => {
      const {word} = wordObject;

      const wordElement = document.createElement('li');
      wordElement.innerHTML = word;
      resultsElement.appendChild(wordElement);
    })

    document.getElementById('results').appendChild(resultsElement);
  }
  
  const fetchWords = async () => {
    try {
      const response = await fetch(API_URL + searchTerm);
      if (!response.ok) { // errors from server
        throw Error(response.statusText);
      }
      const data = await response.json();
      displayResults(data);
      
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
      <div id="results"></div>
    </div>
  )
}

export default SearchForm