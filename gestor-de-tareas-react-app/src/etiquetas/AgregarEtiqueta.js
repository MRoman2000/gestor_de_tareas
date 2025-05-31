import React, { useEffect, useState } from 'react';
import './AgregarEtiqueta.css';

import { obtenerEtiquetas, crearEtiqueta, asignarEtiquetaATarea } from "../servicio/EtiquetasService";
function AgregarEtiqueta({ onClose, visible, tarea }) {
    const [formulario, setFormulario] = useState({ nombre: "" });
    const [etiquetas, setEtiquetas] = useState([]);
    const {nombre} = formulario;


   useEffect(() => {
        cargarEtiquetas();
    }, []);

    
    const handleChange = (e) => {
       setFormulario({ ...formulario, [e.target.name ] : e.target.value });
    };
    

    const cargarEtiquetas = async () => {
        try {
            const res = await obtenerEtiquetas();
            setEtiquetas(res.data);
        } catch (error) {
            console.error("Error al cargar las etiquetas", error);
        }
    };

 
    const agregarEtiqueta = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await crearEtiqueta(formulario.nombre);
            const nuevaEtiqueta = respuesta.data;
    
            if (tarea) {
             await asignarEtiquetaATarea(tarea.idTarea, nuevaEtiqueta.idEtiqueta);
            }

            setFormulario({ nombre: "" });
            cargarEtiquetas(); // Actualiza la lista
            onClose();
        } catch (error) {
            console.error("Error al agregar y asignar etiqueta:", error);
        }
    };

    if (!visible) return null;

    return (
        <div className="container">
            <div className='modal-fondo-etiqueta'>
                <div className='modal-etiqueta'>
                    <h2>Agregar Etiqueta</h2>
                    <form onSubmit={agregarEtiqueta}>
                        <input
                            name='nombre'
                            value={nombre}
                            onChange={handleChange}
                            type="text"
                            placeholder="Nombre de la etiqueta"
                            required
                        />
                        <div className='modal-botones'>
                            <button className="btn-agregar" type="submit">Agregar Etiqueta</button>
                            <button className='cancelar' type="button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
}

export default AgregarEtiqueta;
