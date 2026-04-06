"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ─── */
interface Panda3DProps {
  phaseType: "inhale" | "hold-in" | "exhale" | "hold-out";
  duration: number;
  running: boolean;
}

/* ─── Helpers ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ═══════════════════════════════════════════════════
   PANDA BODY — all the 3D magic
═══════════════════════════════════════════════════ */
function PandaBody({ phaseType, running }: { phaseType: string; duration: number; running: boolean }) {
  const bellyRef = useRef<THREE.Mesh>(null!);
  const bellyOuterRef = useRef<THREE.Mesh>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const leftCheekRef = useRef<THREE.Mesh>(null!);
  const rightCheekRef = useRef<THREE.Mesh>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);
  const leftEyeRef = useRef<THREE.Mesh>(null!);
  const rightEyeRef = useRef<THREE.Mesh>(null!);
  const bodyRef = useRef<THREE.Group>(null!);

  // Target values based on phase
  const targets = useMemo(() => ({
    inhale: { bellyScale: [1.45, 1.35, 1.5] as [number, number, number], cheekScale: 1.0, cheekColor: "#FFB8B8", bodyY: 0.08, mouthScaleY: 1.4, eyeScaleY: 1.1 },
    "hold-in": { bellyScale: [1.45, 1.35, 1.5] as [number, number, number], cheekScale: 1.6, cheekColor: "#FF7777", bodyY: 0.04, mouthScaleY: 0.3, eyeScaleY: 0.3 },
    exhale: { bellyScale: [0.75, 0.8, 0.7] as [number, number, number], cheekScale: 0.8, cheekColor: "#FFD0D0", bodyY: -0.06, mouthScaleY: 0.5, eyeScaleY: 0.15 },
    "hold-out": { bellyScale: [1.0, 1.0, 1.0] as [number, number, number], cheekScale: 1.0, cheekColor: "#FFD0D0", bodyY: 0, mouthScaleY: 0.7, eyeScaleY: 1.0 },
  }), []);

  const currentTarget = useRef(targets["hold-out"]);

  useFrame((_, delta) => {
    const t = running ? targets[phaseType as keyof typeof targets] : targets["hold-out"];
    currentTarget.current = t;
    const speed = 2.5 * delta;

    // Belly inflate/deflate — the hero animation
    if (bellyRef.current) {
      bellyRef.current.scale.x = lerp(bellyRef.current.scale.x, t.bellyScale[0], speed);
      bellyRef.current.scale.y = lerp(bellyRef.current.scale.y, t.bellyScale[1], speed);
      bellyRef.current.scale.z = lerp(bellyRef.current.scale.z, t.bellyScale[2], speed);
    }
    if (bellyOuterRef.current) {
      bellyOuterRef.current.scale.x = lerp(bellyOuterRef.current.scale.x, t.bellyScale[0] * 1.05, speed);
      bellyOuterRef.current.scale.y = lerp(bellyOuterRef.current.scale.y, t.bellyScale[1] * 1.05, speed);
      bellyOuterRef.current.scale.z = lerp(bellyOuterRef.current.scale.z, t.bellyScale[2] * 1.05, speed);
    }

    // Body bounce
    if (bodyRef.current) {
      bodyRef.current.position.y = lerp(bodyRef.current.position.y, t.bodyY, speed);
    }

    // Cheeks puff
    if (leftCheekRef.current && rightCheekRef.current) {
      const cs = lerp(leftCheekRef.current.scale.x, t.cheekScale, speed);
      leftCheekRef.current.scale.set(cs, cs, cs);
      rightCheekRef.current.scale.set(cs, cs, cs);
      const col = new THREE.Color(t.cheekColor);
      (leftCheekRef.current.material as THREE.MeshStandardMaterial).color.lerp(col, speed * 2);
      (rightCheekRef.current.material as THREE.MeshStandardMaterial).color.lerp(col, speed * 2);
    }

    // Mouth
    if (mouthRef.current) {
      mouthRef.current.scale.y = lerp(mouthRef.current.scale.y, t.mouthScaleY, speed);
    }

    // Eyes squint
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = lerp(leftEyeRef.current.scale.y, t.eyeScaleY, speed);
      rightEyeRef.current.scale.y = lerp(rightEyeRef.current.scale.y, t.eyeScaleY, speed);
    }

    // Head gentle tilt
    if (headRef.current) {
      const tiltZ = phaseType === "inhale" ? 0.05 : phaseType === "exhale" ? -0.05 : 0;
      headRef.current.rotation.z = lerp(headRef.current.rotation.z, tiltZ, speed);
    }
  });

  const isExhale = running && phaseType === "exhale";
  const isHold = running && phaseType === "hold-in";

  return (
    <group ref={bodyRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[0, -0.3, 0]}>
          {/* ── BODY (dark) ── */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.95, 64, 64]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
          </mesh>

          {/* ── BELLY (white, animated, 3D distort!) ── */}
          <mesh ref={bellyOuterRef} position={[0, -0.05, 0.55]}>
            <sphereGeometry args={[0.65, 64, 64]} />
            <meshStandardMaterial color="#f5f0ea" roughness={0.9} transparent opacity={0.3} />
          </mesh>
          <mesh ref={bellyRef} position={[0, -0.05, 0.55]}>
            <sphereGeometry args={[0.6, 64, 64]} />
            <MeshDistortMaterial
              color="#FFFFFF"
              roughness={0.6}
              metalness={0.05}
              distort={running ? 0.15 : 0.05}
              speed={running ? 3 : 1}
            />
          </mesh>

          {/* ── ARMS ── */}
          {/* Left arm */}
          <mesh position={[-0.85, 0.1, 0.2]} rotation={[0, 0, 0.4]}>
            <capsuleGeometry args={[0.22, 0.5, 16, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
          </mesh>
          {/* Left paw pad */}
          <mesh position={[-1.05, -0.15, 0.35]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#FFB0B0" roughness={0.7} />
          </mesh>
          {/* Right arm */}
          <mesh position={[0.85, 0.1, 0.2]} rotation={[0, 0, -0.4]}>
            <capsuleGeometry args={[0.22, 0.5, 16, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
          </mesh>
          {/* Right paw pad */}
          <mesh position={[1.05, -0.15, 0.35]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#FFB0B0" roughness={0.7} />
          </mesh>

          {/* ── LEGS ── */}
          <mesh position={[-0.45, -0.85, 0.3]} rotation={[0.3, 0, 0]}>
            <capsuleGeometry args={[0.24, 0.35, 16, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
          </mesh>
          <mesh position={[0.45, -0.85, 0.3]} rotation={[0.3, 0, 0]}>
            <capsuleGeometry args={[0.24, 0.35, 16, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
          </mesh>
          {/* Foot pads */}
          <mesh position={[-0.45, -1.1, 0.45]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#FFB0B0" roughness={0.7} />
          </mesh>
          <mesh position={[0.45, -1.1, 0.45]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#FFB0B0" roughness={0.7} />
          </mesh>

          {/* ── HEAD ── */}
          <group ref={headRef} position={[0, 1.05, 0.15]}>
            {/* Head sphere */}
            <mesh>
              <sphereGeometry args={[0.72, 64, 64]} />
              <meshStandardMaterial color="#f8f4f0" roughness={0.75} />
            </mesh>

            {/* ── EARS ── */}
            <mesh position={[-0.52, 0.52, -0.1]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
            </mesh>
            <mesh position={[-0.52, 0.52, -0.05]}>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color="#FFB0B0" roughness={0.7} />
            </mesh>
            <mesh position={[0.52, 0.52, -0.1]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
            </mesh>
            <mesh position={[0.52, 0.52, -0.05]}>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color="#FFB0B0" roughness={0.7} />
            </mesh>

            {/* ── EYE PATCHES (dark) ── */}
            <mesh position={[-0.25, 0.08, 0.55]} rotation={[0, -0.15, -0.15]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
            </mesh>
            <mesh position={[0.25, 0.08, 0.55]} rotation={[0, 0.15, 0.15]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
            </mesh>

            {/* ── EYES (white + pupil) ── */}
            <group>
              <mesh ref={leftEyeRef} position={[-0.25, 0.1, 0.65]}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[-0.25, 0.1, 0.73]}>
                <sphereGeometry args={[0.055, 32, 32]} />
                <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.3} />
              </mesh>
              {/* Eye highlight */}
              <mesh position={[-0.28, 0.13, 0.76]}>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
              </mesh>
            </group>
            <group>
              <mesh ref={rightEyeRef} position={[0.25, 0.1, 0.65]}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[0.25, 0.1, 0.73]}>
                <sphereGeometry args={[0.055, 32, 32]} />
                <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.3} />
              </mesh>
              <mesh position={[0.22, 0.13, 0.76]}>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
              </mesh>
            </group>

            {/* ── NOSE ── */}
            <mesh position={[0, -0.08, 0.7]}>
              <sphereGeometry args={[0.09, 32, 32]} />
              <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Nose shine */}
            <mesh position={[-0.02, -0.05, 0.78]}>
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshStandardMaterial color="#555555" emissive="#444444" emissiveIntensity={0.3} />
            </mesh>

            {/* ── CHEEKS (animated blush) ── */}
            <mesh ref={leftCheekRef} position={[-0.42, -0.08, 0.48]}>
              <sphereGeometry args={[0.14, 32, 32]} />
              <meshStandardMaterial color="#FFD0D0" transparent opacity={0.7} roughness={0.8} />
            </mesh>
            <mesh ref={rightCheekRef} position={[0.42, -0.08, 0.48]}>
              <sphereGeometry args={[0.14, 32, 32]} />
              <meshStandardMaterial color="#FFD0D0" transparent opacity={0.7} roughness={0.8} />
            </mesh>

            {/* ── MOUTH ── */}
            <mesh ref={mouthRef} position={[0, -0.2, 0.68]}>
              <sphereGeometry args={[0.07, 32, 32]} />
              <meshStandardMaterial color="#FF8888" roughness={0.6} />
            </mesh>
          </group>

          {/* ═══ SPARKLES on exhale ═══ */}
          {isExhale && (
            <>
              <Sparkles
                count={60}
                scale={[4, 4, 4]}
                size={6}
                speed={2}
                color="#FFD700"
                opacity={0.9}
              />
              <Sparkles
                count={30}
                scale={[3, 3, 3]}
                size={4}
                speed={3}
                color="#FFA500"
                opacity={0.7}
              />
              <Sparkles
                count={20}
                scale={[5, 5, 5]}
                size={8}
                speed={1.5}
                color="#FFE44D"
                opacity={0.6}
              />
              {/* Glow ring */}
              <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.2, 0.03, 16, 100]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} transparent opacity={0.4} />
              </mesh>
            </>
          )}

          {/* ═══ Hold-in pressure glow ═══ */}
          {isHold && (
            <>
              <mesh position={[0, 0.5, 0.5]}>
                <sphereGeometry args={[1.3, 32, 32]} />
                <meshStandardMaterial color="#FF8888" transparent opacity={0.08} />
              </mesh>
              <Sparkles
                count={15}
                scale={[2, 2, 2]}
                size={3}
                speed={0.5}
                color="#FF9999"
                opacity={0.5}
              />
            </>
          )}
        </group>
      </Float>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT — Canvas wrapper
═══════════════════════════════════════════════════ */
export default function Panda3D({ phaseType, duration, running }: Panda3DProps) {
  return (
    <div style={{ width: 320, height: 380, borderRadius: 20, overflow: "hidden", background: "linear-gradient(180deg, #E8F4F6 0%, #FEF4F1 50%, #F5EDD5 100%)" }}>
      <Canvas
        camera={{ position: [0, 0.3, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 5]} intensity={1.2} color="#FFF5E6" castShadow />
        <directionalLight position={[-3, 3, 2]} intensity={0.4} color="#E8E0FF" />
        <pointLight position={[0, -1, 3]} intensity={0.5} color="#FFE0C0" />

        <Environment preset="sunset" environmentIntensity={0.3} />

        <PandaBody phaseType={phaseType} duration={duration} running={running} />
      </Canvas>
    </div>
  );
}
