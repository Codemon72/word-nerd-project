import { createContext } from 'react';

const CallAPIContext = createContext()

export const CallAPIProvider = ({ children }) => {

  const API_URL = "https://api.datamuse.com/words?rel_syn=";
  
  const fetchWords = async (searchTerm) => {
    try {
      const response = await fetch(API_URL + searchTerm);
      if (!response.ok) { // errors from server
        throw Error(response.statusText);
      }
      const data = await response.json();
      return data;
      
    } catch (error) { // errors from network / connection
      console.log(error.message);
    }
  };

  return (
  <CallAPIContext.Provider value={{ fetchWords }}>
    { children }
  </CallAPIContext.Provider>
  )
}

export default CallAPIContext