import { useState } from 'react'
import axios from 'axios'

const AddTeam = () => {
  const [team, setTeam] = useState({
    name: '',
    country: '',
    founded: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam({ ...team, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await axios.post('https://your-api-url.com/dev/team', team, {
        headers: { 'Content-Type': 'application/json' },
      })
      setMessage('✅ Team added successfully!')
      setTeam({ name: '', country: '', founded: '' })
    } catch (error) {
      console.error(error)
      setMessage('❌ Failed to add team. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🏟️ Add New Team</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Team Name"
          value={team.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={team.country}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="number"
          name="founded"
          placeholder="Founded Year"
          value={team.founded}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Team'}
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  )
}

export default AddTeam
