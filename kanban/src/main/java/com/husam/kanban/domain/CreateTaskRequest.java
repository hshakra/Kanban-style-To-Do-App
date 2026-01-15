package com.husam.kanban.domain;

import com.husam.kanban.domain.entity.TaskPriority;
import com.husam.kanban.domain.entity.TaskStatus;

public record CreateTaskRequest(
        String title,
        String description,
        TaskPriority priority,
        TaskStatus status
        ) {
            

}
