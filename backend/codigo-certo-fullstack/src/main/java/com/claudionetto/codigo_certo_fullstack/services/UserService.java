package com.claudionetto.codigo_certo_fullstack.services;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.*;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    UserResponseDTO findByID(UUID id);
    Page<UserResponseDTO> findAll(Pageable pageable);
    UserResponseDTO save(UserRegisterDTO userRegisterDTO);
    UserResponseDTO update(UUID id, UserChangeProfileRequestDTO userChangeProfileRequestDTO);
    UserResponseDTO updatePassword(UUID id, UserChangePasswordRequestDTO userChangePasswordRequestDTO);
    UserResponseDTO updateEmail(UUID id, UserChangeEmailRequestDTO userChangeEmailRequestDTO);
    UserResponseDTO updateUsername(UUID id, UserChangeUsernameRequestDTO userChangeUsernameRequestDTO);
    void deleteById(UUID id);
}
