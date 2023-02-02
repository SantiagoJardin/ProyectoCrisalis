package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.Impuesto;
import com.santiagojardin.crisalis.modelo.Producto;
import com.santiagojardin.crisalis.modelo.DTO.ProductoDTO;
import com.santiagojardin.crisalis.repositorios.ImpuestoRepositorio;
import com.santiagojardin.crisalis.repositorios.ProductoRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoServicio {
    private final ProductoRepositorio productoRepositorio;
    private final ImpuestoRepositorio impuestoRepositorio;

    public ProductoServicio(ProductoRepositorio productoRepositorio, ImpuestoRepositorio impuestoRepositorio) {
        this.productoRepositorio = productoRepositorio;
        this.impuestoRepositorio = impuestoRepositorio;
    }

    public Producto guardarProducto(ProductoDTO productoDTO, List<Integer> impuestosId) {
        List<Impuesto> impuestos = new ArrayList<Impuesto>();
        for (Integer i : impuestosId) {
            impuestos.add(this.impuestoRepositorio.findById(i).orElseThrow(
                    () -> new RuntimeException("Impuesto no encontrado.")
            ));
        }
        productoDTO.setImpuestos(impuestos);
        return this.productoRepositorio.save(new Producto(productoDTO));
    }

    public void borrarPorId(int id) {
        this.productoRepositorio.deleteById(id);
    }

    public List<Producto> loadProductoByName(String producto) {
        return this.productoRepositorio.findByProductoContainsIgnoreCase(producto);

    }

    public void actualizarProducto (String producto, double precio, LocalDate fecha,
                                   int stock, int id) {
        this.productoRepositorio.actualizarAtributos(producto, precio, fecha, stock, id);

    }

    public List<ProductoDTO> getProductosBD(){
        return this.productoRepositorio
                .findAll()
                .stream()
                .map(Producto::toDTO)
                .collect(Collectors.toList());
    }
}