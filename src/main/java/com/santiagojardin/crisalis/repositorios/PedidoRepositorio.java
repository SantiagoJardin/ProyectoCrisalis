package com.santiagojardin.crisalis.repositorios;


import com.santiagojardin.crisalis.modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {

}
