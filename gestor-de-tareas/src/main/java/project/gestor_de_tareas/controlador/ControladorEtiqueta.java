package project.gestor_de_tareas.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.gestor_de_tareas.modelo.Etiqueta;
import project.gestor_de_tareas.modelo.Tarea;
import project.gestor_de_tareas.servicio.ServicioEtiqueta;
import project.gestor_de_tareas.servicio.ServicioTarea;

import java.util.List;

@RestController
@RequestMapping("/api/etiquetas")
@CrossOrigin("http://localhost:3000")
public class ControladorEtiqueta {

    @Autowired
    private ServicioEtiqueta servicioEtiqueta;

    @Autowired
    private ServicioTarea servicioTarea;

    @GetMapping
    private List<Etiqueta> getEtiquetas() {
        return servicioEtiqueta.listarEtiquetas();
    }
    @PostMapping
    private ResponseEntity<Etiqueta> guardarEtiqueta(@RequestBody Etiqueta nuevaEtiqueta) {
        Etiqueta etiqueta = servicioEtiqueta.guardarEtiqueta(nuevaEtiqueta);
        return ResponseEntity.status(HttpStatus.CREATED).body(etiqueta);
    }
    @GetMapping("/{idEtiqueta}/tareas")
    public ResponseEntity<List<Tarea>> obtenerTareasPorEtiqueta(@PathVariable Integer idEtiqueta) {
        List<Tarea> tareas = servicioTarea.obtenerTareasPorEtiqueta(idEtiqueta);
        return ResponseEntity.ok(tareas);
    }

    @DeleteMapping("/{id}")
    private void eliminarEtiquetas(@PathVariable Integer id) {
        servicioEtiqueta.eliminarEtiqueta(id);
    }
}
