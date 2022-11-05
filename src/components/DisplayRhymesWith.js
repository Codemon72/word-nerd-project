import { useContext, useState, useEffect } from 'react';
import SearchTermContext from '../context/SearchTermContext'
import CallAPIContext from '../context/CallAPIContext'

const DisplayRhymesWith = () => {
  console.log('DisplayRhymesWith rendered');

  const { searchTerm } = useContext(SearchTermContext)
  const { fetchWords } = useContext(CallAPIContext)

  const [resultsArray, setResultsArray] = useState([])

  let queryString = '/words?rel_rhy=' + searchTerm

  useEffect(() => {
    console.log("useEffect triggered");
    if (searchTerm !== '') {
      fetchWords(queryString)
        .then((data) => {
          setResultsArray(data)
        })
        .catch((error) => console.log(error));
    }
  }, [searchTerm, fetchWords, queryString]);
  
  return (
    <div className='display_container'>
      <h3 className='display_heading'>Rhymes with ...</h3>
      <div className='display_grid'>
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

export default DisplayRhymesWith
 