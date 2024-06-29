package com.claudionetto.codigo_certo_fullstack.dtos.mappers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserRegisterDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserResponseDTO;
import com.claudionetto.codigo_certo_fullstack.models.entities.User;

public class UserMapper {

    public static UserResponseDTO transformEntityToResponse(User user){
        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .surname(user.getSurname())
                .username(user.getUsername())
                .build();
    }

    public static User transformRegisterToUser(UserRegisterDTO userRegisterDTO){
        return User.builder()
                .name(userRegisterDTO.name())
                .surname(userRegisterDTO.surname())
                .username(userRegisterDTO.username())
                .email(userRegisterDTO.email())
                .password(userRegisterDTO.password())
                .build();
    }
}
