package com.santiagojardin.crisalis.modelo;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "pedido")
public class Pedido {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pedido_secuencia"
    )
    private Long id;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne (
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "pedido_detalle_id")
    private PedidoDetalle pedidoDetalle;

    @JoinColumn(name = "total")
    private BigDecimal total;

    @JoinColumn(name = "fecha")
    private LocalDate fecha;

}
