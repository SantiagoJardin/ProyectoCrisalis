package com.santiagojardin.crisalis.controlador;

import com.santiagojardin.crisalis.modelo.PedidoDetalle;
import com.santiagojardin.crisalis.modelo.DTO.PedidoDetalleDTO;
import com.santiagojardin.crisalis.servicios.PedidoDetalleServicio;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("pedido_detalle")
public class PedidoDetalleControlador {
    private final PedidoDetalleServicio pedidoDetalleServicio;

    public PedidoDetalleControlador(PedidoDetalleServicio pedidoDetalleServicio) {
        this.pedidoDetalleServicio = pedidoDetalleServicio;
    }


    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public PedidoDetalle guardarPedidoDetalle(@RequestBody PedidoDetalleDTO pedidoDetalleDTO, @RequestParam int productoId) {
        return this.pedidoDetalleServicio.guardarPedidoDetalle(pedidoDetalleDTO, productoId);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PedidoDetalleDTO> getAllPedidoDetalle() {
        return this.pedidoDetalleServicio.getAllPedidoDetalles();
    }
}
