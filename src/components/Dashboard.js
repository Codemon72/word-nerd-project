import { useState, useEffect } from 'react'

const Dashboard = () => {
  const initialDashboardOptions = {
    synonyms: true,
    related: true,
    rhymes: true,
  }

  const [dashboardOptions, setDashboardOptions] = useState(
    initialDashboardOptions
  )
  const [showAllResults, setShowAllResults] = useState(true)

  const handleOptionsChange = (event) => {
    const { name, checked } = event.target
    // console.log(name, checked)
    setDashboardOptions({ ...dashboardOptions, [name]: checked })
  }

  const handleShowAllOptions = (event) => {
    console.log(event.target.checked)
    setShowAllResults(event.target.checked)
    if (event.target.checked){setDashboardOptions(initialDashboardOptions)}
  }

  // toggle 'show all' option if all options are selected or not
  useEffect(() => {
    if (Object.values(dashboardOptions).every((item) => item === true)) {
      setShowAllResults(true)
    } else {
      setShowAllResults(false)
    }
  }, [dashboardOptions])

  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={showAllResults}
          onChange={handleShowAllOptions}
          name='all'
        />
        Show all
      </label>
      <label>
        <input
          type='checkbox'
          checked={dashboardOptions.synonyms}
          onChange={handleOptionsChange}
          name='synonyms'
        />
        Show synonyms
      </label>
      <label>
        <input
          type='checkbox'
          checked={dashboardOptions.related}
          onChange={handleOptionsChange}
          name='related'
        />
        Show related
      </label>
      <label>
        <input
          type='checkbox'
          checked={dashboardOptions.rhymes}
          onChange={handleOptionsChange}
          name='rhymes'
        />
        Show rhymes
      </label>
    </div>
  )
}

export default Dashboard
