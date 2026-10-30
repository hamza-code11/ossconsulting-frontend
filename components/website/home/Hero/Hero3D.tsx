// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment, Lightformer } from "@react-three/drei";
// import { useReducedMotion } from "framer-motion";
// import { MathUtils, type Group } from "three";

// const NAVY = "#083c6e";
// const BLUE = "#397eaf";
// const ORBIT_RADIUS = 2.6;
// const ORBIT_COUNT = 4; // 4 practices

// function Scene({ animate }: { animate: boolean }) {
//   const root = useRef<Group>(null);
//   const knot = useRef<Group>(null);
//   const orbitA = useRef<Group>(null);
//   const orbitB = useRef<Group>(null);

//   useFrame((state, delta) => {
//     if (!animate || !root.current || !knot.current || !orbitA.current || !orbitB.current) return;

//     // delta clamp: tab switch ke baad jump na aaye
//     const dt = Math.min(delta, 0.05);

//     knot.current.rotation.y += dt * 0.22;
//     knot.current.rotation.x += dt * 0.08;
//     orbitA.current.rotation.z += dt * 0.35;
//     orbitB.current.rotation.z -= dt * 0.2;

//     // Smooth mouse tilt (frame-rate independent)
//     root.current.rotation.x = MathUtils.damp(root.current.rotation.x, 0.15 + state.pointer.y * 0.18, 3, dt);
//     root.current.rotation.y = MathUtils.damp(root.current.rotation.y, state.pointer.x * 0.25, 3, dt);
//   });

//   return (
//     <group ref={root} rotation={[0.15, 0, 0]}>
//       {/* Central knot: glossy navy-blue metal */}
//       <group ref={knot}>
//         <mesh>
//           <torusKnotGeometry args={[1.05, 0.36, 160, 24, 2, 3]} />
//           <meshPhysicalMaterial
//             color="#1d5d9b"
//             metalness={0.95}
//             roughness={0.16}
//             clearcoat={1}
//             clearcoatRoughness={0.08}
//             envMapIntensity={1.4}
//           />
//         </mesh>
//       </group>

//       {/* Orbit 1 + 4 practice nodes */}
//       <group rotation={[1.2, 0, 0.2]}>
//         <group ref={orbitA}>
//           <mesh>
//             <torusGeometry args={[ORBIT_RADIUS, 0.012, 12, 128]} />
//             <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.3} />
//           </mesh>

//           {Array.from({ length: ORBIT_COUNT }).map((_, i) => {
//             const a = (i / ORBIT_COUNT) * Math.PI * 2;
//             return (
//               <mesh key={i} position={[Math.cos(a) * ORBIT_RADIUS, Math.sin(a) * ORBIT_RADIUS, 0]}>
//                 <sphereGeometry args={[0.17, 32, 32]} />
//                 <meshPhysicalMaterial
//                   color={i % 2 === 0 ? NAVY : BLUE}
//                   metalness={0.9}
//                   roughness={0.15}
//                   clearcoat={1}
//                 />
//               </mesh>
//             );
//           })}
//         </group>
//       </group>

//       {/* Orbit 2: thin accent ring */}
//       <group rotation={[-0.9, 0.4, 0]}>
//         <group ref={orbitB}>
//           <mesh>
//             <torusGeometry args={[ORBIT_RADIUS * 0.82, 0.008, 12, 128]} />
//             <meshStandardMaterial color={BLUE} metalness={0.5} roughness={0.4} />
//           </mesh>
//         </group>
//       </group>
//     </group>
//   );
// }

// export default function Hero3D() {
//   const reduceMotion = useReducedMotion();
//   const animate = !reduceMotion;

//   // Screen se bahar ho to rendering band (GPU free)
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const [inView, setInView] = useState(true);

//   useEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;
//     const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
//       threshold: 0,
//     });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
//       <Canvas
//         frameloop={animate ? (inView ? "always" : "never") : "demand"}
//         dpr={[1, 1.5]}
//         camera={{ position: [0, 0, 9], fov: 35 }}
//         gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
//         aria-hidden="true"
//       >
//         <ambientLight intensity={0.45} />
//         <directionalLight position={[5, 6, 5]} intensity={1.3} />

