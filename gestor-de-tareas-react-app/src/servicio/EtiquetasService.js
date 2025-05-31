import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const obtenerEtiquetas = async () => {
    return await axios.get(`${BASE_URL}/etiquetas`);
};

export const crearEtiqueta = async (nombre) => {
    return await axios.post(`${BASE_URL}/etiquetas`, { nombre });
};

export const asignarEtiquetaATarea = async (idTarea, idEtiqueta) => {
    return await axios.post(`${BASE_URL}/tareas/${idTarea}/etiquetas/${idEtiqueta}`);
};

export const eliminarEtiqueta = async (idEtiqueta) => {
    return await axios.delete(`${BASE_URL}/etiquetas/${idEtiqueta}`);
};