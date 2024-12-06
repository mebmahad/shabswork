import React, { useEffect, useState } from 'react'
import { databases, storage } from '../lib/appwrite'
import Slider from 'react-slick'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRight className="w-8 h-8 text-white" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronLeft className="w-8 h-8 text-white" />
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  async function fetchPortfolioItems() {
    try {
      const response = await databases.listDocuments('67457c70002f923c6910', '67505b230016daaba32c')
      setProjects(response.documents)
    } catch (error) {
      console.error('Error fetching portfolio items', error)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div style={{ bottom: "10px" }}>
        <ul className="m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-4 h-4 mx-1 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity duration-200"></div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Portfolio</h1>
      <div className="relative">
        <Slider {...settings} className="overflow-hidden">
          {projects.map((project) => (
            <div key={project.$id} className="px-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-96">
                  <img
                    src={storage.getFileView('66f7c712000e2a0431e9', project.imageId)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-200">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

