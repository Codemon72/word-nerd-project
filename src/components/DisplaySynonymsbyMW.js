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
      // Reset the results array and set loading state to true
      setResultsArray([])
      setIsLoading(true)

      // Fetch synonyms from the Merriam Webster API
      fetchFromMerrianWebsterAPI(queryString)
        .then((data) => {
          if (data[0]?.meta?.syns[0]) {
            // Extract unique synonyms from the API response and update the results array
            let resultsArray = [...new Set([].concat(...data[0]?.meta?.syns))]
            setResultsArray(resultsArray)
          } else {
            // No synonyms found, set results array as empty
            setResultsArray([])
          }
        })
        .then(() => setIsLoading(false)) // Set loading state to false after fetching and updating the results
        .catch((error) => console.log(error)) // Handle any errors during the API fetch
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