//         <Scene animate={animate} />

//         {/* Studio lighting: ek baar bake hoti hai, external HDR download nahi */}
//         <Environment resolution={256} frames={1}>
//           <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[12, 4, 1]} />
//           <Lightformer form="rect" intensity={2.2} position={[-5, 1, 2]} scale={[3, 8, 1]} />
//           <Lightformer form="rect" intensity={2.2} position={[5, -1, 3]} scale={[3, 8, 1]} />
//           <Lightformer form="ring" color="#ffffff" intensity={2} position={[0, 0, 6]} scale={4} />
//           <Lightformer form="rect" color="#9cc4ea" intensity={1.5} position={[0, -5, 2]} scale={[10, 2, 1]} />
//         </Environment>
//       </Canvas>
//     </div>
//   );
// }






















"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const NAVY = "#083c6e";
const BLUE = "#397eaf";
const SKY = "#9cc4ea";

const NODE_COUNT = 140;
const RADIUS = 1.9;
const LINK_DIST = 0.85;
const PULSE_COUNT = 40;
const PRACTICES = 4;

/* ---------- Network data (ek baar banta hai) ---------- */
function buildNetwork() {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS)
    );
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (pts[i].distanceTo(pts[j]) < LINK_DIST) edges.push([i, j]);
    }
  }

  const linePositions = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], k) => {
    pts[a].toArray(linePositions, k * 6);
    pts[b].toArray(linePositions, k * 6 + 3);
  });

  return { pts, edges, linePositions };
}

