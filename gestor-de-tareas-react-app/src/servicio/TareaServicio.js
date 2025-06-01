import axios from "axios";


const API_BASE_URL = "http://localhost:8080/api";


export const obtenerTarea = async () => {
    return await axios.get(`${API_BASE_URL}/tareas`);
}

export const crearTarea = async (formulario) => {
    return await axios.post(`${API_BASE_URL}/tareas`, formulario);
}

export const actualizarTarea = async (idTarea, formulario) => {
    return await axios.put(`${API_BASE_URL}/tareas/${idTarea}`, formulario);
}

export const eliminarTarea = async (idTarea) => {
    return await axios.delete(`${API_BASE_URL}/tareas/${idTarea}`);
};

export async function obtenerTareas(filtros = {}) {
    let endpoint = "/tareas";

    if (filtros.titulo) {
        endpoint = "/tareas/buscar";
    } else if (filtros.prioridad) {
        endpoint = "/tareas/prioridad";
    }

    const respuesta = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params: filtros,
    });

    return respuesta.data;

}






