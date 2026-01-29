package com.husam.kanban.service.impl;

import java.util.List;

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

    @Override
    public boolean validateLogin(String email, String passHash) {

        List<User> users = userRepo.findAll();
        String nameCurr = users.iterator().next().getName();
        String passCurr = users.iterator().next().getPasswordHash();

        while (users.iterator().hasNext()) {
            if (nameCurr.equals(email) && passCurr.equals(passHash)) {
                return true;
            } else {
                nameCurr = users.iterator().next().getName();
                passCurr = users.iterator().next().getPasswordHash();
            }
        }
        return false;
    }
}
