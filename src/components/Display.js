
const Display = ({title, isLoading, searchTerm, resultsArray}) => {
  return (
    <div className='display_container'>
      <h3 className='display_heading'>{title}</h3>
      <div className='display_grid'>
        { isLoading && (<i>Looking for matches</i>) }
        { searchTerm !== '' && resultsArray.length === 0 && !isLoading && (
          <i>no matches found</i>
        )}
        { resultsArray.length > 0 && (
            resultsArray.map((wordObject) => {
              return (
                <span key={wordObject.word}>{wordObject.word}</span>
              );
            })
          )}
      </div>
    </div>
  )
}

export default Display
