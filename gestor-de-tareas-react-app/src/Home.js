import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenido a la App de Tareas</h1>
        <p>Organiza, prioriza y completa tus tareas de forma eficiente. Empieza ahora a ser más productivo.</p>
        <Link to="/listar" className="btn-primary">
          Ir a mis tareas
        </Link>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>✅ Administra tareas</h3>
          <p>Crea, edita y elimina tareas fácilmente. Marca como completadas.</p>
        </div>
        <div className="card">
          <h3>🏷️ Etiqueta tus tareas</h3>
          <p>Organiza tareas por etiquetas para encontrarlas más rápido.</p>
        </div>
        <div className="card">
          <h3>📊 Visualiza tu progreso</h3>
          <p>Próximamente: estadísticas de productividad y paneles.</p>
        </div>
      </div>
    </div>
  );
}
