package com.santiagojardin.crisalis.servicios.Impl;


import com.santiagojardin.crisalis.modelo.Pedido;
import com.santiagojardin.crisalis.repositorios.PedidoDetalleRepositorio;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PedidoImlp implements PedidoServicio {

    private final PedidoDetalleRepositorio pedidoDetalleRepositorio;
    private PedidoRepositorio;


    @Override
    public Pedido crearPedido(Pedido pedido) {
        return pedidoReposiorio.save(pedido);
    }

    @Override
    public Pedido obtenerPedidoById(Long id) {
        return pedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe pedido con ese id"));
    }

    @Override
    public List
}
