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
public class ProductoDTO {
    private int id;
    @JsonProperty("producto")
    private String producto;
    @JsonProperty("precio")
    private double precio;
    @JsonProperty("fecha")
    private LocalDate fecha;
    @JsonProperty("stock")
    private int stock;

}
