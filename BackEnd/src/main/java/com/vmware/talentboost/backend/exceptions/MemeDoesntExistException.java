package com.vmware.talentboost.backend.exceptions;

public class MemeDoesntExistException extends Exception {
    public MemeDoesntExistException(String message) {
        super(message);
    }
}
