'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMouseStore } from '@/store/useStore'
import * as THREE from 'three'

export default function Lights() {
    const lightRef = useRef<THREE.PointLight>(null)
    const ambientLightRef = useRef<THREE.AmbientLight>(null)
    const mouse = useMouseStore((state) => ({ x: state.normalizedX, y: state.normalizedY }))

    useFrame(() => {
        if (lightRef.current) {
            // Smoothly follow mouse position
            lightRef.current.position.x = THREE.MathUtils.lerp(
                lightRef.current.position.x,
                mouse.x * 5,
                0.05
            )
            lightRef.current.position.y = THREE.MathUtils.lerp(
                lightRef.current.position.y,
                mouse.y * 5,
                0.05
            )
        }
    })

    return (
        <>
            {/* Ambient light for base illumination */}
            <ambientLight
                ref={ambientLightRef}
                intensity={0.3}
                color="#1e1e2e"
            />

            {/* Main directional light */}
            <directionalLight
                position={[10, 10, 5]}
                intensity={0.6}
                color="#ffffff"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Mouse-following point light */}
            <pointLight
                ref={lightRef}
                position={[0, 0, 5]}
                intensity={1.5}
                color="#a78bfa"
                distance={20}
                decay={2}
            />

            {/* Accent lights */}
            <pointLight
                position={[-5, 5, -5]}
                intensity={0.5}
                color="#38bdf8"
                distance={15}
            />
            <pointLight
                position={[5, -5, -5]}
                intensity={0.5}
                color="#f472b6"
                distance={15}
            />

            {/* Rim light for depth */}
            <pointLight
                position={[0, 0, -10]}
                intensity={0.4}
                color="#22d3ee"
                distance={20}
            />
        </>
    )
}