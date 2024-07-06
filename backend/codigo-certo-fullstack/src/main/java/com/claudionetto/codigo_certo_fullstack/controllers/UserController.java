package com.claudionetto.codigo_certo_fullstack.controllers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserChangeEmailRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserChangePasswordRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserChangeProfileRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserChangeUsernameRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeEmailResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeUsernameResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserResponseDTO;
import com.claudionetto.codigo_certo_fullstack.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserResponseDTO>> findAll(Pageable pageable){

        Page<UserResponseDTO> usersPage = userService.findAll(pageable);
        return ResponseEntity.ok(usersPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable(name = "id") UUID id){

        UserResponseDTO user = userService.findByID(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> update(@RequestBody @Valid UserChangeProfileRequestDTO userDTO,
                                                  @PathVariable(name = "id") UUID id){

        UserResponseDTO user = userService.update(id, userDTO);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UserResponseDTO> updatePassword(@RequestBody UserChangePasswordRequestDTO userDTO,
                                                          @PathVariable(name = "id") UUID id){

        userService.updatePassword(id, userDTO);
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/{id}/email")
    public ResponseEntity<UserChangeEmailResponseDTO> updateEmail(@RequestBody UserChangeEmailRequestDTO userDTO,
                                                                  @PathVariable(name = "id") UUID id){

        UserChangeEmailResponseDTO user = userService.updateEmail(id, userDTO);
        return ResponseEntity.accepted().body(user);
    }

    @PatchMapping("/{id}/username")
    public ResponseEntity<UserChangeUsernameResponseDTO> updateUsername(@RequestBody UserChangeUsernameRequestDTO userDTO,
                                                          @PathVariable(name = "id") UUID id){

        UserChangeUsernameResponseDTO user = userService.updateUsername(id, userDTO);
        return ResponseEntity.accepted().body(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable(name = "id") UUID id){

        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
