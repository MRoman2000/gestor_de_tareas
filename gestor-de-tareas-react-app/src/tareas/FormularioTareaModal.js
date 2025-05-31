import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import './FormularioTareaModal.css'


function FormularioTareaModal({ visible, onClose, onTareaGuardada, tarea }) {
    const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);

    const [formulario, setFormulario] = useState({
        titulo: "",
        descripcion: "",
        fechaLimite: "",
        completada: false,
        prioridad: "Media",
        color: "",
        etiquetas: [] // nuevo campo
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });
    };

    useEffect(() => {
        if (!tarea) {
            setFormulario({
                titulo: "",
                descripcion: "",
                fechaLimite: "",
                completada: false,
                prioridad: "Media",
                color: "",
                etiquetas: []
            });
        } else {
            setFormulario({
                titulo: tarea.titulo || "",
                descripcion: tarea.descripcion || "",
                fechaLimite: tarea.fechaLimite || "",
                completada: tarea.completada || false,
                prioridad: tarea.prioridad || "Media",
                color: tarea.color,
                etiquetas: tarea.etiquetas?.map(e => e.idEtiqueta) || []
            });
        }
    }, [tarea]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tarea && tarea.idTarea) {
                await axios.put(`http://localhost:8080/api/tareas/${tarea.idTarea}`, formulario);
            } else {
                // Solo esto basta si el backend ya asigna etiquetas
                await axios.post("http://localhost:8080/api/tareas", formulario);
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

    useEffect(() => {
        const cargarEtiquetas = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/etiquetas");
                setEtiquetasDisponibles(res.data);
            } catch (error) {
                console.error("Error al cargar etiquetas:", error);
            }
        };

        cargarEtiquetas();
    }, []);

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
