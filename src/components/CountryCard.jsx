function CountryCard({ country }) {
  return (
    <div className="country-card">
      <h3>{country.name}</h3>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
    </div>
  )
}

export default CountryCard
