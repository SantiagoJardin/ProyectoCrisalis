package com.santiagojardin.crisalis.controlador;


import com.santiagojardin.crisalis.modelo.PedidoDetalle;
import com.santiagojardin.crisalis.repositorios.PedidoDetalleRepositorio;
import com.santiagojardin.crisalis.servicios.PedidoDetalleServicio;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("pedido_detalle")
public class PedidoDetalleControlador {
    private PedidoDetalleServicio pedidoDetalleServicio;
    private final PedidoDetalleRepositorio pedidoDetalleRepositorio;


    @PostMapping(value = "new")
    public ResponseEntity<PedidoDetalle> crearPedidoDetalle(@RequestBody PedidoDetalle pedidoDetalle){
        PedidoDetalle crearPedidoDetalle = pedidoDetalleServicio.crearDetalle_pedido(pedidoDetalle);
        return new ResponseEntity<>(crearPedidoDetalle, HttpStatus.CREATED);
    }

    @GetMapping(value = "listaDetalle_pedido")
    public ResponseEntity<List<PedidoDetalle>> obtenerLista(){
        List<PedidoDetalle> detalle_pedidos = pedidoDetalleServicio.obtenerLista();
        return new ResponseEntity<>(detalle_pedidos, HttpStatus.OK);
    }

    @GetMapping(value = "obtenerDetalle_pedidoById/{id}")
    public ResponseEntity<PedidoDetalle> obtenerDetalle_pedidoById(@PathVariable("id") Long id){
        PedidoDetalle detalle_pedido = pedidoDetalleServicio.obtenerDetalle_pedidoById(id);
        return new ResponseEntity<>(detalle_pedido, HttpStatus.OK);
    }

    @PutMapping(value = "actualizarDetalle_pedido/{id}")
    public ResponseEntity<PedidoDetalle> actualizarPedidoDetalle(@PathVariable("id") Long id,
                                                             @RequestBody PedidoDetalle pedidoDetalle){
        pedidoDetalle.setId(id);
        PedidoDetalle actualizarDetalle_pedido = pedidoDetalleServicio.actualizarDetalle_pedido(pedidoDetalle);
        return new ResponseEntity<>(actualizarDetalle_pedido, HttpStatus.OK);
    }

    @DeleteMapping(value = "borrarDetalle_pedido/{id}")
    public ResponseEntity<String> borrarDetalle_pedido(@PathVariable("id") Long id){
        pedidoDetalleServicio.borrarDetalle_pedido(id);
        return new ResponseEntity<>("Detalle pedido eliminado!", HttpStatus.OK);
    }
}
