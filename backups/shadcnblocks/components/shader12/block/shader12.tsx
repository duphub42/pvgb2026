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
  timeMultiplier?: number;
  baseColor?: THREE.ColorRepresentation;
  accent?: THREE.ColorRepresentation;
  glow?: THREE.ColorRepresentation;
}

const Shader12 = ({
  vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  uniform vec3 u_baseColor;
  uniform vec3 u_accent;
  uniform vec3 u_glow;

  #define A(a) mat2(cos(a+vec4(0,11,33,0)))  // rotate

  void mainImage(out vec4 C, vec2 U)
  {
      float t = u_time * 6.3;
      float d = 0.0;
      float i = d;
      float s;
      vec2 R = u_resolution.xy;
      vec2 m = -vec2(t / 30.0, 0.3); // kamera w spoczynku

      vec3 o = vec3(0.0, 2.0, -15.0); // kamera
      vec3 u = normalize(vec3((U - 0.5 * R) / R.y, 0.6)); // kierunek widzenia
      vec3 c, p, g;

      mat2 v = A(m.y); // pitch
      mat2 h = A(m.x); // yaw

      for (; i++ < 90.0;)
      {
          p = o + u * d;
          p.yz *= v;
          p.xz *= h;
          p.y -= pow(length(p.xz), 2.0) * 0.01;
          p.y += cos(length(round(p.xz)) - t / 5.5);
          g = abs(p - round(p));
          s = max(g.x, max(p.y * -sign(m.y), g.z)) - 0.3;
          if (s < 0.001 || d > 90.0) break;
          d += s * 0.2;
      }

      vec3 baseColor   = u_baseColor;
      vec3 accent      = u_accent;
      vec3 glow        = u_glow;

      c = mix(baseColor, accent, 2.5 / d);
      c += glow * 2.9 / (d * 2.0);

      float vignette = smoothstep(0.8, 0.1, length((U - 0.5 * R) / R.y));
      c *= vignette;

      float noise = fract(sin(dot(U, vec2(12.9898,78.233))) * 43758.5453);
      c += noise * 0.02;
      c += 1.*s/d;

      C = vec4(c, 1.0);
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
  timeMultiplier = 0.8,
  baseColor = "#020304",
  accent = "#9a61ff",
  glow = "#9a23ff",
}: ShaderBackgroundProps) => {
  const baseUniform = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const accentUniform = useMemo(() => new THREE.Color(accent), [accent]);
  const glowUniform = useMemo(() => new THREE.Color(glow), [glow]);

  const shaderUniforms = useMemo<Record<string, THREE.IUniform>>(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      ...(uniforms ?? {}),
      u_baseColor: { value: baseUniform },
      u_accent: { value: accentUniform },
      u_glow: { value: glowUniform },
    }),
    [uniforms, baseUniform, accentUniform, glowUniform],
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

export { Shader12 };
