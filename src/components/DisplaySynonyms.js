import { useContext, useState, useEffect } from 'react';
import SearchTermContext from '../context/SearchTermContext'
import CallAPIContext from '../context/CallAPIContext'

const DisplaySynonyms = () => {
  console.log('DisplaySynonyms rendered');

  const { searchTerm } = useContext(SearchTermContext)
  const { fetchWords } = useContext(CallAPIContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?rel_syn=' + searchTerm

  useEffect(() => {
    console.log("useEffect triggered");
    if (searchTerm !== '') {
      setResultsArray([])
      setIsLoading(true)
      fetchWords(queryString)
        .then((data) => {
          setResultsArray(data)
        })
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error));
    }
  }, [searchTerm, fetchWords, queryString]);
  
  return (
    <div className='display_container'>
      <h3 className='display_heading'>Synonyms</h3>
      <div className='display_grid'>
        { isLoading && (<i>Looking for matches</i>) }
        { searchTerm !== '' && resultsArray.length === 0 && !isLoading && (
          <i>no matches found</i>
        )}
        { resultsArray.length > 0 && (
            resultsArray.map((wordObject) => {
              return (
                <span key={wordObject.word}>{wordObject.word}</span>
              );
            })
          )}
      </div>
    </div>
  )
}

export default DisplaySynonyms
