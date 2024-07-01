package com.claudionetto.codigo_certo_fullstack.exceptions;

public class UserIncorrectPasswordException extends RuntimeException{
    public UserIncorrectPasswordException(String message) {
        super(message);
    }
}