/* ---------- Nodes + Lines + Data pulses ---------- */
function Network({ animate }: { animate: boolean }) {
  const { pts, edges, linePositions } = useMemo(buildNetwork, []);

  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pulsesRef = useRef<THREE.Points>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pulseState = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.35 + Math.random() * 0.5,
        reverse: Math.random() > 0.5,
      })),
    [edges.length]
  );

  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);

  const updateNodes = (time: number) => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    for (let i = 0; i < NODE_COUNT; i++) {
      const p = pts[i];
      // wave jo sphere par upar se neeche loop me guzarti hai
      const wave = Math.max(0, Math.sin(time * 1.4 - p.y * 2.2));
      const s = 0.07 + wave * 0.075;
      dummy.position.copy(p);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    const c = new THREE.Color();
    for (let i = 0; i < NODE_COUNT; i++) {
      c.set(i % 3 === 0 ? NAVY : i % 3 === 1 ? BLUE : SKY);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    updateNodes(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (!animate) return;
    const dt = Math.min(delta, 0.05);
    updateNodes(state.clock.elapsedTime);

    const geo = pulsesRef.current?.geometry;
    if (!geo) return;
    pulseState.forEach((p, i) => {
      p.t += dt * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
        p.reverse = Math.random() > 0.5;
      }
      const [a, b] = edges[p.edge];
      const from = p.reverse ? pts[b] : pts[a];
      const to = p.reverse ? pts[a] : pts[b];
      pulsePositions[i * 3] = from.x + (to.x - from.x) * p.t;
      pulsePositions[i * 3 + 1] = from.y + (to.y - from.y) * p.t;
      pulsePositions[i * 3 + 2] = from.z + (to.z - from.z) * p.t;
    });
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial metalness={0.85} roughness={0.2} envMapIntensity={1.6} />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={BLUE} transparent opacity={0.28} />
      </lineSegments>

      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={NAVY}
          size={0.11}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ---------- Core (wireframe + metal) ---------- */
function Core({ animate }: { animate: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!animate) return;
    const dt = Math.min(delta, 0.05);
    if (outer.current) {
      outer.current.rotation.y += dt * 0.35;
      outer.current.rotation.x += dt * 0.15;
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.5;
      inner.current.rotation.z += dt * 0.25;
      // breathing
      inner.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.06);
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={NAVY} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          color="#1d5d9b"
          metalness={0.95}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  );
}

/* ---------- Orbit rings + 4 practice nodes ---------- */
function Orbits({ animate }: { animate: boolean }) {
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const ringC = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!animate) return;
    const dt = Math.min(delta, 0.05);
    if (ringA.current) ringA.current.rotation.z += dt * 0.45;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.28;
    if (ringC.current) ringC.current.rotation.z += dt * 0.18;
  });

  return (
    <group>
      {/* Main ring: 4 practices */}
      <group rotation={[1.15, 0.2, 0.25]}>
        <group ref={ringA}>
          <mesh>
            <torusGeometry args={[2.85, 0.014, 12, 160]} />
            <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.3} />
          </mesh>
          {Array.from({ length: PRACTICES }).map((_, i) => {
            const a = (i / PRACTICES) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 2.85, Math.sin(a) * 2.85, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshPhysicalMaterial
                  color={i % 2 === 0 ? NAVY : BLUE}
                  metalness={0.9}
                  roughness={0.15}
                  clearcoat={1}
                  envMapIntensity={2}
                />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Accent ring 1 */}
      <group rotation={[-0.8, 0.5, 0]}>
        <group ref={ringB}>
          <mesh>
            <torusGeometry args={[2.45, 0.008, 12, 160]} />
            <meshStandardMaterial color={BLUE} metalness={0.5} roughness={0.4} transparent opacity={0.7} />
          </mesh>
          <mesh position={[2.45, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={BLUE} />
          </mesh>
        </group>
      </group>

      {/* Accent ring 2 */}
      <group rotation={[0.3, -0.9, 0.6]}>
        <group ref={ringC}>
          <mesh>
            <torusGeometry args={[3.05, 0.006, 12, 160]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
          </mesh>
          <mesh position={[-3.05, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={NAVY} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------- Scene ---------- */
function Scene({ animate }: { animate: boolean }) {
  const root = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!animate || !root.current || !sphere.current) return;
    const dt = Math.min(delta, 0.05);

    // network sphere khud loop me ghoomti hai
    sphere.current.rotation.y += dt * 0.16;
    sphere.current.rotation.x += dt * 0.04;

    // mouse tilt (smooth)
    root.current.rotation.x = MathDamp(root.current.rotation.x, 0.1 + state.pointer.y * 0.2, dt);
    root.current.rotation.y = MathDamp(root.current.rotation.y, state.pointer.x * 0.3, dt);

    // halka floating
    root.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  return (
    <group ref={root} scale={0.95}>
      <group ref={sphere}>
        <Network animate={animate} />
      </group>
      <Core animate={animate} />
      <Orbits animate={animate} />
    </group>
  );
}

function MathDamp(current: number, target: number, dt: number) {
  return THREE.MathUtils.damp(current, target, 3, dt);
}

/* ---------- Canvas wrapper ---------- */
export default function Hero3D() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={animate ? (inView ? "always" : "never") : "demand"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9.5], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 5]} intensity={1.3} />

        <Scene animate={animate} />

        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[12, 4, 1]} />
          <Lightformer form="rect" intensity={2.2} position={[-5, 1, 2]} scale={[3, 8, 1]} />
          <Lightformer form="rect" intensity={2.2} position={[5, -1, 3]} scale={[3, 8, 1]} />
          <Lightformer form="ring" color="#ffffff" intensity={2} position={[0, 0, 6]} scale={4} />
          <Lightformer form="rect" color="#9cc4ea" intensity={1.5} position={[0, -5, 2]} scale={[10, 2, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

























// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Edges, Environment, Lightformer, Sparkles } from "@react-three/drei";
// import { useReducedMotion } from "framer-motion";
// import * as THREE from "three";

// const NAVY = "#083c6e";
// const BLUE = "#397eaf";
// const SKY = "#9cc4ea";
// const MID = "#1d5d9b";

// const MOVE_TIME = 1.15; // ek layer ghoomne ka time
// const PAUSE_TIME = 0.35; // do moves ke beech wait
// const CUBE_SIZE = 0.9;

// type Axis = "x" | "y" | "z";
// const AXIS_VEC: Record<Axis, THREE.Vector3> = {
//   x: new THREE.Vector3(1, 0, 0),
//   y: new THREE.Vector3(0, 1, 0),
//   z: new THREE.Vector3(0, 0, 1),
// };

// // 4 corner cubes = 4 practices (solid brand colors)
// const ACCENTS: Record<string, string> = {
//   "1,1,1": NAVY,
//   "-1,-1,1": BLUE,
//   "-1,1,-1": MID,
//   "1,-1,-1": SKY,
// };

// type CubeData = {
//   pos: THREE.Vector3;
//   quat: THREE.Quaternion;
//   accent?: string;
// };

// type Move = { axis: Axis; layer: number; dir: number; t0: number };

// const easeInOut = (x: number) =>
//   x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// function buildCubes(): CubeData[] {
//   const list: CubeData[] = [];
//   for (let x = -1; x <= 1; x++)
//     for (let y = -1; y <= 1; y++)
//       for (let z = -1; z <= 1; z++) {
//         if (x === 0 && y === 0 && z === 0) continue; // center nahi chahiye
//         list.push({
//           pos: new THREE.Vector3(x, y, z),
//           quat: new THREE.Quaternion(),
//           accent: ACCENTS[`${x},${y},${z}`],
//         });
//       }
//   return list;
// }

// function randomMove(prev: Move | null, t0: number): Move {
//   const axes: Axis[] = ["x", "y", "z"];
//   let m: Move;
//   do {
//     m = {
//       axis: axes[Math.floor(Math.random() * 3)],
//       layer: Math.floor(Math.random() * 3) - 1,
//       dir: Math.random() > 0.5 ? 1 : -1,
//       t0,
//     };
//   } while (prev && prev.axis === m.axis && prev.layer === m.layer);
//   return m;
// }

// /* ---------- Modular cube ---------- */
// function ModularCube({ animate }: { animate: boolean }) {
//   const cubes = useMemo(buildCubes, []);
//   const groups = useRef<(THREE.Group | null)[]>([]);
//   const move = useRef<Move | null>(null);

//   const q = useMemo(() => new THREE.Quaternion(), []);
//   const tmp = useMemo(() => new THREE.Vector3(), []);

//   useFrame((state) => {
//     if (!animate) return;
//     const t = state.clock.elapsedTime;

//     if (!move.current) move.current = randomMove(null, t + 0.6);
//     const m = move.current;

//     const raw = (t - m.t0) / MOVE_TIME;
//     const p = Math.min(Math.max(raw, 0), 1);
//     const angle = m.dir * (Math.PI / 2) * easeInOut(p);
//     q.setFromAxisAngle(AXIS_VEC[m.axis], angle);

//     // explode / assemble breathing
//     const spacing = 1.08 + 0.26 * (0.5 - 0.5 * Math.cos(t * 0.5));

//     cubes.forEach((c, i) => {
//       const g = groups.current[i];
//       if (!g) return;
//       const inLayer = Math.round(c.pos[m.axis]) === m.layer;

//       if (inLayer) {
//         tmp.copy(c.pos).applyQuaternion(q).multiplyScalar(spacing);
//         g.position.copy(tmp);
//         g.quaternion.copy(q).multiply(c.quat);
//       } else {
//         g.position.copy(c.pos).multiplyScalar(spacing);
//         g.quaternion.copy(c.quat);
//       }
//     });

//     // move complete: final position save karo, agla move schedule karo
//     if (raw >= 1) {
//       q.setFromAxisAngle(AXIS_VEC[m.axis], m.dir * (Math.PI / 2));
//       cubes.forEach((c) => {
//         if (Math.round(c.pos[m.axis]) !== m.layer) return;
//         c.pos.applyQuaternion(q);
//         c.pos.set(Math.round(c.pos.x), Math.round(c.pos.y), Math.round(c.pos.z));
//         c.quat.premultiply(q).normalize();
//       });
//       move.current = randomMove(m, t + PAUSE_TIME);
//     }
//   });

//   return (
//     <group>
//       {cubes.map((c, i) => (
//         <group
//           key={i}
//           ref={(el) => {
//             groups.current[i] = el;
//           }}
//           position={[c.pos.x * 1.2, c.pos.y * 1.2, c.pos.z * 1.2]}
//         >
//           {c.accent ? (
//             /* Accent cube: solid metal (practice) */
//             <mesh>
//               <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
//               <meshPhysicalMaterial
//                 color={c.accent}
//                 metalness={0.9}
//                 roughness={0.14}
//                 clearcoat={1}
//                 clearcoatRoughness={0.06}
//                 envMapIntensity={1.8}
//               />
//               <Edges threshold={15} color="#ffffff" />
//             </mesh>
//           ) : (
//             <>
//               {/* Glass shell */}
//               <mesh>
//                 <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
//                 <meshPhysicalMaterial
//                   color="#ffffff"
//                   transparent
//                   opacity={0.3}
//                   metalness={0.1}
//                   roughness={0.04}
//                   clearcoat={1}
//                   clearcoatRoughness={0.05}
//                   envMapIntensity={1.6}
//                   depthWrite={false}
//                 />
//                 <Edges threshold={15} color={NAVY} />
//               </mesh>
//               {/* Inner metal core */}
//               <mesh>
//                 <boxGeometry args={[0.34, 0.34, 0.34]} />
//                 <meshStandardMaterial
//                   color={(i + Math.round(c.pos.x + c.pos.y)) % 2 === 0 ? NAVY : BLUE}
//                   metalness={0.9}
//                   roughness={0.15}
//                   envMapIntensity={2}
//                 />
//               </mesh>
//             </>
//           )}
//         </group>
//       ))}
//     </group>
//   );
// }

// /* ---------- Scene ---------- */
// function Scene({ animate }: { animate: boolean }) {
//   const root = useRef<THREE.Group>(null);
//   const spin = useRef<THREE.Group>(null);

//   useFrame((state, delta) => {
//     if (!animate || !root.current || !spin.current) return;
//     const dt = Math.min(delta, 0.05);

//     // pura cube dheere ghoomta rehta hai
//     spin.current.rotation.y += dt * 0.18;

//     // mouse tilt (smooth)
//     root.current.rotation.x = THREE.MathUtils.damp(
//       root.current.rotation.x,
//       0.55 + state.pointer.y * 0.2,
//       3,
//       dt
//     );
//     root.current.rotation.z = THREE.MathUtils.damp(
//       root.current.rotation.z,
//       -state.pointer.x * 0.15,
//       3,
//       dt
//     );

//     // halka floating
//     root.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
//   });

//   return (
//     <group ref={root} rotation={[0.55, 0, 0]} scale={0.95}>
//       <group ref={spin} rotation={[0, 0.6, 0]}>
//         <ModularCube animate={animate} />
//       </group>
//       <Sparkles count={50} scale={8} size={2.2} speed={0.35} opacity={0.6} color={BLUE} />
//     </group>
//   );
// }

// /* ---------- Canvas wrapper ---------- */
// export default function Hero3D() {
//   const reduceMotion = useReducedMotion();
//   const animate = !reduceMotion;

//   const wrapRef = useRef<HTMLDivElement>(null);
//   const [inView, setInView] = useState(true);

//   useEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;
//     const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
//       <Canvas
//         frameloop={animate ? (inView ? "always" : "never") : "demand"}
//         dpr={[1, 1.5]}
//         camera={{ position: [0, 0, 11], fov: 38 }}
//         gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
//         aria-hidden="true"
//       >
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 6, 5]} intensity={1.4} />

//         <Scene animate={animate} />

//         <Environment resolution={256} frames={1}>
//           <Lightformer form="rect" intensity={4} position={[0, 5, -4]} scale={[14, 4, 1]} />
//           <Lightformer form="rect" intensity={2.5} position={[-5, 1, 2]} scale={[3, 8, 1]} />
//           <Lightformer form="rect" intensity={2.5} position={[5, -1, 3]} scale={[3, 8, 1]} color="#cfe3f5" />
//           <Lightformer form="ring" color="#ffffff" intensity={2} position={[0, 0, 6]} scale={4} />
//           <Lightformer form="rect" color={SKY} intensity={1.5} position={[0, -5, 2]} scale={[10, 2, 1]} />
//         </Environment>
//       </Canvas>
//     </div>
//   );
// }




