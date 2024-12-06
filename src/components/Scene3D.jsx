import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Plane, Text, Edges } from '@react-three/drei'

function ColorfulBuilding(props) {
  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.2
  })

  return (
    <group {...props} ref={mesh}>
      <Box args={[3, 4, 3]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#FF6B6B" />
        <Edges color="#4ECDC4" threshold={15} />
      </Box>
      <Sphere args={[0.5, 32, 32]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#FFD93D" />
        <Edges color="#FF6B6B" threshold={15} />
      </Sphere>
      <Box args={[4, 0.5, 4]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#6BCB77" />
      </Box>
    </group>
  )
}

function Ground() {
  return (
    <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <meshStandardMaterial color="#F0F0F0" />
    </Plane>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />
      <ColorfulBuilding position={[0, 0, 0]} />
      <Ground />
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
      <Text
        position={[0, 6, 0]}
        fontSize={1}
        color="#4A4E69"
        anchorX="center"
        anchorY="middle"
      >
        Saif 3D
      </Text>
    </Canvas>
  )
}

