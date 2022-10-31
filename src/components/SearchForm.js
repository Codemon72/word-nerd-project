import { useState } from 'react';
import DisplayField from './DisplayField';

const SearchForm = () => {

  console.log('SearchForm rendered');

  const API_URL = "https://api.datamuse.com/words?rel_syn=";

  const [searchTerm, setSearchTerm] = useState('');

  const resultsDiv = document.getElementById('results');
  

  const displayResults = (data) => {
    resultsDiv.innerHTML = '';
    const resultsList = document.createElement('ul');

    // create 'li' element for each word and insert in 'ul'
    data.forEach(wordObject => {
      const {word} = wordObject;

      const wordElement = document.createElement('li');
      wordElement.innerHTML = word;
      resultsList.appendChild(wordElement);
    })

    resultsDiv.appendChild(resultsList);
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
      <DisplayField />
    </div>
  )
}

export default SearchForm