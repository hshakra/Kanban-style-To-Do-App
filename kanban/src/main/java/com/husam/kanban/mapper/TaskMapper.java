package com.husam.kanban.mapper;

import com.husam.kanban.domain.CreateTaskRequest;
import com.husam.kanban.domain.dto.CreateTaskRequestDto;
import com.husam.kanban.domain.dto.TaskDto;
import com.husam.kanban.domain.entity.Task;

public interface TaskMapper {

    CreateTaskRequest fromDto(CreateTaskRequestDto dto);

    TaskDto toDto(Task t);
}
