'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useThemeStore, useSceneStore } from '@/store/useStore'
import * as THREE from 'three'

interface InteractiveOrbProps {
    position?: [number, number, number]
    radius?: number
    color?: string
    id?: string
    onClick?: () => void
}

export default function InteractiveOrb({
    position = [0, 0, 0],
    radius = 0.5,
    color,
    id = 'interactive-orb',
    onClick,
}: InteractiveOrbProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const isDark = useThemeStore((state) => state.isDark)
    const setHoveredObject = useSceneStore((state) => state.setHoveredObject)

    // Physics body
    const [sphereRef, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [radius],
        onCollide: () => {
            // Add collision sound/effect here
        },
    }))

    const orbColor = color || (isDark ? '#4a4e69' : '#c9ada7')
    const highlightColor = isDark ? '#c9ada7' : '#ffffff'

    useFrame((state) => {
        if (!meshRef.current) return

        // Scale on hover
        const targetScale = hovered ? 1.2 : 1
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        )
    })

    const handlePointerOver = () => {
        setHovered(true)
        setHoveredObject(id)
        document.body.style.cursor = 'grab'
    }

    const handlePointerOut = () => {
        setHovered(false)
        setHoveredObject(null)
        document.body.style.cursor = 'auto'
    }

    const handlePointerDown = () => {
        document.body.style.cursor = 'grabbing'
    }

    const handlePointerUp = () => {
        document.body.style.cursor = 'grab'
    }

    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onClick={onClick}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial
                color={hovered ? highlightColor : orbColor}
                metalness={0.1}
                roughness={0.6}
                envMapIntensity={0.8}
            />
            {/* Inner glow effect */}
            <mesh scale={0.95}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshBasicMaterial
                    color={orbColor}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </mesh>
    )
}
