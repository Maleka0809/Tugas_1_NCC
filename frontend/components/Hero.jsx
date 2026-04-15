'use client'
import { useEffect, useRef } from 'react'
const TREE_COUNT = 18

function MiniTree({ x, y, size, delay }) {
  return (
    <g transform={`translate(${x}, ${y})`} style={{ animationDelay: `${delay}s` }} className="mini-tree">
      <rect x={-size * 0.15} y={size * 0.4} width={size * 0.3} height={size * 0.6} rx={2} fill="rgba(39,82,18,0.5)" />
      <ellipse cx={0} cy={size * 0.3} rx={size * 0.45} ry={size * 0.42} fill="rgba(63,122,29,0.4)" />
      <ellipse cx={0} cy={size * 0.1} rx={size * 0.3} ry={size * 0.3} fill="rgba(99,153,34,0.35)" />
    </g>
  )
}

const trees = Array.from({ length: TREE_COUNT }, (_, i) => ({
  x: (i % 6) * 160 + 80 + (Math.sin(i * 2.1) * 30),
  y: Math.floor(i / 6) * 120 + 60 + (Math.cos(i * 1.7) * 20),
  size: 28 + (i % 4) * 8,
  delay: i * 0.12,
}))

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 2rem 4rem', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 960 400" preserveAspectRatio="xMidYMid slice">
          {trees.map((t, i) => <MiniTree key={i} {...t} />)}
        </svg>
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 600, color: 'var(--green-950)', marginBottom: '1.5rem' }}>
          Satu pohon darimu, <em style={{ color: 'var(--green-600)', fontStyle: 'italic' }}>satu napas</em> untuk bumi
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--earth-600)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>Bergabunglah dengan reboisasi Indonesia.</p>
      </div>
      <style>{`@keyframes sway { 0%,100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } } .mini-tree { animation: sway 4s ease-in-out infinite; transform-origin: bottom center; }`}</style>
    </section>
  )
}
