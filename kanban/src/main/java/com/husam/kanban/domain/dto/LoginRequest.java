package com.husam.kanban.domain.dto;

public class LoginRequest {

    private String email;
    private String passHash;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassHash() {
        return passHash;
    }

    public void setPassHash(String passHash) {
    }
}
