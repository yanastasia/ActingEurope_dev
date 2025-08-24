"use client"

import { useEffect, useState } from 'react'

export default function TestApiPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testApis = async () => {
      const tests = {
        events: '/api/events',
        venues: '/api/venues',
        theatres: '/api/theatres?admin=true'
      }

      const results: any = {}

      for (const [name, url] of Object.entries(tests)) {
        try {
          console.log(`Testing ${name} at ${url}`)
          const response = await fetch(url)
          console.log(`${name} response:`, response.status, response.statusText)
          
          if (response.ok) {
            const data = await response.json()
            results[name] = {
              status: response.status,
              success: true,
              dataLength: Array.isArray(data) ? data.length : 'Not an array',
              data: Array.isArray(data) ? data.slice(0, 2) : data // Show first 2 items
            }
          } else {
            results[name] = {
              status: response.status,
              success: false,
              error: response.statusText
            }
          }
        } catch (error) {
          console.error(`Error testing ${name}:`, error)
          results[name] = {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        }
      }

      setResults(results)
      setLoading(false)
    }

    testApis()
  }, [])

  if (loading) {
    return <div className="p-8">Testing API endpoints...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Results</h1>
      
      {Object.entries(results).map(([name, result]: [string, any]) => (
        <div key={name} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">{name.toUpperCase()}</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {result.status || 'N/A'}</p>
            <p><strong>Success:</strong> {result.success ? 'Yes' : 'No'}</p>
            {result.success ? (
              <>
                <p><strong>Data Length:</strong> {result.dataLength}</p>
                <details>
                  <summary>Sample Data</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              </>
            ) : (
              <p><strong>Error:</strong> {result.error}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}