package com.santiagojardin.crisalis.modelo;


import com.santiagojardin.crisalis.modelo.DTO.PedidoDetalleDTO;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "pedido_detalle")
public class PedidoDetalle {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pedido_detalle_secuencia"
    )
    private int id;

    @ManyToOne (
            fetch = FetchType.EAGER
    )

    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @JoinColumn(name = "precioVenta")
    private double precioVenta;

    @JoinColumn(name = "cantidad")
    private int cantidad;

    @JoinColumn(name = "precioUnidad")
    private double precioUnidad;

    public PedidoDetalle(PedidoDetalleDTO pedidoDetalleDTO) {
        this.producto = pedidoDetalleDTO.getProducto();
        this.servicio = pedidoDetalleDTO.getServicio();
        this.precioVenta = pedidoDetalleDTO.getPrecioVenta();
        this.cantidad = pedidoDetalleDTO.getCantidad();
        this.precioUnidad = pedidoDetalleDTO.getPrecioUnidad();
    }

    public PedidoDetalleDTO toDTO() {
        return PedidoDetalleDTO.builder()
                .id(this.id)
                .producto(this.producto)
                .servicio(this.servicio)
                .precioVenta(this.precioVenta)
                .cantidad(this.cantidad)
                .precioUnidad(this.precioUnidad)
                .build();
    }
}
