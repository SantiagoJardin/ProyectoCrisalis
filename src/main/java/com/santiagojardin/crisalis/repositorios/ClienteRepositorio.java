package com.santiagojardin.crisalis.repositorios;

import com.santiagojardin.crisalis.modelo.Cliente;
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
public interface ClienteRepositorio extends JpaRepository <Cliente, Integer>{
    @Query("select c from Cliente c where upper(c.nombre) like upper(concat('%', ?1, '%'))")
    List<Cliente> findByNombreContainsIgnoreCase(String nombre);


    @Transactional
    @Modifying
    @Query("delete from Cliente c where c.identificacion = ?1")

    void deleteByIdentificacion(String identificacion);
    @Transactional
    @Modifying

    @Query("update Cliente c set c.esEmpresa = ?1, c.nombre = ?2, c.apellido = ?3, c.direccion = ?4, c.email = ?5, c.razonSocial = ?6, c.fechaInicio = ?7 " +
            "where c.identificacion = ?8")
    void actualizarAtributos(boolean esEmpresa, String nombre, String apellido, String direccion, String email, String razonSocial, LocalDate fechaInicio, String identificacion);


    @Query("select c from Cliente c where c.identificacion = ?1")
    Optional<Cliente> findByIdentificacion(@NonNull String identificacion);
}
