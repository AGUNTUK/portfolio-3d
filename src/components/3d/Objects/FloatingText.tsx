'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import { useThemeStore } from '@/store/useStore'
import * as THREE from 'three'

interface FloatingTextProps {
    text: string
    position?: [number, number, number]
    fontSize?: number
    color?: string
    font?: string
}

export default function FloatingText({
    text,
    position = [0, 0, 0],
    fontSize = 1,
    color,
    font = '/fonts/inter-bold.json',
}: FloatingTextProps) {
    const meshRef = useRef<THREE.Group>(null)
    const isDark = useThemeStore((state) => state.isDark)

    const textColor = color || (isDark ? '#c9ada7' : '#4a4e69')

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime()

        // Gentle floating animation
        meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1

        // Subtle rotation
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
    })

    return (
        <group ref={meshRef} position={position}>
            <Center>
                <Text3D
                    font={font}
                    size={fontSize}
                    height={fontSize * 0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={fontSize * 0.02}
                    bevelSize={fontSize * 0.01}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {text}
                    <meshStandardMaterial
                        color={textColor}
                        metalness={0.1}
                        roughness={0.8}
                        envMapIntensity={0.5}
                    />
                </Text3D>
            </Center>
        </group>
    )
}