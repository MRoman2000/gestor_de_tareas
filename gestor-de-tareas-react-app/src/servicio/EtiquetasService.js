import axios from "axios";

const BASE_URL = "http://localhost:8080/api";


export const crearEtiqueta = async (nombre) => {
    return await axios.post(`${BASE_URL}/etiquetas`, { nombre });
};

export const asignarEtiquetaATarea = async (idTarea, idEtiqueta) => {
    return await axios.post(`${BASE_URL}/tareas/${idTarea}/etiquetas/${idEtiqueta}`);
};

export const eliminarEtiqueta = async (idEtiqueta) => {
    return await axios.delete(`${BASE_URL}/etiquetas/${idEtiqueta}`);
};

export const obtenerEtiquetas = async () => {
    const res = await axios.get(`${BASE_URL}/etiquetas`);
    return res.data;
};

export const obtenerTareasPorEtiqueta = async (idEtiqueta) => {
    const res = await axios.get(`${BASE_URL}/etiquetas/${idEtiqueta}/tareas`);
    return res.data;
};

export const eliminarEtiquetaApi = async (idEtiqueta) => {
    return await axios.delete(`${BASE_URL}/etiquetas/${idEtiqueta}`);
};