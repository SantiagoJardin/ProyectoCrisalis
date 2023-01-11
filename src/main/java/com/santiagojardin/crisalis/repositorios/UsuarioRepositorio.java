package com.santiagojardin.crisalis.repositorios;

import com.santiagojardin.crisalis.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsernameAndPassword(String username, String password);
}
