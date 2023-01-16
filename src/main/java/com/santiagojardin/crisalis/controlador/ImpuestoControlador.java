package com.santiagojardin.crisalis.controlador;

import com.santiagojardin.crisalis.modelo.DTO.ImpuestoDTO;
import com.santiagojardin.crisalis.modelo.Impuesto;
import com.santiagojardin.crisalis.servicios.ImpuestoServicio;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("impuesto")
public class ImpuestoControlador {

    private final ImpuestoServicio impuestoServicio;

    public ImpuestoControlador(ImpuestoServicio impuestoServicio) {
        this.impuestoServicio = impuestoServicio;
    }

    @PostMapping(value = "guardar_impuesto", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Impuesto guardarImpuesto(@RequestBody ImpuestoDTO impuestoDTO) {
        return this.impuestoServicio.guardarImpuesto(impuestoDTO);
    }

    @GetMapping(value = "obtener_por_nombre", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Impuesto> cargarImpuestoPorNombre(@RequestParam String impuesto) {
        return this.impuestoServicio.loadImpuestoByName(impuesto);
    }

    @PostMapping(value = "borrar")
    public void borrarImpuesto(@RequestParam int id){
        this.impuestoServicio.borrarPorId(id);
    }

    @GetMapping(value = "lista",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ImpuestoDTO> obtenerImpuestoDB() {
        return  this.impuestoServicio.getImpuestosBD();
    }

    @PostMapping(value = "actualizar")
    public void actualizarImpuesto (@RequestParam String impuesto, double porcentaje, int id) {
        this.impuestoServicio.actualizarImpuesto(impuesto, porcentaje, id);
    }
}