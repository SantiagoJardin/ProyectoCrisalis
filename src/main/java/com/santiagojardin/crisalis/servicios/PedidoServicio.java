package com.santiagojardin.crisalis.servicios;


import com.santiagojardin.crisalis.modelo.Pedido;
import com.santiagojardin.crisalis.modelo.PedidoDetalle;


import java.util.List;

public interface PedidoServicio {
    Pedido crearPedido(Pedido pedido);
    Pedido obtenerPedidoById(Long id);
    List<Pedido> obtenerLista();
    Pedido actualizarPedido(Pedido pedido);
    void borrarPedido(Long id);
    List<PedidoDetalle> obtenerDetalles(int id);
}
