package com.husam.kanban.domain;

import com.husam.kanban.domain.entity.UserRoles;

public record CreateUserRequest(
        String name,
        String passHash,
        UserRoles role
        ) {

}
