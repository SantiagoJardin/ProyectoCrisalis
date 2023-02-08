package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.Impuesto;
import com.santiagojardin.crisalis.modelo.Servicio;
import com.santiagojardin.crisalis.modelo.DTO.ServicioDTO;
import com.santiagojardin.crisalis.repositorios.ImpuestoRepositorio;
import com.santiagojardin.crisalis.repositorios.ServicioRepositorio;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioServicio {
    private final ServicioRepositorio servicioRepositorio;
    private final ImpuestoRepositorio impuestoRepositorio;

    public ServicioServicio(ServicioRepositorio servicioRepositorio, ImpuestoRepositorio impuestoRepositorio) {
        this.servicioRepositorio = servicioRepositorio;
        this.impuestoRepositorio = impuestoRepositorio;
    }

    public Servicio guardarServicio(ServicioDTO servicioDTO, List<Integer> impuestosId) {
        List<Impuesto> impuestos = new ArrayList<Impuesto>();
        for (Integer i : impuestosId) {
            impuestos.add(this.impuestoRepositorio.findById(i).orElseThrow(
                    () -> new RuntimeException("Impuesto no encontrado.")
            ));
        }
        servicioDTO.setImpuestos(impuestos);
        return this.servicioRepositorio.save(new Servicio(servicioDTO));
    }

    public void borrarPorId(int id) {
        this.servicioRepositorio.deleteById(id);
    }

    public List<Servicio> loadServicioByName(String servicio) {
        return this.servicioRepositorio.findByServicioContainsIgnoreCase(servicio);

    }

    public void actualizarServicio (String servicio, double precio, double cargo, int id, List<Integer> impuestosId) {
        Servicio servicio1 = this.servicioRepositorio.findById(id).orElseThrow(
                ()-> new RuntimeException("Servicio no encontrado.")
                );
        List<Impuesto> impuestos = new ArrayList<>();
        for (Integer i : impuestosId) {
            impuestos.add(this.impuestoRepositorio.findById(i).orElseThrow(
                    () -> new RuntimeException("Impuesto no encontrado")
            ));
        }
        servicio1.setServicio(servicio);
        servicio1.setPrecio(precio);
        servicio1.setCargo(cargo);
        servicio1.setImpuestos(impuestos);
        this.servicioRepositorio.save(servicio1);
    }

    public List<ServicioDTO> getServiciosBD(){
        return this.servicioRepositorio
                .findAll()
                .stream()
                .map(Servicio::toDTO)
                .collect(Collectors.toList());
    }
}