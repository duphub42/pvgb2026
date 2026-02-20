'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

function isWebGLSupported(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')
    return Boolean(gl)
  } catch {
    return false
  }
}

/**
 * Animiertes Drahtgitter-Overlay für den Hero (Three.js Wireframe, Wave-Bewegung).
 * Wird nur bei Halo-Hintergrund und Gitter-Variante "wave" gerendert.
 * Bei blockiertem WebGL (z. B. DuckDuckGo) wird nur der Container gerendert; Overlay-Verlauf vom Hero bleibt sichtbar.
 */
export function HeroAnimatedGridWave({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !isWebGLSupported()) return

    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    const aspect = w / h
    if (!Number.isFinite(aspect) || aspect <= 0) return

    try {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000)
      camera.position.z = 8
      camera.position.y = 5
      camera.rotation.x = -0.8

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const geometry = new THREE.PlaneGeometry(30, 30, 120, 120)
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
      const plane = new THREE.Mesh(geometry, material)
      plane.rotation.x = -Math.PI / 2
      scene.add(plane)

      const clock = new THREE.Clock()
      let rafId: number

      function animate() {
        rafId = requestAnimationFrame(animate)
        const time = clock.getElapsedTime()
        const position = geometry.attributes.position

        for (let i = 0; i < position.count; i++) {
          const x = position.getX(i)
          const y = position.getY(i)
          const wave =
            Math.sin(x * 0.9 + time * 0.1) * 0.4 + Math.sin(y * 0.3 + time * 0.3) * 0.15
          position.setZ(i, wave)
        }
        ;(position as THREE.BufferAttribute).needsUpdate = true
        renderer.render(scene, camera)
      }
      animate()

      function onResize() {
        if (!container) return
        const nw = container.clientWidth
        const nh = container.clientHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
      }
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        cancelAnimationFrame(rafId)
        renderer.dispose()
        geometry.dispose()
        material.dispose()
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      }
    } catch {
      return () => {}
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden />
}

export default HeroAnimatedGridWave
