package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.Servicio;
import com.santiagojardin.crisalis.modelo.DTO.ServicioDTO;
import com.santiagojardin.crisalis.repositorios.ServicioRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioServicio {
    private final ServicioRepositorio servicioRepositorio;

    public ServicioServicio(ServicioRepositorio servicioRepositorio) {
        this.servicioRepositorio = servicioRepositorio;
    }

    public Servicio guardarServicio(ServicioDTO servicioDTO) {
        return this.servicioRepositorio.save(new Servicio(servicioDTO));
    }

    public void borrarPorId(int id) {
        this.servicioRepositorio.deleteById(id);
    }

    public List<Servicio> loadServicioByName(String servicio) {
        return this.servicioRepositorio.findByServicioContainsIgnoreCase(servicio);

    }

    public void actualizarServicio (String servicio, double precio, double cargo, int id) {
        this.servicioRepositorio.actualizarAtributos(servicio, precio, cargo, id);

    }

    public List<ServicioDTO> getServiciosBD(){
        return this.servicioRepositorio
                .findAll()
                .stream()
                .map(Servicio::toDTO)
                .collect(Collectors.toList());
    }
}