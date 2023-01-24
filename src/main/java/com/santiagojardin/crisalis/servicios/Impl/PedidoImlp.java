package com.santiagojardin.crisalis.servicios.Impl;


import com.santiagojardin.crisalis.modelo.Pedido;
import com.santiagojardin.crisalis.repositorios.PedidoRepositorio;
import com.santiagojardin.crisalis.servicios.PedidoServicio;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PedidoImlp implements PedidoServicio {

    private PedidoRepositorio pedidoRepositorio;

    @Override
    public Pedido crearPedido(Pedido pedido) {
        return pedidoRepositorio.save(pedido);
    }

    @Override
    public Pedido obtenerPedidoById(Long id) {
        return pedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe pedido con ese id"));
    }

    @Override
    public List<Pedido> obtenerLista() {
        return pedidoRepositorio.findAll();
    }

    @Override
    public Pedido actualizarPedido(Pedido pedido) {
        Pedido pedido1 = pedidoRepositorio.findById(pedido.getId())
                .orElseThrow(() -> new RuntimeException("No existe pedido con ese id"));
        pedido1.setCliente(pedido.getCliente());
        pedido1.setTotal(pedido.getTotal());
        pedido1.setFecha(pedido.getFecha());
        return pedidoRepositorio.save(pedido1);
    }

    @Override
    public void borrarPedido(Long id) {
        pedidoRepositorio.deleteById(id);
    }
}
