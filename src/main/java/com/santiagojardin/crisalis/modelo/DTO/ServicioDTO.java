package com.santiagojardin.crisalis.modelo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Getter
@Setter
@AllArgsConstructor
public class ServicioDTO {
    private int id;
    @JsonProperty("servicio")
    private String servicio;
    @JsonProperty("precio")
    private double precio;
    @JsonProperty("cargo")
    private double cargo;

}
