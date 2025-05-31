package project.gestor_de_tareas.servicio;

import project.gestor_de_tareas.DTO.TareaDTO;
import project.gestor_de_tareas.modelo.Tarea;

import java.util.List;

public interface IServicioTarea {

    public List<Tarea> listarTareas();

    public Tarea guardarTareaDesdeDTO(TareaDTO tarea);

    public Tarea buscarTareaPorId(Integer id);

    List<Tarea> findByTituloContainingIgnoreCase(String titulo);

    List<Tarea> obtenerTareasPorEtiqueta(Integer idEtiqueta);

    public Tarea actualizarTarea(Integer id, TareaDTO tarea);

    public void eliminarTarea(Integer id);

    public  void asignarEtiqueta (Integer idTarea, Integer idEtiqueta);

    List<Tarea> obtenerTareasPorPrioridad(String prioridad);
}
