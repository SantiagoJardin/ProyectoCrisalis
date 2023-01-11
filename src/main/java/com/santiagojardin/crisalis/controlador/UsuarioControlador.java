package com.santiagojardin.crisalis.controlador;

import com.santiagojardin.crisalis.modelo.DTO.UsuarioDTO;
import com.santiagojardin.crisalis.modelo.Usuario;
import com.santiagojardin.crisalis.servicios.UsuarioServicio;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuario")
public class UsuarioControlador {
    private final UsuarioServicio usuarioServicio;

    public UsuarioControlador(UsuarioServicio usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }
    @PostMapping(value = "registro", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Usuario guardarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return this.usuarioServicio.guardarUsuario(usuarioDTO);
    }
    @GetMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UsuarioDTO loginUsuario(@RequestParam String username, String password) {
        return this.usuarioServicio.loginUsuario(username, password);
    }
    @GetMapping(value = "lista", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UsuarioDTO> getUsuarios() {
        return this.usuarioServicio.getListaUsuarios();
    }
}
