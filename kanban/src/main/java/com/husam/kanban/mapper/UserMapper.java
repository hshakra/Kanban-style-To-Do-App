package com.husam.kanban.mapper;

import com.husam.kanban.domain.CreateUserRequest;
import com.husam.kanban.domain.dto.UserDto;
import com.husam.kanban.domain.entity.User;

public interface UserMapper {

    CreateUserRequest fromDto(UserDto dto);

    UserDto toDto(User x);
}
