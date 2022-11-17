import { useContext, useState, useEffect } from 'react';
import SearchTermContext from '../context/SearchTermContext'
import CallAPIContext from '../context/CallAPIContext'
import Display from './Display';

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
    <Display
      title='Synoyms'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
    />
  );
}

export default DisplaySynonyms
