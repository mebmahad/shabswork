import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Saif 3D
        </Link>
        <div className="flex space-x-4">
          <Link to="/portfolio">
            <Button variant="ghost">Portfolio</Button>
          </Link>
          <Link to="/services">
            <Button variant="ghost">Services</Button>
          </Link>
          <Link to="/contact">
            <Button variant="primary">Contact Us</Button>
          </Link>
          {user && (
            <>
              <Link to="/admin/dashboard">
                <Button variant="outline">Admin Dashboard</Button>
              </Link>
              <Link to="/admin/portfolio/manage">
                <Button variant="outline">Manage Portfolio</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

