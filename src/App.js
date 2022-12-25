import SearchForm from './components/SearchForm'
import Dashboard from './components/Dashboard'
import { SearchTermProvider } from './context/SearchTermContext'
import DisplaySynonyms from './components/DisplaySynonyms'
import DisplayRelatedWords from './components/DisplayRelatedWords'
import DisplayRhymesWith from './components/DisplayRhymesWith'

function App() {
  return (
    <SearchTermProvider>
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
    </SearchTermProvider>
  )
}

export default App
