package com.husam.kanban.mapper.impl;

import org.springframework.stereotype.Component;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.dto.CreateTaskRequestDto;
import com.husam.kanban.domain.dto.TaskDto;
import com.husam.kanban.domain.entity.Task;
import com.husam.kanban.mapper.TaskMapper;

@Component
public class TaskMapperImpl implements TaskMapper {

    @Override
    public CreateTaskRequest fromDto(CreateTaskRequestDto dto) {
        return new CreateTaskRequest(dto.title(), dto.description(), dto.priority());
    }

    @Override
    public TaskDto toDto(Task t) {
        return new TaskDto(t.getId(), t.getTitle(), t.getTaskDescription(), t.getTaskPriority(), t.getTaskStatus());
    }
}
