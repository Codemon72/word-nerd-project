import { createContext, useState } from 'react'

const SearchTermContext = createContext()

export const SearchTermProvider = ({ children }) => {

  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  return (
  <SearchTermContext.Provider value={{ inputValue, setInputValue, searchTerm, setSearchTerm }}>
    { children }
  </SearchTermContext.Provider>
  )
}

export default SearchTermContext