import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import './FormularioTareaModal.css'
import { crearTarea, actualizarTarea } from '../servicio/TareaServicio';

function FormularioTareaModal({ visible, onClose, onTareaGuardada, tarea }) {
    const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);

    const [formulario, setFormulario] = useState(() => ({
        titulo: "",
        descripcion: "",
        fechaLimite: "",
        completada: false,
        prioridad: "Media",
        color: "",
        etiquetas: []
    }), []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormulario((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    useEffect(() => {
        // Cargar etiquetas al montar el componente
        const cargarEtiquetas = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/etiquetas");
                setEtiquetasDisponibles(res.data);
            } catch (error) {
                console.error("Error al cargar etiquetas:", error);
            }
        };

        cargarEtiquetas();

        // Actualizar el formulario cuando cambia la tarea
        setFormulario({
            titulo: tarea?.titulo ?? "",
            descripcion: tarea?.descripcion ?? "",
            fechaLimite: tarea?.fechaLimite ?? "",
            completada: tarea?.completada ?? false,
            prioridad: tarea?.prioridad ?? "Media",
            color: tarea?.color ?? "",
            etiquetas: tarea?.etiquetas?.map(e => e.idEtiqueta) ?? []
        });

    }, [tarea]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tarea?.idTarea)  {
                // Actualizar tarea existente
                await actualizarTarea(tarea.idTarea, formulario);
            } else {
                // Crear nueva tarea
                await crearTarea(formulario);
            }
            onClose();
            onTareaGuardada();
            limpiarFormulario();
        } catch (error) {
            console.error("Error al guardar la tarea", error);
        }
    };


    const limpiarFormulario = () => {
        setFormulario({
            titulo: "",
            descripcion: "",
            fechaLimite: "",
            completada: false,
            prioridad: "Media",
            color: "#ffffff",
            etiquetas: [],
        });
    }


    if (!visible) return null;

    return (
        <div className="modal-fondo">
            <div className="modal">
                <h2 className='titulo'>{tarea ? "Editar Tarea" : "Nueva Tarea"}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="titulo" value={formulario.titulo} onChange={handleChange} placeholder="Título" required />
                    <TextareaAutosize name="descripcion" value={formulario.descripcion} onChange={handleChange} placeholder="Descripción" maxRows={30} minRows={10} style={{ width: '100%' }} required />
                    <label>Fecha limite:</label>
                    <input type="date" name="fechaLimite" value={formulario.fechaLimite} onChange={handleChange} />
                    <label>Prioridad:</label>

                    <select name="prioridad" value={formulario.prioridad} onChange={handleChange}>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>

                    <label htmlFor="completada">Completada: </label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="completada"
                            name="completada"
                            checked={formulario.completada}
                            onChange={handleChange}
                        />

                    </div>

                    <div>
                        <label>Color:</label>
                        <input
                            className='color-input'
                            type="color"
                            name="color"
                            value={formulario.color}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Etiquetas:</label>
                    <select
                        multiple
                        value={formulario.etiquetas}
                        onChange={(e) => {
                            const seleccionadas = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                            setFormulario({ ...formulario, etiquetas: seleccionadas });
                        }}
                    >
                        {etiquetasDisponibles.map(etiqueta => (
                            <option key={etiqueta.idEtiqueta} value={etiqueta.idEtiqueta}>
                                {etiqueta.nombre}
                            </option>
                        ))}
                    </select>

                    <div className="modal-botones">
                        <button className='btn-cancelar' type="button" onClick={onClose}>Cancelar</button>
                        <button className='btn-guardar' type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default FormularioTareaModal;
