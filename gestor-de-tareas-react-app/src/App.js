
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Navegacion from './plantilla/Navegacion';
import ListarTareas from './tareas/ListarTareas';
import AgregarEtiqueta from './etiquetas/AgregarEtiqueta';
import ListarEtiqeutas from './etiquetas/ListarEtiquetas.js';

function App() {
  return (
    <div className='container'>

      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listar" element={<ListarTareas/>} />
          <Route path='/listarEtiquetas' element={<ListarEtiqeutas/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
