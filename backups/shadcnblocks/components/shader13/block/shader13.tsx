"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

interface ShaderPlaneProps {
  vertexShader: string;
  fragmentShader: string;
  uniforms: Record<string, THREE.IUniform>;
  timeMultiplier: number;
}

const ShaderPlane = ({
  vertexShader,
  fragmentShader,
  uniforms,
  timeMultiplier,
}: ShaderPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime * timeMultiplier;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

interface ShaderBackgroundProps {
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: Record<string, THREE.IUniform>;
  className?: string;
  color?: THREE.ColorRepresentation;
  timeMultiplier?: number;
}

const Shader13 = ({
  vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
    gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;
  uniform vec3 u_color;

  void mainImage(out vec4 o, vec2 v)
  {
      o = vec4(0.0);
      vec2 u = (v + v - u_resolution.xy) / u_resolution.y;
      u /= 0.5 + 0.2 * dot(u, u);
      u += 0.2 * cos(u_time) - 7.56;

      for (int i = 0; i < 3; i++) {
          o[i] = 1.0 - exp(-6.0 / exp(6.0 * length(v + sin(5.0 * v.y - 3.0 * u_time + float(i)) / 4.0)));
          v = sin(1.5 * u.yx + 2.0 * cos(u -= 0.01));
      }

      float brightness = dot(o.rgb, vec3(0.299, 0.587, 0.114));

      o.rgb = brightness * u_color;
      o.a = 1.0;
  }

  void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * u_resolution.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
  `,
  uniforms = {},
  className,
  color = "#ff0000",
  timeMultiplier = 0.5,
}: ShaderBackgroundProps) => {
  const colorUniformValue = useMemo(() => new THREE.Color(color), [color]);

  const shaderUniforms = useMemo<Record<string, THREE.IUniform>>(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      ...(uniforms ?? {}),
      u_color: { value: colorUniformValue },
    }),
    [uniforms, colorUniformValue],
  );

  return (
    <section className={cn(className, "absolute inset-0 h-screen w-full")}>
      <Canvas>
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={shaderUniforms}
          timeMultiplier={timeMultiplier}
        />
      </Canvas>
    </section>
  );
};

export { Shader13 };
