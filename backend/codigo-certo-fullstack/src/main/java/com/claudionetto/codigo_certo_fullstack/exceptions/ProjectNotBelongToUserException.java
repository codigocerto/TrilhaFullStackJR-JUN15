package com.claudionetto.codigo_certo_fullstack.exceptions;

public class ProjectNotBelongToUserException extends RuntimeException{
    public ProjectNotBelongToUserException(String message) {
        super(message);
    }
}
