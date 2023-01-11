package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.Cliente;
import com.santiagojardin.crisalis.modelo.DTO.ClienteDTO;
import com.santiagojardin.crisalis.repositorios.ClienteRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteServicio {
    private final ClienteRepositorio clienteRepositorio;

    public ClienteServicio(ClienteRepositorio clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    public Cliente guardarCliente(ClienteDTO clienteDTO) {
        return this.clienteRepositorio.save(new Cliente(clienteDTO));
    }

    public void borrarPorIDENTIFICACION(String identificacion) {
       this.clienteRepositorio.deleteByIdentificacion(identificacion);
    }

    public ClienteDTO loadClienteByIdentificacion(String identificacion) {
        return this.clienteRepositorio.findByIdentificacion(identificacion)
                .orElseThrow(
                        () ->  new RuntimeException("No existe el cliente solicitado")
                ).toDTO();
    }

    public List<Cliente> loadClienteByName(String nombre) {
        return this.clienteRepositorio.findByNombreContainsIgnoreCase(nombre);
    }

    public void actualizarCliente (boolean esEmpresa, String nombre, String identificacion,
                                   String apellido, String direccion, String email,
                                   String razonSocial, LocalDate fechaInicio) {
        this.clienteRepositorio.actualizarAtributos(esEmpresa, nombre, apellido, direccion, email, razonSocial, fechaInicio, identificacion);

    }

    public List<ClienteDTO> getClientesBD(){
        return this.clienteRepositorio
                .findAll()
                .stream()
                .map(Cliente::toDTO)
                .collect(Collectors.toList());
    }
}
