package com.santiagojardin.crisalis.repositorios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.santiagojardin.crisalis.modelo.PedidoDetalle;


@Repository
public interface PedidoDetalleRepositorio extends JpaRepository<PedidoDetalle, Long> {
}
