import React from 'react'

function DashboardCard({ titulo, valor }) {
  return (
    <article className="card">
      <span>{titulo}</span>
      <strong>{valor}</strong>
    </article>
  )
}

export default DashboardCard
