import SearchForm from './components/SearchForm';
import {SearchTermProvider} from './context/SearchTermContext'

function App() {
  return (
    <SearchTermProvider>
      <div>
        <h1>The Word Nerd Project! 🤓 💬</h1>
        <SearchForm />      
      </div>
    </SearchTermProvider>
  );
}

export default App;
