package com.claudionetto.codigo_certo_fullstack.exceptions;

public class ResourceAccessDeniedException extends RuntimeException{
    public ResourceAccessDeniedException(String message) {
        super(message);
    }
}
