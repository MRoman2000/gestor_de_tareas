package project.gestor_de_tareas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import project.gestor_de_tareas.modelo.Tarea;

import java.util.List;

public interface RepositorioTarea extends JpaRepository<Tarea, Integer> {
    List<Tarea> findByTituloContainingIgnoreCase(String titulo);

    @Query("SELECT t FROM Tarea t JOIN t.etiquetas e WHERE e.idEtiqueta = :idEtiqueta")
    List<Tarea> findByEtiquetaId(@Param("idEtiqueta") Integer idEtiqueta);

    @Query("SELECT t FROM Tarea t WHERE t.prioridad = :prioridad")
    List<Tarea> findByPrioridad (@Param("prioridad") String prioridad);


}
