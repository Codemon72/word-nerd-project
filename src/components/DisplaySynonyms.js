import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import { fetchFromMerrianWebsterAPI } from './functions/fetchFromMerrianWebsterAPI'
import Display from './Display'

const DisplaySynonyms = () => {
  console.log('DisplaySynonyms rendered')

  const { searchTerm } = useContext(SearchTermContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = searchTerm

  useEffect(() => {
    if (searchTerm !== '') {
      setResultsArray([])
      setIsLoading(true)
      fetchFromMerrianWebsterAPI(queryString)
      .then((data) => {
        if (data[0]?.meta?.syns[0]) {
          // todo: read out more syns arrays
          setResultsArray(data[0]?.meta?.syns[0])
        } else {
          setResultsArray([])
        }
      })
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error))
    }
  }, [searchTerm, queryString])

  console.log('synonyms: ', resultsArray)

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
