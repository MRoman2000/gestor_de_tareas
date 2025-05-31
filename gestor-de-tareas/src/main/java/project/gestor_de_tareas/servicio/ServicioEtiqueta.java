package project.gestor_de_tareas.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.gestor_de_tareas.modelo.Etiqueta;
import project.gestor_de_tareas.repositorio.RepositorioEtiqueta;
import project.gestor_de_tareas.repositorio.RepositorioTareaEtiqueta;

import java.util.List;

@Service
public class ServicioEtiqueta implements IServicioEtiqueta {

    @Autowired
    private RepositorioEtiqueta repositorioEtiqueta;

    @Autowired
    private RepositorioTareaEtiqueta repositorioTareaEtiqueta;

    @Override
    public List<Etiqueta> listarEtiquetas() {
        return repositorioEtiqueta.findAll();
    }

    @Override
    public Etiqueta guardarEtiqueta(Etiqueta etiqueta) {
        return repositorioEtiqueta.save(etiqueta);
    }

    @Override
    @Transactional
    public void eliminarEtiqueta(Integer id) {
        // Primero eliminar relaciones en la tabla intermedia
        repositorioTareaEtiqueta.eliminarAsociacionesPorEtiqueta(id);

        // Luego eliminar la etiqueta
        repositorioEtiqueta.deleteById(id);
    }
}
