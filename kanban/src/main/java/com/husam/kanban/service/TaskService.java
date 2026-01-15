package com.husam.kanban.service;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.entity.Task;

public interface TaskService {

    Task createTask(CreateTaskRequest request);
}
