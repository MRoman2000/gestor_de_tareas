import React from 'react'
import { Link } from 'react-router-dom'
import './Navegacion.css'

export default function Navegacion() {
  return (
    
    <div>
        <nav className='nav-bar'>
            <ul className='nav-list'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listar">ListarTareas</Link></li>
                <li><Link to ="/listarEtiquetas">Etiquetas</Link></li>
            </ul>
        </nav>
    </div>
  )
}
