package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.Producto;
import com.santiagojardin.crisalis.modelo.DTO.ProductoDTO;
import com.santiagojardin.crisalis.repositorios.ProductoRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoServicio {
    private final ProductoRepositorio productoRepositorio;

    public ProductoServicio(ProductoRepositorio productoRepositorio) {
        this.productoRepositorio = productoRepositorio;
    }

    public Producto guardarProducto(ProductoDTO productoDTO) {
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