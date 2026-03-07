"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function makeRedCrabTexture(svgUrl: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const size = 128;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "#C41E3A";
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.15;
      ctx.drawImage(img, 0, 0, size, size);
      resolve(new THREE.CanvasTexture(canvas));
    };
    img.onerror = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#C41E3A";
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();
      resolve(new THREE.CanvasTexture(canvas));
    };
    img.src = svgUrl;
  });
}

const TOTAL = 110;
// How long to reveal all crabs (ms)
const REVEAL_DURATION = 3200;

function CrabParticles({ texture }: { texture: THREE.CanvasTexture | null }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  // Track how many crabs are visible
  const revealed = useRef(0);
  const startTime = useRef<number | null>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(TOTAL * 3);
    for (let i = 0; i < TOTAL; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.pow(Math.random(), 0.5) * 6.5;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return pos;
  }, []);

  const { gl } = useThree();
  useMemo(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [gl]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();

    // Slow drift rotation
    mesh.current.rotation.y = t * 0.03 + mouse.current.x * 0.12;
    mesh.current.rotation.x = Math.sin(t * 0.018) * 0.08 + mouse.current.y * 0.08;

    // Sequential reveal via drawRange
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;
    const elapsed = (state.clock.elapsedTime - startTime.current) * 1000;
    const target = Math.min(TOTAL, Math.floor((elapsed / REVEAL_DURATION) * TOTAL));
    if (target > revealed.current) {
      revealed.current = target;
      mesh.current.geometry.setDrawRange(0, revealed.current);
    }
  });

  const material = useMemo(() => {
    if (!texture) {
      return new THREE.PointsMaterial({
        color: "#C41E3A",
        size: 0.3,
        transparent: true,
        opacity: 0.38,
        sizeAttenuation: true,
        depthWrite: false,
      });
    }
    return new THREE.PointsMaterial({
      map: texture,
      size: 0.32,
      transparent: true,
      opacity: 0.21,
      sizeAttenuation: true,
      depthWrite: false,
      alphaTest: 0.01,
    });
  }, [texture]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    // Start with nothing visible
    geo.setDrawRange(0, 0);
    return geo;
  }, [positions]);

  return <points ref={mesh} geometry={geometry} material={material} />;
}

function GlowOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.06);
  });
  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial color="#C41E3A" transparent opacity={0.04} side={THREE.BackSide} />
    </mesh>
  );
}

function Scene() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    makeRedCrabTexture("/openclaw-crab.svg").then(setTexture);
  }, []);
  return (
    <>
      <CrabParticles texture={texture} />
      <GlowOrb />
    </>
  );
}

export function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
