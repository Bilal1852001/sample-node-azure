import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch data from both API endpoints
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch hello message and health status
        const [helloResponse, healthResponse] = await Promise.all([
          axios.get('/api/hello'),
          axios.get('/api/health')
        ])
        
        setMessage(helloResponse.data.message)
        setHealth(healthResponse.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to connect to the server')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const refreshData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/hello')
      setMessage(response.data.message)
      setError(null)
    } catch (err) {
      setError('Failed to refresh data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Azure DevOps CI/CD Tutorial</h1>
        <p>Sample Node.js + React App</p>
      </header>

      <main className="app-main">
        <div className="card">
          <h2>Frontend ↔️ Backend Communication</h2>
          {error ? (
            <div className="error">
              <p>❌ {error}</p>
            </div>
          ) : (
            <div className="success">
              <p>✅ {message}</p>
            </div>
          )}
          <button onClick={refreshData} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Message'}
          </button>
        </div>

        <div className="card">
          <h2>Server Health Status</h2>
          {health ? (
            <div className="health-info">
              <p>Status: <span className="status-badge">{health.status}</span></p>
              <p>Version: {health.version}</p>
              <p>Last Check: {new Date(health.timestamp).toLocaleString()}</p>
            </div>
          ) : (
            <p>Health data not available</p>
          )}
        </div>

        <div className="card">
          <h2>DevOps Pipeline Features</h2>
          <ul>
            <li>✅ Node.js + Express Backend</li>
            <li>✅ React + Vite Frontend</li>
            <li>✅ Docker Container Support</li>
            <li>✅ GitHub Actions CI/CD</li>
            <li>✅ Azure DevOps Pipeline</li>
            <li>✅ Azure Web App Deployment</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ for Azure DevOps Learning</p>
      </footer>
    </div>
  )
}

export default App 