import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import { fetchFromDatamuseAPI } from './functions/fetchFromDatamuseAPI'
import Display from './Display'

const DisplaySynonyms = () => {
  console.log('DisplaySynonyms rendered')

  const { searchTerm } = useContext(SearchTermContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?rel_syn=' + searchTerm

  useEffect(() => {
    console.log('useEffect triggered')
    if (searchTerm !== '') {
      setResultsArray([])
      setIsLoading(true)
      fetchFromDatamuseAPI(queryString)
        .then((data) => {
          setResultsArray(data)
        })
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error))
    }
  }, [searchTerm, queryString])

  return (
    <Display
      title='Synoyms'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
    />
  )
}

export default DisplaySynonyms
