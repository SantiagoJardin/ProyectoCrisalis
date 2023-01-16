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
public class ImpuestoDTO {
    private int id;
    @JsonProperty("impuesto")
    private String impuesto;
    @JsonProperty("porcentaje")
    private double porcentaje;
}