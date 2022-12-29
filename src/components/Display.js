import { useContext } from 'react'
import SearchTermContext from '../context/SearchTermContext'

const Display = ({ title, isLoading, searchTerm, resultsArray, displayed }) => {
  const { setSearchTerm, setInputValue } = useContext(SearchTermContext)

  function onDoubleClickHandler(e) {
    let doubleClickedWord = e.target.innerHTML
    setInputValue(doubleClickedWord)
    setSearchTerm(doubleClickedWord)
  }

  return (
    <div className='display_container'>
      <h3 className='display_heading'>{title}</h3>
      <div className='display_grid'>
        {isLoading && <i>Looking for matches</i>}
        {searchTerm !== '' && resultsArray?.length === 0 && !isLoading && (
          <i>no matches found</i>
        )}
        {resultsArray?.length > 0 &&
          resultsArray?.map((word) => {
            return (
              <span key={word} onDoubleClick={onDoubleClickHandler}>
                {word}
              </span>
            )
          })}
      </div>
    </div>
  )
}

export default Display
