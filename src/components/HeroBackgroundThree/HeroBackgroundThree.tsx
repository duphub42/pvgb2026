'use client'

import React, { useRef, useEffect } from 'react'

const BG_COLOR = 0x0b0f19
const LINE_COLOR = 0x1a2332
const AMPLITUDE = 0.028
const FREQ = 2.5
const SPEED = 0.22

export function HeroBackgroundThree({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let rafId = 0
    let renderer: import('three').WebGLRenderer | null = null
    let wireframe: import('three').WireframeGeometry | null = null
    let material: import('three').LineBasicMaterial | null = null

    const init = async () => {
      const THREE = await import('three')
      if (cancelled || !container) return

      const width = container.offsetWidth
      const height = container.offsetHeight
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(BG_COLOR, 1)
      renderer.setAnimationLoop(null)

      const plane = new THREE.PlaneGeometry(2.2, 2.2, 36, 36)
      wireframe = new THREE.WireframeGeometry(plane)
      plane.dispose()

      const positions = wireframe.getAttribute('position')
      const originalY = new Float32Array(positions.count)
      for (let i = 0; i < positions.count; i++) {
        originalY[i] = positions.getY(i)
      }

      material = new THREE.LineBasicMaterial({
        color: LINE_COLOR,
        linewidth: 0.5,
      })
      const mesh = new THREE.LineSegments(wireframe, material)
      scene.add(mesh)

      container.appendChild(renderer.domElement)
      renderer.domElement.style.display = 'block'
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'

      let t = 0
      const r = renderer
      const animate = () => {
        t += SPEED * 0.016
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i)
          const y0 = originalY[i]
          positions.setY(i, y0 + AMPLITUDE * Math.sin(t + x * FREQ))
        }
        positions.needsUpdate = true
        r.render(scene, camera)
        rafId = requestAnimationFrame(animate)
      }
      rafId = requestAnimationFrame(animate)

      const onResize = () => {
        if (!container) return
        const w = container.offsetWidth
        const h = container.offsetHeight
        r.setSize(w, h)
        r.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }
      window.addEventListener('resize', onResize)
    }

    init()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      renderer?.dispose()
      wireframe?.dispose()
      material?.dispose()
      if (container && renderer?.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden />
}
