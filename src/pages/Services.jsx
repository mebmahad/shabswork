import React from 'react'
import { Building, Box, Image, Video, CuboidIcon as Cube, PenTool } from 'lucide-react'

const services = [
  {
    title: "Architectural Visualization",
    description: "Transform your architectural designs into stunning 3D visualizations.",
    icon: <Building className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Product Visualization",
    description: "Showcase your products with photorealistic 3D renders.",
    icon: <Box className="w-12 h-12 text-blue-500" />
  },
  {
    title: "3D Rendering",
    description: "Create high-quality, photorealistic 3D renders for any project.",
    icon: <Image className="w-12 h-12 text-blue-500" />
  },
  {
    title: "3D Animation",
    description: "Bring your designs to life with captivating 3D animations.",
    icon: <Video className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Virtual Reality (VR)",
    description: "Immerse your clients in virtual environments of your designs.",
    icon: <Cube className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Concept Design",
    description: "Develop and visualize innovative concept designs for your projects.",
    icon: <PenTool className="w-12 h-12 text-blue-500" />
  }
]

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            {service.icon}
            <h2 className="text-xl font-semibold mt-4 mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

