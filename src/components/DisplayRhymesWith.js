import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import DisplayContext from '../context/DisplayContext'
import { fetchFromDatamuseAPI } from './functions/fetchFromDatamuseAPI'
import Display from './Display'

const DisplayRhymesWith = () => {
  console.log('DisplayRhymesWith rendered')

  const { searchTerm } = useContext(SearchTermContext)
  const { dashboardOptions } = useContext(DisplayContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?rel_rhy=' + searchTerm

  useEffect(() => {
    console.log('useEffect triggered')

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
      title='Rhymes with ...'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
      displayed={dashboardOptions.rhymes}
    />
  )
}

export default DisplayRhymesWith
