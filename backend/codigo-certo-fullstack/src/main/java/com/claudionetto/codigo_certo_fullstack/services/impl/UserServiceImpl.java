package com.claudionetto.codigo_certo_fullstack.services.impl;

import com.claudionetto.codigo_certo_fullstack.config.security.JwtService;
import com.claudionetto.codigo_certo_fullstack.config.security.SecurityUtils;
import com.claudionetto.codigo_certo_fullstack.dtos.mappers.UserMapper;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.*;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeEmailResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserChangeUsernameResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.UserResponseDTO;
import com.claudionetto.codigo_certo_fullstack.exceptions.ResourceAccessDeniedException;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserAlreadyExistsException;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserNotFoundException;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserIncorrectPasswordException;
import com.claudionetto.codigo_certo_fullstack.models.entities.User;
import com.claudionetto.codigo_certo_fullstack.repositories.UserRepository;
import com.claudionetto.codigo_certo_fullstack.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

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
    public UserResponseDTO update(UUID id, UserChangeProfileRequestDTO userChangeProfileRequestDTO) {

        User user = findByIdOrThrowException(id);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);

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
    public void updatePassword(UUID id, UserChangePasswordRequestDTO userChangePasswordRequestDTO) {

        User user = findByIdOrThrowException(id);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);

        if(!(userChangePasswordRequestDTO.newPassword().equals(userChangePasswordRequestDTO.confirmationNewPassword()))){
            throw new UserIncorrectPasswordException("Password confirmation is wrong");
        }
        if (!(passwordEncoder.matches(userChangePasswordRequestDTO.currentPassword(), user.getPassword()))){
            throw new UserIncorrectPasswordException("The current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(userChangePasswordRequestDTO.newPassword()));
        userRepository.save(user);
    }

    @Override
    public UserChangeEmailResponseDTO updateEmail(UUID id, UserChangeEmailRequestDTO userChangeEmailRequestDTO) {

        User user = findByIdOrThrowException(id);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);

        userRepository.findByEmail(userChangeEmailRequestDTO.email()).ifPresent((existingUser) -> {
            throw new UserAlreadyExistsException("This email is already in use");
        });


        user.setEmail(userChangeEmailRequestDTO.email());
        User userUpdated = userRepository.save(user);

        return UserMapper.transformEntityToUserChangeEmailResponseDTO(user);
    }

    @Override
    public UserChangeUsernameResponseDTO updateUsername(UUID id, UserChangeUsernameRequestDTO userChangeUsernameRequestDTO) {
        User user = findByIdOrThrowException(id);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);

        userRepository.findByUsername(userChangeUsernameRequestDTO.username()).ifPresent((existingUser) -> {
            throw new UserAlreadyExistsException("This username is already in use");
        });

        user.setUsername(userChangeUsernameRequestDTO.username());
        User userUpdated = userRepository.save(user);
        String jwtToken = jwtService.generateToken(userUpdated);

        return UserMapper.transformEntityToUserChangeUsernameResponseDTO(userUpdated, jwtToken);
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
    private void validateUserAuthenticatedIsTheSameOfTheIdReceived(User user) {
        String currentUsername = SecurityUtils.getCurrentUsername();

        if (!(user.getUsername().equals(currentUsername))) {
            throw new ResourceAccessDeniedException("User only can create, update or delete projects with their id");
        }
    }

}
