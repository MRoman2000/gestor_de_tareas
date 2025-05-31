package project.gestor_de_tareas.servicio;

import project.gestor_de_tareas.modelo.Etiqueta;

import java.util.List;

public interface IServicioEtiqueta {

    public List<Etiqueta> listarEtiquetas();

    public Etiqueta guardarEtiqueta(Etiqueta etiqueta);

    public  void eliminarEtiqueta(Integer id);

}
