package com.husam.kanban.service;

import java.util.List;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.entity.Task;

public interface TaskService {

    Task createTask(CreateTaskRequest request);

    List<Task> listTasks();
}
