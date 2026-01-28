package com.husam.kanban.service.impl;

import org.springframework.stereotype.Service;

import com.husam.kanban.domain.CreateUserRequest;
import com.husam.kanban.domain.entity.User;
import com.husam.kanban.repo.UserRepo;
import com.husam.kanban.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo repo) {
        this.userRepo = repo;
    }

    @Override
    public User createUser(CreateUserRequest request) {
        User x = new User(null, request.username(), request.passHash(), request.role());
        userRepo.save(x);
        return x;
    }
}
