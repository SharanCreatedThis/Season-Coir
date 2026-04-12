"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useScroll, useTransform, motion } from "framer-motion";
import * as THREE from "three";
import { Float, ContactShadows, Environment, useGLTF } from "@react-three/drei";

// ─────────────────────────────────────────────────────────
// CONFIG & CONSTANTS
// ─────────────────────────────────────────────────────────
const MODEL_PATH = "/models/coconut_low_poly.glb";
const FALLBACK_COLOR = "#8B4513";
const MODEL_SCALE = 0.50; // Calibrated for focal length

// ─────────────────────────────────────────────────────────
// COCONUT MODEL COMPONENT
// ─────────────────────────────────────────────────────────
function Coconut() {
  const modelRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  // ── Physics-based Rotation & Movement ──
  useFrame((state) => {
    if (!modelRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollVal = scrollYProgress.get();

    modelRef.current.rotation.z = Math.sin(time * 0.6) * 0.4;
    modelRef.current.rotation.x = Math.sin(time * 0.4) * 0.2;
    modelRef.current.rotation.y += 0.005; 
    modelRef.current.position.y = Math.sin(time * 0.8) * 0.15;
  });

  // ── Scroll-Linked Transforms ──
  const xPos = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1.5, -2, 2, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [MODEL_SCALE, MODEL_SCALE * 1.2, MODEL_SCALE * 0.9]);
  const xRot = useTransform(scrollYProgress, [0.15, 0.37], [0, Math.PI * 0.45]);

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.position.x = xPos.get();
    modelRef.current.scale.setScalar(scale.get());
    modelRef.current.rotation.x = xRot.get();
  });

  return (
    <group ref={modelRef}>
      {/* 
        High-Quality Procedural Coconut 
        We use layered meshes to simulate the husk and shell 
      */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#3D1C02" 
          roughness={0.9} 
          metalness={0.0}
          flatShading={false}
        />
      </mesh>
      
      {/* Outer "Hair" / Husk layer */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#8B4513" 
          transparent 
          opacity={0.4} 
          wireframe 
          roughness={1}
        />
      </mesh>

      {/* The three legendary 'eyes' of the coconut */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * 2.1) * 0.4, 
            0.8, 
            Math.sin(i * 2.1) * 0.4
          ]}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#211001" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────
export default function CoconutScrollEffect() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ 
        zIndex: 5, 
        opacity,
        // Viewport Mask — prevents sharp edges at top/bottom of screen
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="forest" />
        
        <React.Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Coconut />
          </Float>
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.3} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </React.Suspense>
      </Canvas>
    </motion.div>
  );
}
