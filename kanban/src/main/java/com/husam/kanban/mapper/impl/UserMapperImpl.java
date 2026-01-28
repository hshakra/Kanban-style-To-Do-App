package com.husam.kanban.mapper.impl;

import org.springframework.stereotype.Component;

import com.husam.kanban.domain.CreateUserRequest;
import com.husam.kanban.domain.dto.CreateUserRequestDto;
import com.husam.kanban.domain.dto.UserDto;
import com.husam.kanban.domain.entity.User;
import com.husam.kanban.mapper.UserMapper;

@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public CreateUserRequest fromDto(CreateUserRequestDto dto) {
        return new CreateUserRequest(dto.username(), dto.passHash(), dto.role());
    }

    @Override
    public UserDto toDto(User x) {
        return new UserDto(x.getId(), x.getName(), x.getPasswordHash(), x.getRole());
    }

}
