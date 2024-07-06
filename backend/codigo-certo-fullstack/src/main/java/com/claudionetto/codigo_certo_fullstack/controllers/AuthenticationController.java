package com.claudionetto.codigo_certo_fullstack.controllers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserAuthenticationRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserRegisterDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserAuthenticationResponseDTO;
import com.claudionetto.codigo_certo_fullstack.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth/")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<UserAuthenticationResponseDTO> register(
            @RequestBody @Valid UserRegisterDTO request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<UserAuthenticationResponseDTO> authenticate(
            @RequestBody @Valid UserAuthenticationRequestDTO request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

}
