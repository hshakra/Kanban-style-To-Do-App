package com.husam.kanban.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.husam.kanban.domain.CreateUserRequest;
import com.husam.kanban.domain.dto.UserDto;
import com.husam.kanban.domain.entity.User;
import com.husam.kanban.mapper.UserMapper;
import com.husam.kanban.service.UserService;

@RestController
@RequestMapping(path = "/api/ver1/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService us, UserMapper um) {
        this.userService = us;
        this.userMapper = um;
    }

    @PostMapping
    public ResponseEntity<UserDto> createTasK(@RequestBody UserDto userReq) {
        CreateUserRequest createUserReq = userMapper.fromDto(userReq);
        User user = userService.createUser(createUserReq);
        UserDto createdTaskDto = userMapper.toDto(user);
        return new ResponseEntity<>(createdTaskDto, HttpStatus.CREATED);
    }
}
