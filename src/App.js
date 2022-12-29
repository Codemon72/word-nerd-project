import { SearchTermProvider } from './context/SearchTermContext'
import { DisplayProvider } from './context/DisplayContext'
import SearchForm from './components/SearchForm'
import Dashboard from './components/Dashboard'
import DisplaysContainer from './components/DisplaysContainer'

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
          <DisplaysContainer />
        </div>
      </DisplayProvider>
    </SearchTermProvider>
  )
}

export default App
