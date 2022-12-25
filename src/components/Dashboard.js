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
  const [showAllOptions, setShowAllOptions] = useState(true)

  const handleOptionsChange = (event) => {
    const { name, checked } = event.target
    setDashboardOptions({ ...dashboardOptions, [name]: checked })
  }

  const handleShowAllOptions = (event) => {
    console.log(event.target.checked)
    setShowAllOptions(event.target.checked)
    if (event.target.checked) {
      setDashboardOptions(initialDashboardOptions)
    }
  }

  // toggle 'show all' checkbox if all options are selected or not
  useEffect(() => {
    if (Object.values(dashboardOptions).every((item) => item === true)) {
      setShowAllOptions(true)
    } else {
      setShowAllOptions(false)
    }
  }, [dashboardOptions])

  return (
    <div className='Dashboard'>
      <label>
        <input
          type='checkbox'
          checked={showAllOptions}
          onChange={handleShowAllOptions}
          name='all'
        />
        Show all
      </label>
      <div className='options'>
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
    </div>
  )
}

export default Dashboard
