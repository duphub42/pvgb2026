"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

interface TorusFromSlicesProps {
  slices?: number;
  majorRadius?: number;
  sliceRadius?: number;
  sliceDepth?: number;
  bevelEnabled?: boolean;
}

function TorusFromSlices({
  slices = 10,
  majorRadius = 1.0,
  sliceRadius = 5,
  sliceDepth = 1,
  bevelEnabled = true,
}: TorusFromSlicesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const sliceGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const points: THREE.Vector2[] = [];

    const steps = 256;
    const a = sliceRadius * 1.5;
    const b = sliceRadius * 0.25;
    const n = 2;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const x = Math.sign(cosT) * Math.pow(Math.abs(cosT), 2 / n) * a;
      const y = Math.sign(sinT) * Math.pow(Math.abs(sinT), 2 / n) * b;

      points.push(new THREE.Vector2(x, y));
    }

    shape.setFromPoints(points);

    const extrudeSettings = {
      depth: sliceDepth,
      bevelEnabled: bevelEnabled,
      bevelThickness: Math.min(sliceDepth * 0.5, 0.02),
      bevelSize: Math.min(sliceRadius * 0.04, 0.02),
      bevelSegments: 32,
      steps: 64,
      curveSegments: 128,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    geom.computeVertexNormals();
    return geom;
  }, [sliceRadius, sliceDepth, bevelEnabled]);

  useFrame((state) => {
    if (!meshRef.current) return;

    for (let i = 0; i < slices; i++) {
      const t = (i / slices) * Math.PI * 2;
      const x = majorRadius * Math.cos(t);
      const z = majorRadius * Math.sin(t);

      const radial = new THREE.Vector3(x, 0, z).normalize();

      const q = new THREE.Quaternion();
      q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), radial);

      const edgeRotation = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, Math.PI / 2, 0),
      );
      q.multiply(edgeRotation);

      const animatedRotation =
        Math.sin(state.clock.elapsedTime * 0.8 + i * 0.3) * 0.25;

      const twistRotation = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(animatedRotation, 0, 0),
      );
      q.multiply(twistRotation);

      dummy.position.set(x, 0, z);
      dummy.quaternion.copy(q);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        sliceGeometry,
        new THREE.MeshPhysicalMaterial({
          roughness: 0.5,
          metalness: 1.0,
          clearcoat: 0,
          ior: 2.8,
          iridescence: 1.0,
          color: "#3db2ff",
          emissive: "#1a75ff",
          emissiveIntensity: 0.01,
        }),
        slices,
      ]}
      castShadow
    />
  );
}

function RotatingTorus() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * -0.15;
    }
  });

  return (
    <group ref={groupRef} position={[4, -4, 3]} rotation={[Math.PI / 3, 0, 0]}>
      <TorusFromSlices
        slices={30}
        majorRadius={4.5}
        sliceRadius={1.5}
        sliceDepth={0.035}
        bevelEnabled={true}
      />
    </group>
  );
}

interface Shader11Props {
  className?: string;
}

const Shader11 = ({ className }: Shader11Props) => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #050a1f 10%, #0f3b7a 90%)",
      }}
      className={cn(className, "absolute inset-0 h-screen w-full")}
    >
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.3} color="#4fa9ff" />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.4}
          color="#3db2ff"
          castShadow
        />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.8}
          color="#1461ff"
        />
        <directionalLight
          position={[0, 8, -5]}
          intensity={0.6}
          color="#00e5ff"
        />

        <spotLight
          position={[3, 6, 2]}
          angle={0.4}
          penumbra={0.3}
          intensity={1.6}
          color="#3db2ff"
          castShadow
        />
        <spotLight
          position={[-4, 4, -3]}
          angle={0.3}
          penumbra={0.5}
          intensity={1.2}
          color="#00f5ff"
        />
        <spotLight
          position={[0, 3, 6]}
          angle={0.5}
          penumbra={0.4}
          intensity={1.0}
          color="#5fbaff"
        />

        <pointLight position={[0, -1, 0]} intensity={0.5} color="#1461ff" />

        <RotatingTorus />

        <EffectComposer multisampling={8}>
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.9}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={0.6}
          />
        </EffectComposer>
      </Canvas>
    </section>
  );
};
export { Shader11 };
