package com.husam.kanban.domain.dto;

import java.util.UUID;

import com.husam.kanban.domain.entity.UserRoles;

public record CreateUserRequestDto(
        UUID id,
        String username,
        String pswdHash,
        UserRoles role
        ) {

}
