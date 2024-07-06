package com.claudionetto.codigo_certo_fullstack.services;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserAuthenticationRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserRegisterDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserAuthenticationResponseDTO;

public interface AuthenticationService {

    UserAuthenticationResponseDTO register(UserRegisterDTO userRegisterDTO);
    UserAuthenticationResponseDTO authenticate(UserAuthenticationRequestDTO userAuthenticationRequestDTO);

}
