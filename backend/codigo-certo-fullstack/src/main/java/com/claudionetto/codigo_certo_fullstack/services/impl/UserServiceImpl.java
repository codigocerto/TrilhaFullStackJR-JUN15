package com.claudionetto.codigo_certo_fullstack.services.impl;

import com.claudionetto.codigo_certo_fullstack.dtos.mappers.UserMapper;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.*;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserResponseDTO;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserAlreadyExistsException;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserNotFoundException;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserIncorrectPasswordException;
import com.claudionetto.codigo_certo_fullstack.models.entities.User;
import com.claudionetto.codigo_certo_fullstack.repositories.UserRepository;
import com.claudionetto.codigo_certo_fullstack.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponseDTO findByID(UUID id) {
        User user = findByIdOrThrowException(id);
        return UserMapper.transformEntityToResponse(user);
    }

    @Override
    public Page<UserResponseDTO> findAll(Pageable pageable) {
        Page<User> usersPage = userRepository.findAll(pageable);
        return usersPage.map(UserMapper::transformEntityToResponse);
    }

    @Override
    public UserResponseDTO save(UserRegisterDTO userRegisterDTO) {

        validateUserRegistration(userRegisterDTO);

        User user = UserMapper.transformRegisterToUser(userRegisterDTO);
        User userSaved = userRepository.save(user);

        return UserMapper.transformEntityToResponse(userSaved);
    }

    @Override
    public UserResponseDTO update(UUID id, UserChangeProfileRequestDTO userChangeProfileRequestDTO) {

        User user = findByIdOrThrowException(id);

        if (userChangeProfileRequestDTO.name() != null){
            user.setName(userChangeProfileRequestDTO.name());
        }

        if (userChangeProfileRequestDTO.surname() != null){
            user.setSurname(userChangeProfileRequestDTO.surname());
        }

        User userUpdated = userRepository.save(user);

        return UserMapper.transformEntityToResponse(userUpdated);
    }

    @Override
    public UserResponseDTO updatePassword(UUID id, UserChangePasswordRequestDTO userChangePasswordRequestDTO) {

        User user = findByIdOrThrowException(id);

        if (!(user.getPassword().equals(userChangePasswordRequestDTO.currentPassword()))){
            throw new UserIncorrectPasswordException("The current password is incorrect");
        }

        user.setPassword(userChangePasswordRequestDTO.newPassword());
        User userUpdated = userRepository.save(user);

        return UserMapper.transformEntityToResponse(userUpdated);
    }

    @Override
    public UserResponseDTO updateEmail(UUID id, UserChangeEmailRequestDTO userChangeEmailRequestDTO) {

        User user = findByIdOrThrowException(id);

        userRepository.findByEmail(userChangeEmailRequestDTO.email()).ifPresent((existingUser) -> {
            throw new UserAlreadyExistsException("This email is already in use");
        });


        user.setEmail(userChangeEmailRequestDTO.email());
        User userUpdated = userRepository.save(user);

        return UserMapper.transformEntityToResponse(user);
    }

    @Override
    public UserResponseDTO updateUsername(UUID id, UserChangeUsernameRequestDTO userChangeUsernameRequestDTO) {
        User user = findByIdOrThrowException(id);

        userRepository.findByUsername(userChangeUsernameRequestDTO.username()).ifPresent((existingUser) -> {
            throw new UserAlreadyExistsException("This username is already in use");
        });

        user.setUsername(userChangeUsernameRequestDTO.username());
        User userUpdated = userRepository.save(user);

        return UserMapper.transformEntityToResponse(user);
    }

    @Override
    public void deleteById(UUID id) {
        findByIdOrThrowException(id);
        userRepository.deleteById(id);
    }

    private User findByIdOrThrowException(UUID id){
        return userRepository.findById(id).orElseThrow(() ->
                new UserNotFoundException("User with ID " + id + " not found"));
    }

    private void validateUserRegistration(UserRegisterDTO userRegisterDTO) {
        userRepository.findByEmail(userRegisterDTO.email()).ifPresent(userEmail -> {
            throw new UserAlreadyExistsException("This email is already in use.");
        });

        userRepository.findByUsername(userRegisterDTO.username()).ifPresent(userName -> {
            throw new UserAlreadyExistsException("This username is already in use.");
        });
    }
}
