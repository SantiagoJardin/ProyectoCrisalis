package com.santiagojardin.crisalis.modelo;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


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
            fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE
    )
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @JoinColumn(name = "total")
    private BigDecimal total;

    @JoinColumn(name = "fecha")
    private LocalDate fecha;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.MERGE
    )
    List<PedidoDetalle> pedidoDetalles;

}
