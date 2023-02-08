package com.santiagojardin.crisalis.controlador;

import com.santiagojardin.crisalis.modelo.DTO.ServicioDTO;
import com.santiagojardin.crisalis.modelo.Servicio;
import com.santiagojardin.crisalis.servicios.ServicioServicio;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("servicio")
public class ServicioControlador {

    private final ServicioServicio servicioServicio;

    public ServicioControlador(ServicioServicio servicioServicio) {
        this.servicioServicio = servicioServicio;
    }

    @PostMapping(value = "guardar_servicio", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Servicio guardarServicio(@RequestBody ServicioDTO servicioDTO, @RequestParam List<Integer> impuestosId) {
        return this.servicioServicio.guardarServicio(servicioDTO, impuestosId);
    }

    @GetMapping(value = "obtener_por_nombre", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Servicio> cargarServicioPorNombre(@RequestParam String servicio) {
        return this.servicioServicio.loadServicioByName(servicio);
    }

    @PostMapping(value = "borrar")
    public void borrarServicio(@RequestParam int id){
        this.servicioServicio.borrarPorId(id);
    }

    @GetMapping(value = "lista",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ServicioDTO> obtenerServiciosDB() {
        return  this.servicioServicio.getServiciosBD();
    }

    @PostMapping(value = "actualizar")
    public void actualizarServicio (@RequestParam String servicio, double precio, double cargo, int id, @RequestParam List<Integer> impuestosId) {
        this.servicioServicio.actualizarServicio(servicio, precio, cargo, id, impuestosId);
    }
}