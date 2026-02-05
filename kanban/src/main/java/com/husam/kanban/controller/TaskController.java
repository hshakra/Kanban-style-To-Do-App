package com.husam.kanban.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.dto.CreateTaskRequestDto;
import com.husam.kanban.domain.dto.TaskDto;
import com.husam.kanban.domain.entity.Task;
import com.husam.kanban.domain.entity.TaskStatus;
import com.husam.kanban.mapper.TaskMapper;
import com.husam.kanban.service.TaskService;

@RestController
@RequestMapping(path = "/api/ver1/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(TaskService ts, TaskMapper tm) {
        this.taskService = ts;
        this.taskMapper = tm;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> listTasks() {
        List<Task> tasks = taskService.listTasks();
        List<TaskDto> tasksDtos = tasks.stream().map(taskMapper::toDto).toList();
        return ResponseEntity.ok(tasksDtos);
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTasK(@RequestBody CreateTaskRequestDto taskRq) {
        CreateTaskRequest createTaskRq = taskMapper.fromDto(taskRq);
        Task task = taskService.createTask(createTaskRq);
        task.setTaskStat(TaskStatus.OPEN);
        TaskDto createdTaskDto = taskMapper.toDto(task);
        return new ResponseEntity<>(createdTaskDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        try {
            UUID taskId = UUID.fromString(id);
            taskService.deleteTask(taskId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid UUID format
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Task not found
        }
    }
}
