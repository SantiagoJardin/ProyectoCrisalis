package com.santiagojardin.crisalis.repositorios;
import com.santiagojardin.crisalis.modelo.Producto;
import com.santiagojardin.crisalis.modelo.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import com.santiagojardin.crisalis.modelo.PedidoDetalle;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoDetalleRepositorio extends JpaRepository<PedidoDetalle, Long> {

    void deleteAllById(int pedidoDetalleId);
}
