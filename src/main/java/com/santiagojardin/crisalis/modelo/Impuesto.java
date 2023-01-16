package com.santiagojardin.crisalis.modelo;

import com.santiagojardin.crisalis.modelo.DTO.ImpuestoDTO;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "impuesto")
public class Impuesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "impuesto")
    private String impuesto;

    @Column(name = "porcentaje")
    private double porcentaje;


    public Impuesto(ImpuestoDTO impuestoDTO){
        this.id = impuestoDTO.getId();
        this.impuesto = impuestoDTO.getImpuesto();
        this.porcentaje = impuestoDTO.getPorcentaje();
    }

    public ImpuestoDTO toDTO() {
        return ImpuestoDTO.builder()
                .id(this.id)
                .impuesto(this.impuesto)
                .porcentaje(this.porcentaje)
                .build();
    }
}