import { SearchTermProvider } from './context/SearchTermContext'
import { DisplayProvider } from './context/DisplayContext'
import SearchForm from './components/SearchForm'
import Dashboard from './components/Dashboard'
import DisplaysContainer from './components/DisplaysContainer'

function App() {
  return (
    <SearchTermProvider>
      <DisplayProvider>
        <main>
          <h1>
            <span>The Word Nerd Project!</span> <span>🤓 💬</span>
          </h1>
          <SearchForm />
          <Dashboard />
          <DisplaysContainer />
        </main>
      </DisplayProvider>
    </SearchTermProvider>
  )
}

export default App
