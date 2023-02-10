package com.santiagojardin.crisalis.servicios.Impl;


import com.santiagojardin.crisalis.modelo.PedidoDetalle;
import com.santiagojardin.crisalis.repositorios.PedidoDetalleRepositorio;
import com.santiagojardin.crisalis.servicios.PedidoDetalleServicio;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PedidoDetalleServiciImpl implements PedidoDetalleServicio {

    private PedidoDetalleRepositorio pedidoDetalleRepositorio;


    @Override
    public PedidoDetalle crearDetalle_pedido(PedidoDetalle pedidoDetalle) {
        return pedidoDetalleRepositorio.save(pedidoDetalle);
    }

    @Override
    public PedidoDetalle obtenerDetalle_pedidoById(Long id) {
        return pedidoDetalleRepositorio.findById(id)
                        .orElseThrow(() -> new RuntimeException("No existe detalle de pedido con ese id"));
    }

    @Override
    public List<PedidoDetalle> obtenerLista() {
        return pedidoDetalleRepositorio.findAll();
    }

    @Override
    public PedidoDetalle actualizarDetalle_pedido(PedidoDetalle pedidoDetalle) {
        PedidoDetalle pedidoDetalle1 = pedidoDetalleRepositorio.findById(pedidoDetalle.getId())
                .orElseThrow(() -> new RuntimeException("No existe detalle de pedido con ese id"));
        pedidoDetalle1.setCantidad(pedidoDetalle.getCantidad());
        pedidoDetalle1.setPrecioUnidad(pedidoDetalle.getPrecioUnidad());
        pedidoDetalle1.setPrecioVenta(pedidoDetalle.getPrecioVenta());
        pedidoDetalle1.setProducto(pedidoDetalle.getProducto());
        pedidoDetalle1.setServicio(pedidoDetalle.getServicio());
        return pedidoDetalleRepositorio.save(pedidoDetalle1);
    }



    @Override
    public void borrarDetalle_pedido(Long id) {
        pedidoDetalleRepositorio.deleteById(id);

    }
}
