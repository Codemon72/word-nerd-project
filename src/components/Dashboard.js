import { useState, useEffect, useContext } from 'react'
import DisplayContext from '../context/DisplayContext'

const Dashboard = () => {
  const { dashboardOptions, setDashboardOptions, initialDashboardOptions } =
    useContext(DisplayContext)

  const [showAllOptions, setShowAllOptions] = useState(true)

  const handleOptionsChange = (event) => {
    const { name, checked } = event.target
    setDashboardOptions({ ...dashboardOptions, [name]: checked })
  }

  const handleShowAllOptions = (event) => {
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
            checked={dashboardOptions.synonymsMW}
            onChange={handleOptionsChange}
            name='synonymsMW'
          />
          Synonyms from Merriam Webster
        </label>
        <label>
          <input
            type='checkbox'
            checked={dashboardOptions.synonymsDM}
            onChange={handleOptionsChange}
            name='synonymsDM'
          />
          Synonyms from Datamuse
        </label>
        <label>
          <input
            type='checkbox'
            checked={dashboardOptions.related}
            onChange={handleOptionsChange}
            name='related'
          />
          Related Words
        </label>
        <label>
          <input
            type='checkbox'
            checked={dashboardOptions.rhymes}
            onChange={handleOptionsChange}
            name='rhymes'
          />
          Rhymes
        </label>
      </div>
    </div>
  )
}

export default Dashboard
