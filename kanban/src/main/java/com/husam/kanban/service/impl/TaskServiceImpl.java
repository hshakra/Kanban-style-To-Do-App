package com.husam.kanban.service.impl;

import org.springframework.stereotype.Service;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.entity.Task;
import com.husam.kanban.domain.entity.TaskStatus;
import com.husam.kanban.repo.TaskRepo;
import com.husam.kanban.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepo taskRepo;

    public TaskServiceImpl(TaskRepo repo) {
        this.taskRepo = repo;
    }

    @Override
    public Task createTask(CreateTaskRequest request) {
        //creating task
        Task t = new Task(null, request.title(), request.description(), TaskStatus.OPEN, request.priority());

        //saving task to repo
        taskRepo.save(t);

        return t;
    }
}
