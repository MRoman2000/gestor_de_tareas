import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ListarTareas.css'
import FormularioTareaModal from './FormularioTareaModal';
import AgregarEtiqueta from '../etiquetas/AgregarEtiqueta';
import { obtenerTareas, eliminarTarea } from "../servicio/TareaServicio";


export default function ListarTareas() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [busqueda, setBusqueda] = useState(searchParams.get("titulo") || "");
    const [prioridad, setPrioridad] = useState("");
    const [tareas, setTareas] = useState([]);
    const [modal, setModal] = useState({ tarea: null, visible: false });
    const [modalEtiqueta, setModalEtiqueta] = useState({ tarea: null, visible: false });
    const [tareaConMenu, setTareaConMenu] = useState(null);


    useEffect(() => {
        const titulo = searchParams.get("titulo");
        if (titulo) {
            cargarTareas({ titulo });
        } else if (prioridad) {
            cargarTareas({ prioridad });
        } else {
            cargarTareas();
        }
    }, [searchParams, prioridad]);


    const cargarTareas = async (filtros = {}) => {
        try {
            const data = await obtenerTareas(filtros);
            setTareas(data);
        } catch (error) {
            console.error("No se pudieron cargar las tareas");
        }
    };

    const deleteTarea = async (idTarea) => {
        try {
            await eliminarTarea(idTarea);
            cargarTareas();
        } catch (error) {
            console.error("Error al eliminar la tarea", error);
        }
    };

    const handleBuscar = () => {
        busqueda.trim()
            ? setSearchParams({ titulo: busqueda })
            : setSearchParams({});
    };


    const cerrarModal = () => setModal({ tarea: null, visible: false });
    const abrirModal = (tarea) => setModal({ tarea, visible: true });
    const cerrarModalEtiqueta = () => setModalEtiqueta({ tarea: null, visible: false });

    return (
        <div className="container">
            <div className="header">
                <input type="text" placeholder="Buscar tareas..." className="buscar-tareas" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <button className="btn-buscar" onClick={handleBuscar}>Buscar</button>
                <select
                    className="filtro-prioridad"
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}  >
                    <option value="">Todas las prioridades</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
                <button className="btn-agregar" onClick={() => setModal({ tarea: null, visible: true })}>Agregar Nueva Tarea  </button>


            </div>
            <ul className="lista-tareas">
                {tareas.map(t => (
                    <li
                        className="tarea" key={t.idTarea} style={{ backgroundColor: t.color || '#ffffff' }} onClick={() => abrirModal(t)}>
                        <div className="tarea-header">
                            <h2>{t.titulo}</h2>
                            <h4>{t.prioridad}</h4>
                        </div>

                        <p className="descripcion">{t.descripcion}</p>
                        <div className="etiquetas">
                            {t.etiquetas.map(et => (
                                <span key={et.idEtiqueta} className="etiqueta">{et.nombre}</span>
                            ))}
                        </div>
                        <div className="tarea-footer">
                            <span>📅 {t.fechaLimite}</span>
                            <span>✅ {t.completada ? 'Completada' : 'Pendiente'}</span>
                            <div className="menu-container">
                                <button
                                    className="btn-menu"
                                    onClick={(e) => { e.stopPropagation(); setTareaConMenu(t.idTarea); }}>⋮</button>
                                {tareaConMenu === t.idTarea && (
                                    <div className="menu-opciones" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => {
                                            setModal({ tarea: t, visible: true });
                                            setTareaConMenu(null);
                                        }}>Editar</button>
                                        <button onClick={() => deleteTarea(t.idTarea)}>Eliminar</button>
                                        <button onClick={() => {
                                            setModalEtiqueta({ tarea: t, visible: true });
                                            setTareaConMenu(null);
                                        }}>Agregar etiqueta</button>
                                        <button onClick={() => setTareaConMenu(null)}>Cerrar</button>
                                    </div>

                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <FormularioTareaModal
                visible={modal.visible}
                tarea={modal.tarea}
                onClose={cerrarModal}
                onTareaGuardada={() => {
                    cargarTareas();
                    cerrarModal();
                }}
            />

            <AgregarEtiqueta
                visible={modalEtiqueta.visible}
                tarea={modalEtiqueta.tarea}
                onClose={() => {
                    cerrarModalEtiqueta();
                    cargarTareas();
                }}
            />
        </div>
    );
}
