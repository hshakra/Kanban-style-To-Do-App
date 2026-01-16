package com.husam.kanban.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping
    public ResponseEntity<TaskDto> createTasK(@RequestBody CreateTaskRequestDto taskRq) {
        CreateTaskRequest createTaskRq = taskMapper.fromDto(taskRq);
        Task task = taskService.createTask(createTaskRq);
        task.setTaskStat(TaskStatus.OPEN);
        TaskDto createdTaskDto = taskMapper.toDto(task);
        return new ResponseEntity<>(createdTaskDto, HttpStatus.CREATED);
    }

}
