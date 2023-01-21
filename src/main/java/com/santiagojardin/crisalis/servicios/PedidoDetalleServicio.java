package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.DTO.PedidoDetalleDTO;
import com.santiagojardin.crisalis.modelo.PedidoDetalle;

import java.util.List;

public interface PedidoDetalleServicio {
    PedidoDetalle crearDetalle_pedido(PedidoDetalle pedidoDetalle);
    PedidoDetalle obtenerDetalle_pedidoById(Long id);
    List<PedidoDetalle> obtenerLista();
    PedidoDetalle actualizarDetalle_pedido(PedidoDetalle pedidoDetalle);
    void borrarDetalle_pedido(Long id);
}
