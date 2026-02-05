package com.husam.kanban.service;

import java.util.List;
import java.util.UUID;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.entity.Task;

public interface TaskService {

    Task createTask(CreateTaskRequest request);

    List<Task> listTasks();

    void deleteTask(UUID id);

    Task updateTaskStatus(UUID id, Task st);
}
