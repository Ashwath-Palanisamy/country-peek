function FilterBar({ region, onRegionChange }) {
  return (
    <div className="filter-bar">
      <select
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
        aria-label="Filter by region"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  )
}

export default FilterBar
