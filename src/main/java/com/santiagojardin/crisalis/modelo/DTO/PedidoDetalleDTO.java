package com.santiagojardin.crisalis.modelo.DTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.santiagojardin.crisalis.modelo.Producto;
import com.santiagojardin.crisalis.modelo.Servicio;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoDetalleDTO {
    private int id;

    @JsonProperty("producto")
    private Producto producto = null;

    @JsonProperty("servicio")
    private Servicio servicio = null;

    @JsonProperty("precioVenta")
    private double precioVenta;

    @JsonProperty("cantidad")
    private  int cantidad;

    @JsonProperty("precioUnidad")
    private double precioUnidad;
}
