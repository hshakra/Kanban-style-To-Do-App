package com.husam.kanban.domain.dto;

import java.util.UUID;

import com.husam.kanban.domain.entity.TaskPriority;
import com.husam.kanban.domain.entity.TaskStatus;

public record TaskDto(
        UUID id,
        String title,
        String description,
        TaskPriority priority,
        TaskStatus status
        ) {

}
