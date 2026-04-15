'use client'
import { useState } from 'react'

const programs = [
  { id: 'mangrove', name: 'Mangrove', species: 'Rhizophora mucronata', location: 'Pesisir Kalimantan Timur', price: 25000, target: 1000, funded: 730, impact: 'Melindungi garis pantai', color: '#1c3d0d', lightColor: '#e4f1cc' },
  { id: 'jati', name: 'Jati putih', species: 'Gmelina arborea', location: 'Yogyakarta', price: 40000, target: 500, funded: 205, impact: 'Mencegah erosi', color: '#275212', lightColor: '#eaf3de' },
  { id: 'bambu', name: 'Bambu apus', species: 'Gigantochloa apus', location: 'Jawa Barat', price: 15000, target: 1000, funded: 880, impact: 'Penyerap CO2', color: '#3e7a1d', lightColor: '#c0dd97', featured: true }
]

export default function Programs() {
  const [quantities, setQuantities] = useState({ mangrove: 1, jati: 1, bambu: 1 })
  const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)
  
  return (
    <section id="program" style={{ padding: '4rem 2rem', background: 'var(--cream)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Pilih Pohonmu</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {programs.map(p => (
          <div key={p.id} style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #ddd' }}>
            <h3>{p.name}</h3>
            <p>{p.location}</p>
            <p style={{ fontWeight: 'bold' }}>Rp {fmt(p.price)}</p>
            <button style={{ width: '100%', background: p.color, color: 'white', border: 'none', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>Donasi Sekarang</button>
          </div>
        ))}
      </div>
    </section>
  )
}
