import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarEtiqueta from './AgregarEtiqueta';
import './ListarEtiquetas.css';
import FormularioTareaModal from '../tareas/FormularioTareaModal';
const API_BASE_URL = 'http://localhost:8080/api'; // Ajusta si tu backend usa otra URL

function ListarEtiquetas() {
    const [etiquetas, setEtiquetas] = useState([]);
    const [modalEtiqueta, setModalEtiqueta] = useState({ tarea: null, visible: false });
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);
    const [tareasPorEtiqueta, setTareasPorEtiqueta] = useState([]);
    const [modalTarea, setModalTarea] = useState({ tarea: null, visible: false });

    const cargarEtiquetas = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/etiquetas`);
            setEtiquetas(res.data);
        } catch (error) {
            console.error("Error al cargar etiquetas", error);
        }
    };

    const cargarEtiquetasPorTarea = async (idEtiqueta) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/etiquetas/${idEtiqueta}/tareas`);
            setTareasPorEtiqueta(res.data);
            setEtiquetaSeleccionada(idEtiqueta);
        } catch (error) {
            console.error("Error al cargar tareas por etiqueta", error);
        }
    };

    const eliminarEtiqueta = async (idEtiqueta) => {
        try {
            await axios.delete(`${API_BASE_URL}/etiquetas/${idEtiqueta}`);
            if (etiquetaSeleccionada === idEtiqueta) {
                setEtiquetaSeleccionada(null);
                setTareasPorEtiqueta([]);
            }
            cargarEtiquetas();
        } catch (error) {
            console.error("Error al eliminar etiqueta", error);
        }
    };

    const cerrarModalEtiqueta = () => setModalEtiqueta({ tarea: null, visible: false });
    const cerrarModal = () => setModalTarea({ tarea: null, visible: false });
    useEffect(() => {
        cargarEtiquetas();
    }, []);

    return (
        <div className="container-etiquetas">
            {/* Barra lateral */}
            <div className="card-grid-etiquetas">
                <h3>Etiquetas</h3>
                <ul className="lista-etiquetas">
                    {etiquetas.map(etiqueta => (
                        <li
                            key={etiqueta.idEtiqueta}
                            className="etiqueta-item"
                            onClick={() => cargarEtiquetasPorTarea(etiqueta.idEtiqueta)}
                        >
                            <span className="etiqueta-nombre">{etiqueta.nombre}</span>
                            <button
                                className="btn-eliminar-etiqueta"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    eliminarEtiqueta(etiqueta.idEtiqueta);
                                }}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Contenido principal */}
            <div className="contenido-principal">
                <div className="header">
                    <button
                        className="btn-agregar-etiqueta"
                        onClick={() => setModalEtiqueta({ tarea: null, visible: true })}
                    >
                        Agregar Etiqueta
                    </button>
                </div>

                {etiquetaSeleccionada && (
                    <>
                        <h3>Tareas asociadas:</h3>
                        <div className="etiqueta-seleccionada">
                            <ul className="lista-tareas-etiqueta">
                                {tareasPorEtiqueta.length > 0 ? (
                                    tareasPorEtiqueta.map((tarea) => (
                                        <li key={tarea.idTarea} className="tarea" style={{ backgroundColor: tarea.color || '#ffffff' }} onClick={() => setModalTarea({ tarea, visible: true })}>
                                            <div className="tarea-header">
                                                <h2>{tarea.titulo}</h2>
                                                <h4>{tarea.prioridad}</h4>
                                            </div>
                                            <p className="descripcion">{tarea.descripcion}</p>
                                            <span>📅 {tarea.fechaLimite}</span>
                                            <br />
                                            <span>✅ {tarea.completada ? 'Completada' : 'Pendiente'}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p>No hay tareas para esta etiqueta.</p>
                                )}
                            </ul>
                        </div>
                    </>
                )}
            </div>

            <AgregarEtiqueta
                visible={modalEtiqueta.visible}
                tarea={modalEtiqueta.tarea}
                onClose={() => {
                    cerrarModalEtiqueta();
                    cargarEtiquetas();
                }}
            />
            <FormularioTareaModal
                visible={modalTarea.visible}
                tarea={modalTarea.tarea}
                onClose={cerrarModal}
                onTareaGuardada={() => {
           
                    cargarEtiquetasPorTarea(etiquetaSeleccionada);
                    cerrarModal();
                }}
            />s
        </div>
    );
}

export default ListarEtiquetas;
