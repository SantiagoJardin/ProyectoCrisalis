package com.santiagojardin.crisalis.controlador;

import com.santiagojardin.crisalis.modelo.Cliente;
import com.santiagojardin.crisalis.modelo.DTO.ClienteDTO;
import com.santiagojardin.crisalis.servicios.ClienteServicio;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("cliente")
public class ClienteControlador {

    private final ClienteServicio clienteServicio;

    public ClienteControlador(ClienteServicio clienteServicio) {
        this.clienteServicio = clienteServicio;
    }

    @PostMapping(value = "guardar_cliente", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Cliente guardarCliente(@RequestBody ClienteDTO clienteDTO) {
        return this.clienteServicio.guardarCliente(clienteDTO);
    }

    @GetMapping(value = "obtener_por_identificacion", produces = MediaType.APPLICATION_JSON_VALUE)
    public ClienteDTO cargarClientePorIdentificacion(@RequestParam String identificacion) {
        return this.clienteServicio.loadClienteByIdentificacion(identificacion);
    }

    @GetMapping(value = "obtener_por_nombre", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Cliente> cargarClientePorNombre(@RequestParam String nombre) {
        return this.clienteServicio.loadClienteByName(nombre);
    }

    @PostMapping(value = "actualizar")
    public void actualizarCliente (@RequestParam boolean esEmpresa, String nombre, String identificacion,
                                   String apellido, String direccion, String email,
                                   String razonSocial, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio) {
        this.clienteServicio.actualizarCliente(esEmpresa, nombre, identificacion, apellido, direccion, email, razonSocial, fechaInicio);
    }

    @PostMapping(value = "borrar")
    public void borrarCliente(@RequestParam String identificacion){
        this.clienteServicio.borrarPorIDENTIFICACION(identificacion);
    }

    @GetMapping(value = "lista",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ClienteDTO> obtenerClientesDB() {
        return  this.clienteServicio.getClientesBD();
    }
}
