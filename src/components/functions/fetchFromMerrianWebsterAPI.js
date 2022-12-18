export const fetchFromMerrianWebsterAPI = async (queryString) => {
  try {
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${queryString}?key=8cfe6b13-9515-4739-83f0-d14eb6f9f618`
    )
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
