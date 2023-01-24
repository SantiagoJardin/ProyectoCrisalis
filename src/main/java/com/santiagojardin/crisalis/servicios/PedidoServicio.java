package com.santiagojardin.crisalis.servicios;


import com.santiagojardin.crisalis.modelo.Pedido;


import java.util.List;

public interface PedidoServicio {
    Pedido crearPedido(Pedido pedido);
    Pedido obtenerPedidoById(Long id);
    List<Pedido> obtenerLista();
    Pedido actualizarPedido(Pedido pedido);
    void borrarPedido(Long id);
}
