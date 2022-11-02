import SearchForm from './components/SearchForm';
import { SearchTermProvider } from './context/SearchTermContext'
import { CallAPIProvider } from './context/CallAPIContext'
import DisplayField from './components/DisplayField';

function App() {
  return (
    <SearchTermProvider>
    <CallAPIProvider>
      <div>
        <h1>The Word Nerd Project! 🤓 💬</h1>
        <SearchForm />      

        <DisplayField />
      </div>
    </CallAPIProvider>
    </SearchTermProvider>
  );
}

export default App;
