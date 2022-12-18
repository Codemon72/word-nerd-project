const API_URL = 'https://api.datamuse.com'

export const fetchFromDatamuseAPI = async (queryString) => {
  try {
    const response = await fetch(API_URL + queryString)
    if (!response.ok) {
      // errors from server
      throw Error(response.statusText)
    }
    const data = await response.json()
    return data
  } catch (error) {
    // errors from network / connection
    console.log('Error: ', error.message)
  }
}
