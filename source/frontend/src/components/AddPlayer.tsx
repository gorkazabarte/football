import { useState } from 'react'
import axios from 'axios'

const AddPlayer = () => {
  const [player, setPlayer] = useState({
    name: '',
    position: '',
    nationality: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await axios.post('https://ysvadm2b2a.execute-api.us-west-2.amazonaws.com/dev/player', player, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setMessage('✅ Player added successfully!')
      setPlayer({ name: '', position: '', nationality: '' })
    } catch (error) {
      console.error(error)
      setMessage('❌ Failed to add player. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">➕ Add New Player</h1>
      {message && <p className="mb-4 text-center text-sm text-blue-600 dark:text-blue-400">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Player Name" value={player.name} onChange={handleChange} required className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"/>
        <input type="text" name="position" placeholder="Position" value={player.position} onChange={handleChange} required className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"/>
        <select name="nationality" value={player.nationality} onChange={handleChange} required className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="">Select Nationality</option>
          <option value="USA">USA</option>
          <option value="France">France</option>
          <option value="Brazil">Brazil</option>
          <option value="Japan">Japan</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Adding...' : 'Add Player'}
        </button>
      </form>
    </div>
  )
}

export default AddPlayer
