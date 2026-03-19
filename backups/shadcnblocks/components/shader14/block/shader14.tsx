"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

interface ShaderPlaneProps {
  fragmentShader: string;
  vertexShader: string;
  uniforms: Record<string, THREE.IUniform>;
  renderTarget?: THREE.WebGLRenderTarget;
  onRender?: (texture: THREE.Texture) => void;
}

const ShaderPlane = ({
  fragmentShader,
  vertexShader,
  uniforms,
  renderTarget,
  onRender,
}: ShaderPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, gl } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);

      if (renderTarget) {
        gl.setRenderTarget(renderTarget);
        gl.render(meshRef.current, state.camera);
        gl.setRenderTarget(null);
        onRender?.(renderTarget.texture);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

interface ShaderBackgroundProps {
  className?: string;
  backgroundColor?: THREE.ColorRepresentation;
  color?: THREE.ColorRepresentation;
}

const Shader14 = ({
  className = "absolute inset-0 w-full h-screen",
  backgroundColor = "#000000",
  color = "#f0f0f0",
}: ShaderBackgroundProps) => {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShaderA = `
    precision mediump float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;
    uniform vec3 u_backgroundColor;
    uniform vec3 u_color;

    #define TWOPI 6.28318530718

    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0);
      const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=vec3(1.0)-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857;
      vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);
      vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy;
      vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=vec4(1.0)-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);
      vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0;
      vec4 s1=floor(b1)*2.0+1.0;
      vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);
      vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z);
      vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
      m=m*m;
      return 55.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    void mainImage(out vec4 fragColor,in vec2 fragCoord){
      vec3 c;
      float l,z=u_time;
      vec2 r=u_resolution.xy;
      vec2 uv0=fragCoord.xy/r;
      float noiseStrength=0.16;
      float noiseScale=0.001;
      float speed=0.1;
      float noiseTime=u_time*speed;
      float noise=snoise(vec3(
          (fragCoord.x-r.x/2.)*noiseScale,
          (fragCoord.y-r.y/2.)*noiseScale,
          noiseTime));
      uv0.x=fract(uv0).x+noiseStrength*sin(noise*TWOPI);
      uv0.y=fract(uv0).y+noiseStrength*cos(noise*TWOPI);
      for(int i=0;i<3;i++){
        vec2 uv,p=uv0;
        uv=p;
        p-=.5;
        p.x*=r.x/r.y;
        z+=.03;
        l=length(p);
        uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
        c[i]=.05/length(mod(uv,1.)-.5);
      }
      fragColor=vec4(c/l,1.0);
    }

    void main(){
      vec4 fragColor;
      vec2 fragCoord=vUv*u_resolution.xy;
      mainImage(fragColor,fragCoord);

      vec3 pattern = fragColor.rgb * u_color;
      fragColor.rgb = mix(u_backgroundColor, pattern, 0.6);

      gl_FragColor=fragColor;
    }
  `;

  const fragmentShaderImage = `
    precision mediump float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;
    uniform sampler2D u_channel0;

    float character(int n, vec2 p){
      p=floor(p*vec2(-4.0,4.0)+2.5);
      if(clamp(p.x,0.0,4.0)==p.x){
        if(clamp(p.y,0.0,4.0)==p.y){
          int a=int(round(p.x)+5.0*round(p.y));
          if(((n>>a)&1)==1)return 1.0;
        }
      }
      return 0.0;
    }

    void mainImage(out vec4 fragColor,in vec2 fragCoord){
      vec2 pix=fragCoord.xy;
      vec3 col=texture2D(u_channel0,floor(pix/16.0)*16.0/u_resolution.xy).rgb;
      float gray=0.3*col.r+0.59*col.g+0.11*col.b;
      int n=4096;
      if(gray>0.1)n=4096;
      if(gray>0.1064)n=131200;
      if(gray>0.1096)n=4329476;
      if(gray>0.1130)n=459200;
      if(gray>0.1263)n=4591748;
      if(gray>0.1395)n=12652620;
      if(gray>0.1628)n=14749828;
      if(gray>0.1860)n=18393220;
      if(gray>0.2093)n=15239300;
      if(gray>0.2326)n=17318431;
      if(gray>0.2558)n=32641156;
      if(gray>0.2791)n=18393412;
      if(gray>0.3023)n=18157905;
      if(gray>0.3256)n=17463428;
      if(gray>0.3488)n=14954572;
      if(gray>0.3721)n=13177118;
      if(gray>0.3953)n=6566222;
      if(gray>0.4186)n=16269839;
      if(gray>0.4419)n=18444881;
      if(gray>0.4651)n=18400814;
      if(gray>0.4884)n=33061392;
      if(gray>0.5116)n=15255086;
      if(gray>0.5349)n=32045584;
      if(gray>0.5581)n=18405034;
      if(gray>0.5814)n=15022158;
      if(gray>0.6047)n=15018318;
      if(gray>0.6279)n=16272942;
      if(gray>0.6512)n=18415153;
      if(gray>0.6744)n=32641183;
      if(gray>0.6977)n=32540207;
      if(gray>0.7209)n=18732593;
      if(gray>0.7442)n=18667121;
      if(gray>0.7674)n=16267326;
      if(gray>0.7907)n=32575775;
      if(gray>0.8140)n=15022414;
      if(gray>0.8372)n=15255537;
      if(gray>0.8605)n=32032318;
      if(gray>0.8837)n=32045617;
      if(gray>0.9070)n=33081316;
      if(gray>0.9302)n=32045630;
      if(gray>0.9535)n=33061407;
      if(gray>0.9767)n=11512810;

      vec2 p=mod(pix/8.0,2.0)-vec2(1.0);
      vec3 finalCol=col*character(n,p);
      fragColor=vec4(finalCol,1.0);
    }

    void main(){
      vec4 fragColor;
      vec2 fragCoord=vUv*u_resolution.xy;
      mainImage(fragColor,fragCoord);
      gl_FragColor=fragColor;
    }
  `;

  const backgroundColorValue = useMemo(
    () => new THREE.Color(backgroundColor),
    [backgroundColor],
  );
  const colorValue = useMemo(() => new THREE.Color(color), [color]);

  const renderTarget = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });
  }, []);

  const uniformsA = useMemo<Record<string, THREE.IUniform>>(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      u_backgroundColor: { value: backgroundColorValue },
      u_color: { value: colorValue },
    }),
    [backgroundColorValue, colorValue],
  );

  const uniformsImage = useMemo<Record<string, THREE.IUniform>>(() => {
    if (!renderTarget) {
      return {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector3(1, 1, 1) },
        u_channel0: { value: null },
      };
    }

    return {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      u_channel0: { value: renderTarget.texture },
    };
  }, [renderTarget]);

  return (
    <section className={cn(className, "absolute inset-0 h-screen w-full")}>
      <Canvas>
        {renderTarget && (
          <>
            <ShaderPlane
              vertexShader={vertexShader}
              fragmentShader={fragmentShaderA}
              uniforms={uniformsA}
              renderTarget={renderTarget}
            />
            <ShaderPlane
              vertexShader={vertexShader}
              fragmentShader={fragmentShaderImage}
              uniforms={uniformsImage}
            />
          </>
        )}
      </Canvas>
    </section>
  );
};

export { Shader14 };
