package com.santiagojardin.crisalis.repositorios;

import com.santiagojardin.crisalis.modelo.DTO.ProductoDTO;
import com.santiagojardin.crisalis.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepositorio extends JpaRepository <Producto, Integer>{
    @Query("select p from Producto p where upper(p.producto) like upper(concat('%', ?1, '%'))")
    List<Producto> findByProductoContainsIgnoreCase(String producto);


    @Transactional
    @Modifying
    @Query("delete from Producto p where p.id = ?1")

    void  deleteById(int id);
    Optional<Producto> findById(@NonNull int id);
    @Transactional
    @Modifying

    @Query("update Producto p set p.producto = ?1, p.precio = ?2, p.fecha = ?3, p.stock = ?4 where p.id = ?5")
    void actualizarAtributos(String producto, double precio, LocalDate fecha, int stock, int id);


}
