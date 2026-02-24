'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import { useThemeStore } from '@/store/useStore'
import * as THREE from 'three'

interface SkillOrbProps {
    position: [number, number, number]
    skill: string
    level: number
    color: string
    index: number
}

function SkillOrb({ position, skill, level, color, index }: SkillOrbProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const isDark = useThemeStore((state) => state.isDark)
    const [hovered, setHovered] = useState(false)

    const size = 0.3 + (level / 100) * 0.4

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime()
        const offset = index * 0.5

        // Floating animation
        meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.1

        // Rotation
        meshRef.current.rotation.x = time * 0.2
        meshRef.current.rotation.y = time * 0.3

        // Scale on hover
        const targetScale = hovered ? 1.3 : 1
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        )
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial
                        color={hovered ? '#ffffff' : color}
                        metalness={0.2}
                        roughness={0.5}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.5 : 0.1}
                    />
                </mesh>
                <Text
                    position={[0, -size - 0.2, 0]}
                    fontSize={0.15}
                    color={isDark ? '#c9ada7' : '#4a4e69'}
                    anchorX="center"
                    anchorY="top"
                >
                    {skill}
                </Text>
            </group>
        </Float>
    )
}

// We need to import useState
import { useState } from 'react'

interface SkillOrbsProps {
    skills?: { name: string; level: number }[]
}

const defaultSkills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'Three.js', level: 80 },
    { name: 'UI/UX', level: 85 },
]

const colors = ['#e8b4b8', '#a8dadc', '#a7c4a0', '#c9b1ff', '#f4a261', '#e76f51']

export default function SkillOrbs({ skills = defaultSkills }: SkillOrbsProps) {
    const groupRef = useRef<THREE.Group>(null)

    // Arrange skills in a circle
    const positions = useMemo(() => {
        return skills.map((_, index) => {
            const angle = (index / skills.length) * Math.PI * 2
            const radius = 3
            return [
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius,
            ] as [number, number, number]
        })
    }, [skills])

    useFrame((state) => {
        if (!groupRef.current) return
        const time = state.clock.getElapsedTime()
        groupRef.current.rotation.y = time * 0.1
    })

    return (
        <group ref={groupRef}>
            {skills.map((skill, index) => (
                <SkillOrb
                    key={skill.name}
                    position={positions[index]}
                    skill={skill.name}
                    level={skill.level}
                    color={colors[index % colors.length]}
                    index={index}
                />
            ))}
        </group>
    )
}
