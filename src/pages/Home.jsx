import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Scene3D from '../components/Scene3D'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Saif 3D</h1>
        <p className="text-xl text-gray-600 mb-8">Bringing your architectural visions to life with stunning 3D visualizations</p>
        <Link to="/portfolio">
          <Button size="lg">View Our Portfolio</Button>
        </Link>
      </div>
      <div className="h-[500px] mb-12 rounded-lg overflow-hidden shadow-xl">
        <Scene3D />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Photorealistic Renders</h3>
          <p className="text-gray-600">Create stunning, lifelike images of your architectural designs</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">3D Modeling</h3>
          <p className="text-gray-600">Transform your 2D plans into detailed 3D models</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Virtual Tours</h3>
          <p className="text-gray-600">Immersive virtual walkthroughs of your projects</p>
        </div>
      </div>
    </div>
  )
}

