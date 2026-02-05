package com.husam.kanban.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.entity.Task;
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
        Task t = new Task(null, request.title(), request.description(), request.priority(), request.status());

        //saving task to repo
        taskRepo.save(t);

        return t;
    }

    @Override
    public List<Task> listTasks() {
        return taskRepo.findAll();
    }

    @Override
    public void deleteTask(UUID id) {
        if (!taskRepo.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepo.deleteById(id);
    }

    @Override
    public Task updateTaskStatus(UUID id, Task updatedTask) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setTaskStat(updatedTask.getTaskStatus());
        task.setTitle(updatedTask.getTitle());
        task.setTaskDescription(updatedTask.getTaskDescription());
        task.setTaskPriority(updatedTask.getTaskPriority());

        return taskRepo.save(task);
    }
}
