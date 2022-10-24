import { useState } from 'react';

function App() {

  const API_URL = "https://api.datamuse.com/words?rel_syn=example";

  const fetchWords = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) { // errors from server
        throw Error(response.statusText);
      }
      const data = await response.json();
      console.log(data)

    } catch (error) { // errors from network / connection
      console.log(error.message);
    }
  };

  

  const [changeValue, setChangeValue] = useState('');

  const handleInputChange = (event) => {
    setChangeValue(event.target.value);
    console.log(changeValue)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWords();
  }

  return (
    <div>
      <h1>Bazinga!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={changeValue} 
          onChange={handleInputChange} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
