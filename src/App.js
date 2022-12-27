import { SearchTermProvider } from './context/SearchTermContext'
import { DisplayProvider } from './context/DisplayContext'
import SearchForm from './components/SearchForm'
import Dashboard from './components/Dashboard'
import DisplaySynonyms from './components/DisplaySynonyms'
import DisplayRelatedWords from './components/DisplayRelatedWords'
import DisplayRhymesWith from './components/DisplayRhymesWith'

function App() {
  return (
    <SearchTermProvider>
      <DisplayProvider>
        <div>
          <h1>
            <span>The Word Nerd Project!</span> <span>🤓 💬</span>
          </h1>
          <SearchForm />
          <Dashboard />
          <DisplaySynonyms />
          <DisplayRelatedWords />
          <DisplayRhymesWith />
        </div>
      </DisplayProvider>
    </SearchTermProvider>
  )
}

export default App
