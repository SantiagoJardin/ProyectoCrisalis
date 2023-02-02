package com.santiagojardin.crisalis.modelo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.santiagojardin.crisalis.modelo.Impuesto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

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
    @JsonProperty("impuestos")
    private List<Impuesto> impuestos;
}
