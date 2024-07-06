package com.claudionetto.codigo_certo_fullstack.services;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.*;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeEmailResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeUsernameResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    UserResponseDTO findByID(UUID id);
    Page<UserResponseDTO> findAll(Pageable pageable);
    UserResponseDTO update(UUID id, UserChangeProfileRequestDTO userChangeProfileRequestDTO);
    void updatePassword(UUID id, UserChangePasswordRequestDTO userChangePasswordRequestDTO);
    UserChangeEmailResponseDTO updateEmail(UUID id, UserChangeEmailRequestDTO userChangeEmailRequestDTO);
    UserChangeUsernameResponseDTO updateUsername(UUID id, UserChangeUsernameRequestDTO userChangeUsernameRequestDTO);
    void deleteById(UUID id);
}
