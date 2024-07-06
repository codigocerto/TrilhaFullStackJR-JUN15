package com.claudionetto.codigo_certo_fullstack.exceptions.handler;

import com.claudionetto.codigo_certo_fullstack.exceptions.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFoundException(
            UserNotFoundException ex, HttpServletRequest request) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problemDetail.setType(URI.create("errors/user-not-found"));
        problemDetail.setTitle("User not found exception, check the documentation");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public ProblemDetail handleEntityNotFoundException(
            EntityNotFoundException ex, HttpServletRequest request) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problemDetail.setType(URI.create("errors/entity-not-found"));
        problemDetail.setTitle("Entity not found exception, check the documentation");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ProblemDetail handleUserAlreadyExistsException(
            UserAlreadyExistsException ex, HttpServletRequest request) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
        problemDetail.setType(URI.create("errors/user-already-exists"));
        problemDetail.setTitle("User already exists exception, check the documentation");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UserIncorrectPasswordException.class)
    public ProblemDetail handleUserIncorrectPasswordException(
            UserIncorrectPasswordException ex, HttpServletRequest request) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
        problemDetail.setType(URI.create("errors/user-incorrect-password"));
        problemDetail.setTitle("User incorrect password exception, check the documentation");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ProjectNotBelongToUserException.class)
    public ProblemDetail handleProjectNotBelongToUserException(
            ProjectNotBelongToUserException ex, HttpServletRequest request) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
        problemDetail.setType(URI.create("errors/project-not-belong-to-user"));
        problemDetail.setTitle("Project not belong to user exception, check the documentation");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ResourceAccessDeniedException.class)
    public ProblemDetail handleResourceAccessException(
            ResourceAccessDeniedException ex, HttpServletRequest request) {

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
        problemDetail.setType(URI.create("errors/resource-access-denied-exception"));
        problemDetail.setTitle("Resource access denied, check the documentation");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        Map<String, String> fieldErrorsMap = fieldErrors.stream()
                .collect(Collectors.toMap(FieldError::getField,
                        error -> error.getDefaultMessage() != null ? error.getDefaultMessage() : "Field error"));
        String fields = fieldErrors.stream().map(FieldError::getField).collect(Collectors.joining(", "));

        ProblemDetail problemDetail = ProblemDetail
                .forStatusAndDetail(HttpStatus.BAD_REQUEST, "Check the field(s) error(s): " + fields );

        problemDetail.setType(URI.create("errors/bad-request-exception"));
        problemDetail.setTitle("Bad Request Exception, invalid fields");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());
        problemDetail.setProperty("errors", fieldErrorsMap);

        return problemDetail;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ProblemDetail handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException ex, HttpServletRequest request) {

        String errorMessage = String.format("Invalid value for parameter '%s': %s. Expected type: %s.",
                ex.getName(), ex.getValue(), Objects.requireNonNull(ex.getRequiredType()).getSimpleName());

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, errorMessage);
        problemDetail.setType(URI.create("errors/invalid-uuid"));
        problemDetail.setTitle("Invalid UUID format");
        problemDetail.setProperty("timeStamp", LocalDateTime.now());

        return problemDetail;
    }


}
