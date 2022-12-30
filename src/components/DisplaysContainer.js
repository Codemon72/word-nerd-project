import { useContext } from 'react'
import DisplayContext from '../context/DisplayContext'
import DisplaySynonymsbyMW from './DisplaySynonymsbyMW'
import DisplaySynonymsbyDM from './DisplaySynonymsbyDM'
import DisplayRelatedWords from './DisplayRelatedWords'
import DisplayRhymesWith from './DisplayRhymesWith'

const DisplaysContainer = () => {
  const { dashboardOptions } = useContext(DisplayContext)
  return (
    <div>
      {dashboardOptions.synonymsMW && <DisplaySynonymsbyMW />}
      {dashboardOptions.synonymsDM && <DisplaySynonymsbyDM />}
      {dashboardOptions.related && <DisplayRelatedWords />}
      {dashboardOptions.rhymes && <DisplayRhymesWith />}
    </div>
  )
}

export default DisplaysContainer
