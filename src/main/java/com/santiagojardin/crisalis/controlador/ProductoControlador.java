package com.santiagojardin.crisalis.controlador;

import com.santiagojardin.crisalis.modelo.DTO.ProductoDTO;
import com.santiagojardin.crisalis.modelo.Producto;
import com.santiagojardin.crisalis.servicios.ProductoServicio;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("producto")
public class ProductoControlador {

    private final ProductoServicio productoServicio;

    public ProductoControlador(ProductoServicio productoServicio) {
        this.productoServicio = productoServicio;
    }

    @PostMapping(value = "guardar_producto", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Producto guardarProducto(@RequestBody ProductoDTO productoDTO) {
        return this.productoServicio.guardarProducto(productoDTO);
    }

    @GetMapping(value = "obtener_por_nombre", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Producto> cargarProductoPorNombre(@RequestParam String producto) {
        return this.productoServicio.loadProductoByName(producto);
    }

    @PostMapping(value = "borrar")
    public void borrarProducto(@RequestParam int id){
        this.productoServicio.borrarPorId(id);
    }

    @GetMapping(value = "lista",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductoDTO> obtenerProductosDB() {
        return  this.productoServicio.getProductosBD();
    }

    @PostMapping(value = "actualizar")
    public void actualizarProducto (@RequestParam String producto, double precio, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
                                   int stock, int id) {
        this.productoServicio.actualizarProducto(producto, precio, fecha, stock, id);
    }
}