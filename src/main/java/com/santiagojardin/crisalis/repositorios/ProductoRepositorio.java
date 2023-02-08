package com.santiagojardin.crisalis.repositorios;


import com.santiagojardin.crisalis.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
}
