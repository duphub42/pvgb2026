"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1551250928-243dc937c49d?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1536735561749-fc87494598cb?w=1920&h=1080&fit=crop",
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D u_texture1;
  uniform sampler2D u_texture2;
  uniform float u_progress;
  uniform vec2 u_resolution;
  uniform vec2 u_texture1size;
  uniform vec2 u_texture2size;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    vec2 s = u_resolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (u_resolution - scaledSize) * 0.5;
    return (uv * u_resolution - offset) / scaledSize;
  }

  vec2 getDistortedUv(vec2 uv, vec2 direction, float factor) {
    vec2 scaledDirection = direction;
    scaledDirection.y *= 2.0;
    return uv - scaledDirection * factor;
  }

  struct LensDistortion {
    vec2 distortedUV;
    float inside;
  };

  LensDistortion getLensDistortion(
    vec2 p,
    vec2 uv,
    vec2 sphereCenter,
    float sphereRadius,
    float focusFactor
  ) {
    vec2 distortionDirection = normalize(p - sphereCenter);
    float focusRadius = sphereRadius * focusFactor;
    float focusStrength = sphereRadius / 3000.0;
    float focusSdf = length(sphereCenter - p) - focusRadius;
    float sphereSdf = length(sphereCenter - p) - sphereRadius;
    float inside = smoothstep(0.0, 1.0, -sphereSdf / (sphereRadius * 0.001));

    float magnifierFactor = focusSdf / (sphereRadius - focusRadius);
    float mFactor = clamp(magnifierFactor * inside, 0.0, 1.0);
    mFactor = pow(mFactor, 5.0);

    float distortionFactor = mFactor * focusStrength;

    vec2 distortedUV = getDistortedUv(uv, distortionDirection, distortionFactor);

    return LensDistortion(distortedUV, inside);
  }

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 p = vUv * u_resolution;

    vec2 uv1 = getCoverUV(vUv, u_texture1size);
    vec2 uv2 = getCoverUV(vUv, u_texture2size);

    float maxRadius = length(u_resolution) * 1.5;
    float bubbleRadius = u_progress * maxRadius;
    vec2 sphereCenter = center * u_resolution;
    float focusFactor = 0.25;

    float dist = length(sphereCenter - p);
    float mask = step(bubbleRadius, dist);

    vec4 currentImg = texture2D(u_texture1, uv1);

    LensDistortion distortion = getLensDistortion(
      p, uv2, sphereCenter, bubbleRadius, focusFactor
    );

    vec4 newImg = texture2D(u_texture2, distortion.distortedUV);

    float finalMask = max(mask, 1.0 - distortion.inside);
    vec4 color = mix(newImg, currentImg, finalMask);

    gl_FragColor = color;
  }
`;

interface ShaderPlaneProps {
  vertexShader: string;
  fragmentShader: string;
  imageSources: string[];
  transitionDuration: number;
  pauseDuration: number;
}

const ShaderPlane = ({
  vertexShader,
  fragmentShader,
  imageSources,
  transitionDuration,
  pauseDuration,
}: ShaderPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const holdRef = useRef(Math.max(pauseDuration, 0));
  const textureSources = useMemo(
    () => (imageSources.length > 0 ? imageSources : FALLBACK_IMAGES),
    [imageSources],
  );
  const textures = useLoader(
    THREE.TextureLoader,
    textureSources,
  ) as THREE.Texture[];
  const indicesRef = useRef({ current: 0, next: textures.length > 1 ? 1 : 0 });

  const shaderUniforms = useMemo(
    () => ({
      u_texture1: { value: null as THREE.Texture | null },
      u_texture2: { value: null as THREE.Texture | null },
      u_texture1size: { value: new THREE.Vector2(1, 1) },
      u_texture2size: { value: new THREE.Vector2(1, 1) },
      u_progress: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useEffect(() => {
    textures.forEach((texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    indicesRef.current = {
      current: 0,
      next: textures.length > 1 ? 1 : 0,
    };
    progressRef.current = 0;
    holdRef.current = Math.max(pauseDuration, 0);
  }, [textures.length, pauseDuration]);

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return;
    }

    const material = meshRef.current.material as THREE.ShaderMaterial;
    const { width, height } = state.size;
    const [texture1, texture2] = (() => {
      const current = indicesRef.current.current;
      const next = indicesRef.current.next;
      const first = textures[current] ?? null;
      const second = textures[next] ?? first;
      return [first, second];
    })();

    if (texture1) {
      material.uniforms.u_texture1.value = texture1;
      const image = texture1.image as
        | { width?: number; height?: number }
        | undefined;
      material.uniforms.u_texture1size.value.set(
        image?.width ?? 1,
        image?.height ?? 1,
      );
    }

    if (texture2) {
      material.uniforms.u_texture2.value = texture2;
      const image = texture2.image as
        | { width?: number; height?: number }
        | undefined;
      material.uniforms.u_texture2size.value.set(
        image?.width ?? 1,
        image?.height ?? 1,
      );
    }

    material.uniforms.u_resolution.value.set(width, height);

    if (textures.length > 1) {
      const effectiveHoldDuration = Math.max(pauseDuration, 0);

      if (holdRef.current > 0) {
        holdRef.current = Math.max(holdRef.current - delta, 0);
        material.uniforms.u_progress.value = 0;
      } else {
        progressRef.current += delta / Math.max(transitionDuration, 0.0001);
        const easedProgress = Math.min(progressRef.current, 1);
        material.uniforms.u_progress.value =
          easedProgress * easedProgress * (3 - 2 * easedProgress);

        if (progressRef.current >= 1) {
          progressRef.current = 0;
          indicesRef.current.current = indicesRef.current.next;
          indicesRef.current.next =
            (indicesRef.current.next + 1) % textures.length;
          if (effectiveHoldDuration > 0) {
            holdRef.current = effectiveHoldDuration;
          }
        }
      }
    } else {
      material.uniforms.u_progress.value = 0;
    }

    const camera = state.camera as
      | THREE.PerspectiveCamera
      | THREE.OrthographicCamera;
    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
      const distance = Math.abs(
        perspectiveCamera.position.z - meshRef.current.position.z,
      );
      const fovRadians = THREE.MathUtils.degToRad(perspectiveCamera.fov);
      const planeHeight = 2 * Math.tan(fovRadians / 2) * distance;
      const planeWidth = (planeHeight * width) / height;
      meshRef.current.scale.set(planeWidth / 2, planeHeight / 2, 1);
    } else if ((camera as THREE.OrthographicCamera).isOrthographicCamera) {
      const orthoCamera = camera as THREE.OrthographicCamera;
      const planeWidth = orthoCamera.right - orthoCamera.left;
      const planeHeight = orthoCamera.top - orthoCamera.bottom;
      meshRef.current.scale.set(planeWidth / 2, planeHeight / 2, 1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

interface Background20Props {
  images?: string[];
  transitionDuration?: number;
  pauseDuration?: number;
  className?: string;
}

const Shader10 = ({
  images,
  transitionDuration = 6,
  pauseDuration = 2,
  className,
}: Background20Props) => {
  const resolvedImages = images && images.length > 0 ? images : FALLBACK_IMAGES;

  return (
    <section className={cn(className, "absolute inset-0 h-screen w-full")}>
      <Canvas>
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          imageSources={resolvedImages}
          transitionDuration={transitionDuration}
          pauseDuration={pauseDuration}
        />
      </Canvas>
    </section>
  );
};

export { Shader10 };
