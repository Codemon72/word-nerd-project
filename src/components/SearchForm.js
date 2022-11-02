import { useContext } from 'react';
import DisplayField from './DisplayField';
import SearchTermContext from '../context/SearchTermContext'
import CallAPIContext from '../context/CallAPIContext'

const SearchForm = () => {

  console.log('SearchForm rendered');

  const { searchTerm, setSearchTerm } = useContext(SearchTermContext)
  const { fetchWords } = useContext(CallAPIContext)

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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm)
    fetchWords(searchTerm)
      .then((data) => {
        displayResults(data)
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='SearchForm'>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
        />
        <button type="submit">Search</button>
      </form>
      <DisplayField>
        <div id="results"></div>
      </DisplayField>
    </div>
  )
}

export default SearchForm