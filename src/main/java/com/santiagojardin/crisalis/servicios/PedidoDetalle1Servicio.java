package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.Producto;
import com.santiagojardin.crisalis.modelo.PedidoDetalle;
import com.santiagojardin.crisalis.modelo.DTO.PedidoDetalleDTO;
import com.santiagojardin.crisalis.repositorios.PedidoDetalleRepositorio;
import com.santiagojardin.crisalis.repositorios.ProductoRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


 @Service
public class PedidoDetalleServicio {
     private final ProductoRepositorio productoRepositorio;
     private final PedidoDetalleRepositorio pedidoDetalleRepositorio;

     public PedidoDetalleServicio(ProductoRepositorio productoRepositorio  ,PedidoDetalleRepositorio pedidoDetalleRepositorio ) {
         this.pedidoDetalleRepositorio = pedidoDetalleRepositorio;
         this.productoRepositorio = productoRepositorio;
     }

     public PedidoDetalle guardarPedidoDetalle(PedidoDetalleDTO pedidoDetalleDTO, int productoId) {
         Producto producto = this.productoRepositorio.findById(productoId)
                 .orElseThrow(() -> new RuntimeException("No existe producto"));
         pedidoDetalleDTO.setProducto(producto);
         return this.pedidoDetalleRepositorio.save(new PedidoDetalle(pedidoDetalleDTO));
     }


     public void borrarPedidoDetalle(int pedidoDetalleId) {
         this.pedidoDetalleRepositorio.deleteAllById(pedidoDetalleId);
     }

     public List<PedidoDetalleDTO> getAllPedidoDetalles() {
         return this.pedidoDetalleRepositorio
                 .findAll()
                 .stream()
                 .map(PedidoDetalle::toDTO)
                 .collect(Collectors.toList());
     }
}
