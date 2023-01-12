package com.santiagojardin.crisalis.modelo;

import com.santiagojardin.crisalis.modelo.DTO.ServicioDTO;
import com.santiagojardin.crisalis.modelo.DTO.ServicioDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "servicio")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "servicio")
    private String servicio;

    @Column(name = "precio")
    private double precio;

    @Column(name = "cargo")
    private double cargo;


    public Servicio(ServicioDTO servicioDTO){
        this.id = servicioDTO.getId();
        this.servicio = servicioDTO.getServicio();
        this.precio = servicioDTO.getPrecio();
        this.cargo = servicioDTO.getCargo();
    }

    public ServicioDTO toDTO() {
        return ServicioDTO.builder()
                .id(this.id)
                .servicio(this.servicio)
                .precio(this.precio)
                .fecha(this.cargo)
                .build();
    }
}