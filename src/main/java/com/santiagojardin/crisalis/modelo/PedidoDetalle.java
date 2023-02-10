package com.santiagojardin.crisalis.modelo;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;


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
    private Long id;

    @ManyToOne (
            fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE
    )
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE
    )
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @JoinColumn(name = "precioVenta")
    private BigDecimal precioVenta;

    @JoinColumn(name = "cantidad")
    private int cantidad;

    @JoinColumn(name = "precioUnidad")
    private BigDecimal precioUnidad;



}
