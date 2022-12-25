import { useState } from 'react'

const Dashboard = () => {
  const initialDashboardOptions = {
    synonyms: true,
    related: true,
    rhymes: true,
  }

  const [dashboardOptions, setDashboardOptions] = useState(
    initialDashboardOptions
  )

  const handleOptionsChange = (event) => {
    const { name, checked } = event.target
    console.log(name, checked)
    setDashboardOptions({ ...dashboardOptions, [name]: checked })
  }

  return (
    <div>
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
