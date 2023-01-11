package com.santiagojardin.crisalis.modelo;

import com.santiagojardin.crisalis.modelo.DTO.UsuarioDTO;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido")
    private String apellido;
    @Column(name = "nombreUsuario")
    private String username;
    @Column(name = "contraseña")
    private String password;

    public Usuario(UsuarioDTO usuarioDTO) {
        this.nombre = usuarioDTO.getNombre();
        this.apellido = usuarioDTO.getApellido();
        this.username = usuarioDTO.getUsername();
        this.password = usuarioDTO.getPassword();
    }

    public UsuarioDTO toDTO() {
        return
                UsuarioDTO.builder()
                        .nombre(this.nombre)
                        .apellido(this.apellido)
                        .username(this.username)
                        .password(this.password)
                        .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Usuario usuario = (Usuario) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
