package com.claudionetto.codigo_certo_fullstack.dtos.mappers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.UserRegisterDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeEmailResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeUsernameResponseDTO;
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

    public static UserChangeUsernameResponseDTO transformEntityToUserChangeUsernameResponseDTO(User user,
                                                                                               String token){
        return UserChangeUsernameResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .newToken(token)
                .build();
    }

    public static UserChangeEmailResponseDTO transformEntityToUserChangeEmailResponseDTO(User user){
        return UserChangeEmailResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .build();
    }
}
