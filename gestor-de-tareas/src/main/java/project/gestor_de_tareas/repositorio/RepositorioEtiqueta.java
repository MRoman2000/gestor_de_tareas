package project.gestor_de_tareas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.gestor_de_tareas.modelo.Etiqueta;

@Repository
public interface RepositorioEtiqueta extends JpaRepository<Etiqueta, Integer> {


}
