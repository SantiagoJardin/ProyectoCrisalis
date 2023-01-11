package com.santiagojardin.crisalis.modelo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ClienteDTO {
    @JsonProperty("es_empresa")
    private boolean esEmpresa;
    @JsonProperty("nombre")
    private String nombre;
    @JsonProperty("identificacion")
    private String identificacion;
    @JsonProperty("apellido")
    private String apellido;
    @JsonProperty("direccion")
    private String direccion;
    @JsonProperty("email")
    private String email;
    @JsonProperty("razonSocial")
    private String razonSocial;
    @JsonProperty("fechaInicio")
    private LocalDate fechaInicio;
}
