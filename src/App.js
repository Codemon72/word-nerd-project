import SearchForm from './components/SearchForm';
import { SearchTermProvider } from './context/SearchTermContext'
import { CallAPIProvider } from './context/CallAPIContext'
import DisplaySynonyms from './components/DisplaySynonyms';
import DisplayRelatedWords from './components/DisplayRelatedWords';
import DisplayRhymesWith from './components/DisplayRhymesWith';

function App() {
  return (
    <SearchTermProvider>
    <CallAPIProvider>
      <div>
        <h1><span>The Word Nerd Project!</span> <span>🤓 💬</span></h1>
        <SearchForm />      

        <DisplaySynonyms />
        <DisplayRelatedWords />
        <DisplayRhymesWith />
      </div>
    </CallAPIProvider>
    </SearchTermProvider>
  );
}

export default App;
