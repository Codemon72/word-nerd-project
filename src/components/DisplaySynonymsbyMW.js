import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import { fetchFromMerrianWebsterAPI } from './functions/fetchFromMerrianWebsterAPI'
import Display from './Display'

const DisplaySynonymsbyMW = () => {
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
            let resultsArray = [...new Set([].concat(...data[0]?.meta?.syns))]
            setResultsArray(resultsArray)
          } else {
            setResultsArray([])
          }
        })
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error))
    }
  }, [searchTerm, queryString])

  return (
    <Display
      title='Synoyms from Merriam Webster'
      isLoading={isLoading}
      searchTerm={searchTerm}
      resultsArray={resultsArray}
    />
  )
}

export default DisplaySynonymsbyMW
