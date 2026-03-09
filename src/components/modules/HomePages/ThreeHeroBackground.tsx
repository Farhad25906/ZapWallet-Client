"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
    const ref = useRef<THREE.Points>(null!);

    // Create random positions for particles
    const particles = useMemo(() => {
        const temp = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            // Spread particles in a wide area
            temp[i * 3] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return temp;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Gentle rotation and movement
        ref.current.rotation.y = t * 0.05;
        ref.current.rotation.x = t * 0.03;

        // Mouse parallax effect
        const { x, y } = state.mouse;
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.5, 0.1);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.5, 0.1);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#009689"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

const ThreeHeroBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-[#ffd8af]/10 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <ParticleField />
            </Canvas>
            {/* Decorative Blur Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#009689]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ffd8af]/20 rounded-full blur-[120px] animate-pulse" />
        </div>
    );
};

export default ThreeHeroBackground;
