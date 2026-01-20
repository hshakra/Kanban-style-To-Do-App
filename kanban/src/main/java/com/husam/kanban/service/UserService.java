package com.husam.kanban.service;

import com.husam.kanban.domain.CreateUserRequest;
import com.husam.kanban.domain.entity.User;

public interface UserService {

    User createUser(CreateUserRequest request);
}
