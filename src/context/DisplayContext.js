import { createContext, useState } from 'react'

const DisplayContext = createContext()

export const DisplayProvider = ({ children }) => {
  const initialDashboardOptions = {
    synonyms: true,
    related: true,
    rhymes: true,
  }
  const [dashboardOptions, setDashboardOptions] = useState(
    initialDashboardOptions
  )

  return (
    <DisplayContext.Provider
      value={{ dashboardOptions, setDashboardOptions, initialDashboardOptions }}
    >
      {children}
    </DisplayContext.Provider>
  )
}

export default DisplayContext
