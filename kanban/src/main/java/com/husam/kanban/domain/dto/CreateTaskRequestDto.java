package com.husam.kanban.domain.dto;

import com.husam.kanban.domain.entity.TaskPriority;
import com.husam.kanban.domain.entity.TaskStatus;

public record CreateTaskRequestDto(
        String title,
        String description,
        TaskPriority priority,
        TaskStatus status
        ) {

}
