package project.gestor_de_tareas.servicio;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.gestor_de_tareas.DTO.TareaDTO;
import project.gestor_de_tareas.modelo.Etiqueta;
import project.gestor_de_tareas.modelo.Tarea;
import project.gestor_de_tareas.repositorio.RepositorioEtiqueta;
import project.gestor_de_tareas.repositorio.RepositorioTarea;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioTarea implements IServicioTarea {

    @Autowired
    private RepositorioTarea repositorioTarea;


    @Autowired
    private RepositorioEtiqueta repositorioEtiqueta;

    @Override
    public List<Tarea> listarTareas() {
        return repositorioTarea.findAll();
    }


    @Override
    public List<Tarea> obtenerTareasPorPrioridad(String prioridad) {
        return repositorioTarea.findByPrioridad(prioridad);
    }

    @Override
    public Tarea guardarTareaDesdeDTO(TareaDTO dto) {
        Tarea tarea = new Tarea();
        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        tarea.setFechaLimite(dto.getFechaLimite());
        tarea.setCompletada(dto.isCompletada());
        tarea.setPrioridad(dto.getPrioridad());
        tarea.setColor(dto.getColor());
        if (dto.getEtiquetas() != null && !dto.getEtiquetas().isEmpty()) {
            List<Etiqueta> etiquetas = repositorioEtiqueta.findAllById(dto.getEtiquetas());
            tarea.setEtiquetas(etiquetas);
        }
        return repositorioTarea.save(tarea);
    }


    @Override
    public Tarea buscarTareaPorId(Integer id) {
        return repositorioTarea.findById(id).orElse(null);
    }

    @Override
    public List<Tarea> findByTituloContainingIgnoreCase(String titulo) {
        return repositorioTarea.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public List<Tarea> obtenerTareasPorEtiqueta(Integer idEtiqueta) {
        return repositorioTarea.findByEtiquetaId(idEtiqueta);
    }

    @Override
    public Tarea actualizarTarea(Integer id, TareaDTO dto) {
        Optional<Tarea> tareaExistente = repositorioTarea.findById(id);
        if (tareaExistente.isPresent()) {
            Tarea tarea = tareaExistente.get();
            tarea.setTitulo(dto.getTitulo());
            tarea.setDescripcion(dto.getDescripcion());
            tarea.setFechaLimite(dto.getFechaLimite());
            tarea.setCompletada(dto.isCompletada());
            tarea.setColor(dto.getColor());
            tarea.setPrioridad(dto.getPrioridad());

            if (dto.getEtiquetas() != null && !dto.getEtiquetas().isEmpty()) {
                List<Etiqueta> etiquetas = repositorioEtiqueta.findAllById(dto.getEtiquetas());
                tarea.setEtiquetas(etiquetas);
            } else {
                tarea.getEtiquetas().clear();
            }

            return repositorioTarea.save(tarea);
        } else {
            throw new EntityNotFoundException("Tarea no encontrada");
        }
    }


    @Override
    public void eliminarTarea(Integer id) {
        repositorioTarea.deleteById(id);
    }

    @Override
    public void asignarEtiqueta(Integer idTarea, Integer idEtiqueta) {
        Tarea tarea = repositorioTarea.findById(idTarea).orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        Etiqueta etiqueta = repositorioEtiqueta.findById(idEtiqueta).orElseThrow(() -> new RuntimeException("Etiqueta no encontrada"));

        tarea.getEtiquetas().add(etiqueta);
        repositorioTarea.save(tarea);
    }
}
