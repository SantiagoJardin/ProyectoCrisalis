package com.santiagojardin.crisalis.modelo;

import com.santiagojardin.crisalis.modelo.DTO.ProductoDTO;
import com.santiagojardin.crisalis.modelo.DTO.ProductoDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "producto")
    private String producto;

    @Column(name = "precio")
    private double precio;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "stock")
    private int stock;

    @ManyToMany(
            fetch = FetchType.EAGER
    )
    private List<Impuesto> impuestos;

    public Producto(ProductoDTO productoDTO){
        this.id = productoDTO.getId();
        this.producto = productoDTO.getProducto();
        this.precio = productoDTO.getPrecio();
        this.fecha = productoDTO.getFecha();
        this.stock = productoDTO.getStock();
        this.impuestos = productoDTO.getImpuestos();
    }

    public ProductoDTO toDTO() {
        return ProductoDTO.builder()
                .id(this.id)
                .producto(this.producto)
                .precio(this.precio)
                .fecha(this.fecha)
                .stock(this.stock)
                .impuestos(this.impuestos)
                .build();
    }
}
