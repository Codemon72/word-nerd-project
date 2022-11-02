import SearchForm from './components/SearchForm';
import { SearchTermProvider } from './context/SearchTermContext'
import { CallAPIProvider } from './context/CallAPIContext'
import DisplaySynonyms from './components/DisplaySynonyms';

function App() {
  return (
    <SearchTermProvider>
    <CallAPIProvider>
      <div>
        <h1>The Word Nerd Project! 🤓 💬</h1>
        <SearchForm />      

        <DisplaySynonyms />
      </div>
    </CallAPIProvider>
    </SearchTermProvider>
  );
}

export default App;
