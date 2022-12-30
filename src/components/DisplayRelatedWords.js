import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import Display from './Display'
import { fetchFromDatamuseAPI } from './functions/fetchFromDatamuseAPI'

const DisplayRelatedWords = () => {
  const { searchTerm } = useContext(SearchTermContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?ml=' + searchTerm

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
      title='Related Words'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
    />
  )
}

export default DisplayRelatedWords
