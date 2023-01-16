package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.DTO.ImpuestoDTO;
import com.santiagojardin.crisalis.modelo.Impuesto;
import com.santiagojardin.crisalis.modelo.Servicio;
import com.santiagojardin.crisalis.repositorios.ImpuestoRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImpuestoServicio {
    private final ImpuestoRepositorio impuestoRepositorio;

    public ImpuestoServicio(ImpuestoRepositorio impuestoRepositorio) {
        this.impuestoRepositorio = impuestoRepositorio;
    }

    public Impuesto guardarImpuesto(ImpuestoDTO impuestoDTO) {
        return this.impuestoRepositorio.save(new Impuesto(impuestoDTO));
    }

    public void borrarPorId(int id) {
        this.impuestoRepositorio.deleteById(id);
    }

    public List<Impuesto> loadImpuestoByName(String impuesto) {
        return this.impuestoRepositorio.findByImpuestoContainsIgnoreCase(impuesto);

    }

    public void actualizarImpuesto (String impuesto, double porcentaje, int id) {
        this.impuestoRepositorio.actualizarAtributos(impuesto, porcentaje, id);

    }

    public List<ImpuestoDTO> getImpuestosBD(){
        return this.impuestoRepositorio
                .findAll()
                .stream()
                .map(Impuesto::toDTO)
                .collect(Collectors.toList());
    }
}