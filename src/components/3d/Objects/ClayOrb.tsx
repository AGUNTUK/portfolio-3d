'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useThemeStore, useSceneStore } from '@/store/useStore'
import * as THREE from 'three'

interface ClayOrbProps {
    position?: [number, number, number]
    scale?: number
    color?: string
    speed?: number
    floatAmplitude?: number
    id?: string
    onClick?: () => void
}

export default function ClayOrb({
    position = [0, 0, 0],
    scale = 1,
    color,
    speed = 1,
    floatAmplitude = 0.3,
    id = 'orb',
    onClick,
}: ClayOrbProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const isDark = useThemeStore((state) => state.isDark)
    const setHoveredObject = useSceneStore((state) => state.setHoveredObject)

    const orbColor = color || '#6366f1'
    const highlightColor = '#a78bfa'

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime() * speed

        // Floating animation
        meshRef.current.position.y = position[1] + Math.sin(time) * floatAmplitude
        meshRef.current.position.x = position[0] + Math.cos(time * 0.5) * floatAmplitude * 0.5

        // Rotation
        meshRef.current.rotation.x = time * 0.2
        meshRef.current.rotation.y = time * 0.3

        // Scale on hover
        const targetScale = hovered ? scale * 1.2 : scale
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        )
    })

    const handlePointerOver = () => {
        setHovered(true)
        setHoveredObject(id)
        document.body.style.cursor = 'pointer'
    }

    const handlePointerOut = () => {
        setHovered(false)
        setHoveredObject(null)
        document.body.style.cursor = 'auto'
    }

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={onClick}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color={hovered ? highlightColor : orbColor}
                metalness={0.1}
                roughness={0.6}
                envMapIntensity={0.8}
            />
            {/* Inner glow effect */}
            <mesh scale={0.95}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color={orbColor}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </mesh>
    )
}