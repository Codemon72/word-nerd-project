import SearchForm from './components/SearchForm';
import { SearchTermProvider } from './context/SearchTermContext'
import { CallAPIProvider } from './context/CallAPIContext'

function App() {
  return (
    <SearchTermProvider>
    <CallAPIProvider>
      <div>
        <h1>The Word Nerd Project! 🤓 💬</h1>
        <SearchForm />      

      </div>
    </CallAPIProvider>
    </SearchTermProvider>
  );
}

export default App;
