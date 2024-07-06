package com.claudionetto.codigo_certo_fullstack.services.impl;

import com.claudionetto.codigo_certo_fullstack.config.security.JwtService;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserAuthenticationRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserRegisterDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserAuthenticationResponseDTO;
import com.claudionetto.codigo_certo_fullstack.models.entities.User;
import com.claudionetto.codigo_certo_fullstack.models.enums.Role;
import com.claudionetto.codigo_certo_fullstack.repositories.UserRepository;
import com.claudionetto.codigo_certo_fullstack.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public UserAuthenticationResponseDTO register(UserRegisterDTO userRegisterDTO) {

        User user = User.builder()
                .name(userRegisterDTO.name())
                .surname(userRegisterDTO.surname())
                .username(userRegisterDTO.username())
                .email(userRegisterDTO.email())
                .password(passwordEncoder.encode(userRegisterDTO.password()))
                .role(Role.USER)
                .build();

        User userSaved = userRepository.save(user);
        String jwtToken = jwtService.generateToken(userSaved);

        return UserAuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public UserAuthenticationResponseDTO authenticate(UserAuthenticationRequestDTO userAuthenticationRequestDTO) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userAuthenticationRequestDTO.username(),
                        userAuthenticationRequestDTO.password()
                )
        );

        User user = userRepository.findByUsername(userAuthenticationRequestDTO.username()).orElseThrow();

        String jwtToken = jwtService.generateToken(user);

        return UserAuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }
}
