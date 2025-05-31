import axios from "axios";


const API_BASE_URL = "http://localhost:8080/api";


export const obtenerTarea = async () => {
    return await axios.get(`${API_BASE_URL}/tareas`);
}


export async function obtenerTareas(filtros = {}) {
    try {
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
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
    }
}


export const eliminarTarea = async (idTarea) => {
    try {
        await axios.delete(`${API_BASE_URL}/tareas/${idTarea}`);
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
    }
}



