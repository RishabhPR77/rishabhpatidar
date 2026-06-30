import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial, Stars, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function useScrollProgress() {
  const ref = useRef(0);
  useFrame(() => {
    const el = document.getElementById("scroll-root");
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    ref.current = max > 0 ? el.scrollTop / max : 0;
  });
  return ref;
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const r = 6 + Math.random() * 18;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  useFrame((_, d) => {
    ref.current.rotation.y += d * 0.04;
    ref.current.rotation.x += d * 0.012;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#00d4ff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  );
}

function MorphingBlob({ progress, mouse }: { progress: React.MutableRefObject<number>; mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null!);
  useFrame((state) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    const m = mouse.current;
    ref.current.position.x = THREE.MathUtils.lerp(-2.8, 2.8, p) + m.x * 0.6;
    ref.current.position.y = Math.sin(p * Math.PI * 2) * 1.4 + m.y * 0.4;
    ref.current.rotation.y = t * 0.3 + p * Math.PI * 4;
    ref.current.rotation.x = t * 0.2;
    const s = 1.4 + Math.sin(p * Math.PI) * 0.5;
    ref.current.scale.setScalar(s);
    if (matRef.current) {
      matRef.current.distort = 0.4 + Math.sin(t * 0.8) * 0.18 + p * 0.25;
      matRef.current.color.setHSL((0.5 + p * 0.4) % 1, 0.9, 0.55);
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial ref={matRef} color="#00d4ff" speed={2.5} distort={0.5} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

function NeuralNetwork({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const layers = [5, 8, 8, 6, 3];
  const spacing = 1.6;
  const nodes = useMemo(() => {
    const out: { pos: THREE.Vector3; layer: number }[] = [];
    layers.forEach((count, li) => {
      const x = (li - (layers.length - 1) / 2) * spacing;
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.7;
        out.push({ pos: new THREE.Vector3(x, y, 0), layer: li });
      }
    });
    return out;
  }, []);
  const edges = useMemo(() => {
    const segs: number[] = [];
    let cursor = 0;
    for (let li = 0; li < layers.length - 1; li++) {
      const a = layers[li], b = layers[li + 1];
      for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
          const A = nodes[cursor + i].pos;
          const B = nodes[cursor + a + j].pos;
          segs.push(A.x, A.y, A.z, B.x, B.y, B.z);
        }
      }
      cursor += a;
    }
    return new Float32Array(segs);
  }, [nodes]);
  const lineRef = useRef<THREE.LineSegments>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.4 + p * Math.PI;
    group.current.rotation.x = Math.sin(t * 0.15) * 0.15 - p * 0.3;
    group.current.position.y = -p * 0.5;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.15 + (Math.sin(t * 2) * 0.5 + 0.5) * 0.25;
  });
  return (
    <group ref={group}>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </lineSegments>
      {nodes.map((n, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.3} rotationIntensity={0}>
          <mesh position={n.pos}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial
              color={n.layer % 2 === 0 ? "#00d4ff" : "#ff8c42"}
              emissive={n.layer % 2 === 0 ? "#00d4ff" : "#ff8c42"}
              emissiveIntensity={1.2}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function WireGrid({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = ref.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.5 + t) * 0.3 + Math.cos(y * 0.5 + t * 0.7) * 0.3;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    ref.current.rotation.z = progress.current * Math.PI * 0.3;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.2, 0]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <meshBasicMaterial color="#0a3a5a" wireframe transparent opacity={0.45} />
    </mesh>
  );
}

function CameraRig({ progress, mouse }: { progress: React.MutableRefObject<number>; mouse: React.MutableRefObject<{x:number;y:number}> }) {
  useFrame((state) => {
    const p = progress.current;
    const m = mouse.current;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(p * Math.PI * 2) * 1.5 + m.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, p * 2 - 0.8 + m.y * 0.3, 0.05);
    state.camera.position.z = 6.5 - p * 1.8;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ScrollScene() {
  const mouse = useRef({ x: 0, y: 0 });
  return (
    <div
      className="fixed inset-0 z-0"
      onMouseMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
      style={{ pointerEvents: "none" }}
    >
      <Canvas camera={{ position: [0, 0, 6.5], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <SceneInner mouse={mouse} />
      </Canvas>
    </div>
  );
}

function SceneInner({ mouse }: { mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const progress = useScrollProgress();
  return (
    <>
      <color attach="background" args={["#04040a"]} />
      <fog attach="fog" args={["#04040a", 10, 28]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#cdf3ff" />
      <pointLight position={[-5, -2, -3]} intensity={3} color="#ff8c42" />
      <pointLight position={[5, -3, 2]} intensity={2} color="#00d4ff" />
      <Stars radius={60} depth={40} count={800} factor={5} fade speed={0.8} />
      <ParticleField />
      <MorphingBlob progress={progress} mouse={mouse} />
      <NeuralNetwork progress={progress} />
      <WireGrid progress={progress} />
      <CameraRig progress={progress} mouse={mouse} />
      <Environment preset="night" />
    </>
  );
}
