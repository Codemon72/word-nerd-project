import { useContext, useState, useEffect } from 'react'
import SearchTermContext from '../context/SearchTermContext'
import Display from './Display'
import { fetchFromDatamuse } from './functions/callDatamuseAPI'

const DisplayRelatedWords = () => {
  console.log('DisplayRelatedWords rendered')

  const { searchTerm } = useContext(SearchTermContext)

  const [resultsArray, setResultsArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let queryString = '/words?ml=' + searchTerm

  useEffect(() => {
    console.log('useEffect triggered')

    if (searchTerm !== '') {
      setResultsArray([])
      setIsLoading(true)
      fetchFromDatamuse(queryString)
        .then((data) => {
          setResultsArray(data)
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
