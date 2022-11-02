import { useContext } from 'react';
import SearchTermContext from '../context/SearchTermContext'
import CallAPIContext from '../context/CallAPIContext'

const DisplayField = ({children}) => {
  console.log('DisplayField rendered');

  const { searchTerm } = useContext(SearchTermContext)
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

  if (searchTerm !== '') {
    fetchWords(searchTerm)
      .then((data) => {
        displayResults(data)
      })
      .catch((error) => console.log(error));
  }

  
  return (
    <div className='DisplayField'>
      <div id="results"></div>
    </div>
  )
}

export default DisplayField
