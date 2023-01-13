package com.santiagojardin.crisalis.repositorios;

import com.santiagojardin.crisalis.modelo.DTO.ServicioDTO;
import com.santiagojardin.crisalis.modelo.Servicio;
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
public interface ServicioRepositorio extends JpaRepository <Servicio, Integer>{
    @Query("select s from Servicio s where upper(s.servicio) like upper(concat('%', ?1, '%'))")
    List<Servicio> findByServicioContainsIgnoreCase(String servicio);

    @Transactional
    @Modifying
    @Query("delete from Servicio p where p.id = ?1")

    void  deleteById(int id);
    Optional<Servicio> findById(@NonNull int id);
    @Transactional
    @Modifying

    @Query("update Servicio p set p.servicio = ?1, p.precio = ?2, p.cargo = ?3 where p.id = ?4")
    void actualizarAtributos(String servicio, double precio, double cargo, int id);

}