package project.gestor_de_tareas.controlador;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.gestor_de_tareas.DTO.TareaDTO;
import project.gestor_de_tareas.modelo.Tarea;
import project.gestor_de_tareas.servicio.ServicioTarea;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class ControladorTarea {

    @Autowired
    private ServicioTarea servicioTarea;


    @GetMapping("/tareas")
    private List<Tarea> getTareas() {
        return servicioTarea.listarTareas();
    }

    @PostMapping("/tareas")
    public ResponseEntity<Tarea> agregarTarea(@RequestBody TareaDTO tareaDTO) {
        Tarea tarea = servicioTarea.guardarTareaDesdeDTO(tareaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(tarea);
    }

    @PutMapping("/tareas/{id}")
    public ResponseEntity<Tarea> actualizarTarea(@PathVariable Integer id, @RequestBody TareaDTO tareaEditar) {
        Tarea tarea = servicioTarea.actualizarTarea(id, tareaEditar);
        return ResponseEntity.ok(tarea);
    }

    @DeleteMapping("/tareas/{id}")
    public void eliminarTarea(@PathVariable Integer id) {
        servicioTarea.eliminarTarea(id);
    }

    @PostMapping("/tareas/{idTarea}/etiquetas/{idEtiqueta}")
    public ResponseEntity<?> asignarEtiqueta(
            @PathVariable Integer idTarea,
            @PathVariable Integer idEtiqueta) {
        servicioTarea.asignarEtiqueta(idTarea, idEtiqueta);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tareas/buscar")
    public List<Tarea> buscarTarea(@RequestParam(required = false) String titulo) {
        if (titulo != null) {
            return servicioTarea.findByTituloContainingIgnoreCase(titulo);
        }
        return servicioTarea.listarTareas();

    }

    @GetMapping("/tareas/prioridad")
    public List<Tarea> obtenerPorPrioridad(@RequestParam String prioridad) {
        return servicioTarea.obtenerTareasPorPrioridad(prioridad);
    }


}
