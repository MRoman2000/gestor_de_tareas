package project.gestor_de_tareas.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Etiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEtiqueta;
    private String nombre;

    @ManyToMany(mappedBy = "etiquetas")
    @JsonIgnore
    private List<Tarea> tareas = new ArrayList<>();


    public Etiqueta() {
    }

    public Etiqueta(Integer idEtiqueta, String nombre) {
        this.idEtiqueta = idEtiqueta;
        this.nombre = nombre;

    }

    public Integer getIdEtiqueta() {
        return idEtiqueta;
    }

    public void setIdEtiqueta(Integer idEtiqueta) {
        this.idEtiqueta = idEtiqueta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Tarea> getTareas() {
        return tareas;
    }

    public void setTareas(List<Tarea> tareas) {
        this.tareas = tareas;
    }
}
