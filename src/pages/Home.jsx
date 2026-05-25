import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'

function Home() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setCountries([])
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      setCountries([])
      setError(null)

      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('No countries found.')
        }

        const data = await response.json()
        setCountries(data)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setCountries([])
        setError('No countries found.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />
      {!query.trim() && (
        <p className="home__status">Start searching to explore countries.</p>
      )}
      {loading && <p className="home__status">Loading...</p>}
      {error && <p className="home__status home__status--error">{error}</p>}
      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
