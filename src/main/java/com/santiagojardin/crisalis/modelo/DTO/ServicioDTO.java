package com.santiagojardin.crisalis.modelo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.santiagojardin.crisalis.modelo.Impuesto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


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
    @JsonProperty("impuestos")
    private List<Impuesto> impuestos;

}
