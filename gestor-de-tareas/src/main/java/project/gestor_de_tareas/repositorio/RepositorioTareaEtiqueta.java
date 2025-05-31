package project.gestor_de_tareas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import project.gestor_de_tareas.modelo.TareaEtiqueta;

public interface RepositorioTareaEtiqueta  extends JpaRepository<TareaEtiqueta,Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM TareaEtiqueta te WHERE te.etiqueta.idEtiqueta = :etiquetaId")
    void eliminarAsociacionesPorEtiqueta(@Param("etiquetaId") Integer etiquetaId);
}
