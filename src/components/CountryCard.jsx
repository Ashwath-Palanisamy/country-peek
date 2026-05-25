import { Link } from 'react-router-dom'

const FALLBACK_FLAG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function CountryCard({ country }) {
  const { name, flags, population, region, capital, cca3 } = country

  return (
    <Link to={`/country/${cca3}`} className="card">
      <img
        src={flags?.svg}
        alt={`Flag of ${name?.common ?? 'country'}`}
        className="card__flag"
        onError={(event) => {
          event.currentTarget.onerror = null
          event.currentTarget.src = FALLBACK_FLAG
          event.currentTarget.alt = `Flag unavailable for ${name?.common ?? 'this country'}`
        }}
      />
      <div className="card__body">
        <h3 className="card__name">{name?.common ?? 'Unknown country'}</h3>
        <p>
          <span>Population:</span>{' '}
          {typeof population === 'number' ? population.toLocaleString() : 'N/A'}
        </p>
        <p>
          <span>Region:</span> {region ?? 'N/A'}
        </p>
        <p>
          <span>Capital:</span> {capital?.[0] ?? 'N/A'}
        </p>
      </div>
    </Link>
  )
}

export default CountryCard
