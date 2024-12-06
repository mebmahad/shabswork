import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6">
        <p>Welcome, {user.name}!</p>
      </div>
      <div className="space-y-4">
        <Link to="/admin/portfolio/manage">
          <Button>Manage Portfolio</Button>
        </Link>
        <Button onClick={logout} variant="outline">
          Log Out
        </Button>
      </div>
    </div>
  )
}

