import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { databases, storage } from '../lib/appwrite'
import { ID } from 'appwrite'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

export default function ManagePortfolio() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [portfolioItems, setPortfolioItems] = useState([])
  const [newItem, setNewItem] = useState({ title: '', description: '', image: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    } else {
      fetchPortfolioItems()
    }
  }, [user, navigate])

  async function fetchPortfolioItems() {
    try {
      const response = await databases.listDocuments('67457c70002f923c6910', '67505b230016daaba32c')
      setPortfolioItems(response.documents)
    } catch (error) {
      console.error('Error fetching portfolio items', error)
      setError('Failed to fetch portfolio items')
    }
  }

  async function handleAddItem(e) {
    e.preventDefault()
    if (!newItem.image) {
      setError('Please select an image')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Upload image
      const uploadedFile = await storage.createFile('66f7c712000e2a0431e9', ID.unique(), newItem.image)

      // Create portfolio item
      await databases.createDocument('67457c70002f923c6910', '67505b230016daaba32c', ID.unique(), {
        title: newItem.title,
        description: newItem.description,
        imageId: uploadedFile.$id,
      })

      // Reset form and refresh list
      setNewItem({ title: '', description: '', image: null })
      fetchPortfolioItems()
    } catch (error) {
      console.error('Error adding portfolio item', error)
      setError('Failed to add portfolio item')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteItem(id, imageId) {
    try {
      await databases.deleteDocument('67457c70002f923c6910', '67505b230016daaba32c', id)
      await storage.deleteFile('66f7c712000e2a0431e9', imageId)
      fetchPortfolioItems()
    } catch (error) {
      console.error('Error deleting portfolio item', error)
      setError('Failed to delete portfolio item')
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Manage Portfolio</h1>

      <form onSubmit={handleAddItem} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter product title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setNewItem({ ...newItem, image: e.target.files?.[0] || null })}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Item'}
          </Button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">Current Portfolio Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioItems.map((item) => (
          <div key={item.$id} className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <img
              src={storage.getFileView('66f7c712000e2a0431e9', item.imageId)}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <Button
              onClick={() => handleDeleteItem(item.$id, item.imageId)}
              variant="destructive"
              className="mt-2"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

