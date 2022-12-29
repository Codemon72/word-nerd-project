import { useContext } from 'react'
import DisplayContext from '../context/DisplayContext'
import DisplaySynonyms from './DisplaySynonyms'
import DisplayRelatedWords from './DisplayRelatedWords'
import DisplayRhymesWith from './DisplayRhymesWith'

const DisplaysContainer = () => {
  const { dashboardOptions } = useContext(DisplayContext)
  return (
    <div>
      {dashboardOptions.synonyms && <DisplaySynonyms />}
      {dashboardOptions.related && <DisplayRelatedWords />}
      {dashboardOptions.rhymes && <DisplayRhymesWith />}
    </div>
  )
}

export default DisplaysContainer
