package com.santiagojardin.crisalis.repositorios;

import com.santiagojardin.crisalis.modelo.DTO.ImpuestoDTO;
import com.santiagojardin.crisalis.modelo.Impuesto;
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
public interface ImpuestoRepositorio extends JpaRepository <Impuesto, Integer>{
    @Query("select s from Impuesto s where upper(s.impuesto) like upper(concat('%', ?1, '%'))")
    List<Impuesto> findByImpuestoContainsIgnoreCase(String impuesto);

    @Transactional
    @Modifying
    @Query("delete from Impuesto p where p.id = ?1")

    void  deleteById(int id);
    Optional<Impuesto> findById(@NonNull int id);
    @Transactional
    @Modifying

    @Query("update Impuesto p set p.impuesto = ?1, p.porcentaje = ?2 where p.id = ?3")
    void actualizarAtributos(String impuesto, double porcentaje, int id);

}