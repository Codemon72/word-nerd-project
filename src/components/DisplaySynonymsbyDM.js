import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import { fetchFromDatamuseAPI } from './functions/fetchFromDatamuseAPI'
import Display from './Display'

const DisplaySynonymsbyDM = () => {
  const { searchTerm } = useContext(SearchTermContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?rel_syn=' + searchTerm

  useEffect(() => {
    if (searchTerm !== '') {
      setResultsArray([])
      setIsLoading(true)
      fetchFromDatamuseAPI(queryString)
        .then((data) => {
          const wordsArray = data.map((wordObject) => {
            return wordObject.word
          })
          setResultsArray(wordsArray)
        })
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error))
    }
  }, [searchTerm, queryString])

  return (
    <Display
      title='Synonyms from Datamuse'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
    />
  )
}

export default DisplaySynonymsbyDM
