package com.santiagojardin.crisalis.modelo;


import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "pedidoDetalle")
public class PedidoDetalle {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pedido_detalle_secuencia"
    )
    private Long id;
    private double precioVenta;
    private int cantidad;

    @ManyToOne (
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "producto_id")
    private Producto producto;
}
