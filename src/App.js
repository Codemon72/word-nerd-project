
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

fetchWords();


function App() {
  return (
    <div>
      Bazinga!
    </div>
  );
}

export default App;
