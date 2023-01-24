package com.santiagojardin.crisalis.modelo;

import com.santiagojardin.crisalis.modelo.DTO.ClienteDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "esEmpresa")
    private boolean esEmpresa;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "identificacion")
    private String identificacion;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "email")
    private String email;

    @Column(name = "razonSocial")
    private String razonSocial;

    @Column(name = "fechaInicio")
    private LocalDate fechaInicio;

    public Cliente(ClienteDTO clienteDTO){
        this.id = clienteDTO.getId();
        this.esEmpresa = clienteDTO.isEsEmpresa();
        this.nombre = clienteDTO.getNombre();
        this.identificacion = clienteDTO.getIdentificacion();
        this.apellido = clienteDTO.getApellido();
        this.direccion = clienteDTO.getDireccion();
        this.email = clienteDTO.getEmail();
        this.razonSocial = clienteDTO.getRazonSocial();
        this.fechaInicio = clienteDTO.getFechaInicio();
    }
    public ClienteDTO toDTO() {
        return ClienteDTO.builder()
                .id(this.id)
                .esEmpresa(this.esEmpresa)
                .nombre(this.nombre)
                .identificacion(this.identificacion)
                .apellido(this.apellido)
                .direccion(this.direccion)
                .email(this.email)
                .razonSocial(this.razonSocial)
                .fechaInicio(this.fechaInicio)
                .build();
    }
}
