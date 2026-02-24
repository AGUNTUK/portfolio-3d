'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMouseStore, useThemeStore } from '@/store/useStore'
import * as THREE from 'three'

interface ParticlesProps {
    count?: number
    size?: number
}

// Hook to detect device performance
function useDevicePerformance() {
    const [deviceInfo, setDeviceInfo] = useState({
        isMobile: false,
        particleMultiplier: 1,
    })

    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) || window.innerWidth < 768

        const isLowPerformance = navigator.hardwareConcurrency
            ? navigator.hardwareConcurrency < 4
            : false

        setDeviceInfo({
            isMobile,
            particleMultiplier: isMobile ? 0.3 : isLowPerformance ? 0.6 : 1,
        })
    }, [])

    return deviceInfo
}

export default function Particles({ count = 500, size = 0.02 }: ParticlesProps) {
    const meshRef = useRef<THREE.Points>(null)
    const mouse = useMouseStore((state) => ({ x: state.normalizedX, y: state.normalizedY }))
    const isDark = useThemeStore((state) => state.isDark)
    const { isMobile, particleMultiplier } = useDevicePerformance()
    const frameCount = useRef(0)

    // Adjust particle count based on device performance
    const adjustedCount = Math.floor(count * particleMultiplier)

    const { positions, colors, scales } = useMemo(() => {
        const positions = new Float32Array(adjustedCount * 3)
        const colors = new Float32Array(adjustedCount * 3)
        const scales = new Float32Array(adjustedCount)

        const colorPalette = [
            new THREE.Color('#6366f1'),
            new THREE.Color('#a78bfa'),
            new THREE.Color('#38bdf8'),
            new THREE.Color('#22d3ee'),
            new THREE.Color('#f472b6'),
        ]

        for (let i = 0; i < adjustedCount; i++) {
            // Position - spread in a large sphere
            const radius = 15 + Math.random() * 20
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            // Color - random from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
            colors[i * 3] = color.r
            colors[i * 3 + 1] = color.g
            colors[i * 3 + 2] = color.b

            // Scale
            scales[i] = Math.random() * 0.5 + 0.5
        }

        return { positions, colors, scales }
    }, [adjustedCount])

    // Reduce animation complexity on mobile
    const animationInterval = isMobile ? 3 : 1

    useFrame((state) => {
        if (!meshRef.current) return

        frameCount.current++

        // Skip frames on mobile for better performance
        if (frameCount.current % animationInterval !== 0) return

        const time = state.clock.getElapsedTime()

        // Simplified animation on mobile
        if (!isMobile) {
            const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < adjustedCount; i++) {
                const i3 = i * 3

                // Gentle floating motion
                positionArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.001

                // Mouse attraction (subtle)
                const dx = mouse.x * 2 - positionArray[i3]
                const dy = mouse.y * 2 - positionArray[i3 + 1]
                positionArray[i3] += dx * 0.0001
                positionArray[i3 + 1] += dy * 0.0001
            }

            meshRef.current.geometry.attributes.position.needsUpdate = true
        }

        // Slow rotation (always enabled)
        meshRef.current.rotation.y = time * 0.02
        meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={adjustedCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={adjustedCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}