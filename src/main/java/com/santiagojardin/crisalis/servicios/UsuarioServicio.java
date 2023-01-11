package com.santiagojardin.crisalis.servicios;

import com.santiagojardin.crisalis.modelo.DTO.UsuarioDTO;
import com.santiagojardin.crisalis.modelo.Usuario;
import com.santiagojardin.crisalis.repositorios.UsuarioRepositorio;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsuarioServicio {

    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    public Usuario guardarUsuario(UsuarioDTO usuarioDTO) {
        if(chequeoDTO(usuarioDTO, Boolean.FALSE)) {
            return this.usuarioRepositorio.save(new Usuario(usuarioDTO));
        }
        throw new RuntimeException("Error in saving new User");
    }

    public UsuarioDTO loginUsuario(String username, String password) {
        if(
                this.chequeoDTO(UsuarioDTO
                        .builder()
                        .username(username)
                        .password(password)
                        .build(), Boolean.TRUE)
        ) {
            return this.usuarioRepositorio.findByUsernameAndPassword(username, password)
                    .orElseThrow(
                            () -> new RuntimeException("Invalid credentials")
                    ).toDTO();
        }
        throw new RuntimeException("Invalid credentials");
    }

    public List<UsuarioDTO> getListaUsuarios() {
        return this.usuarioRepositorio
                .findAll()
                .stream()
                .map(Usuario::toDTO)
                .collect(Collectors.toList());
    }

    private Boolean chequeoDTO(UsuarioDTO usuarioDTO, Boolean isForLogin) {
        if(!isForLogin){
            if(StringUtils.isEmpty(usuarioDTO.getNombre())){
                throw new RuntimeException("Nombre vacío");
            }
            if(StringUtils.isEmpty(usuarioDTO.getApellido())){
                throw new RuntimeException("Apellido vacío");
            }
        }
        if(StringUtils.isEmpty(usuarioDTO.getUsername())){
            throw new RuntimeException("Usuario vacío");
        }
        if(StringUtils.isEmpty(usuarioDTO.getPassword())){
            throw new RuntimeException("Contraseña vacía");
        }
        return Boolean.TRUE;
    }

}
