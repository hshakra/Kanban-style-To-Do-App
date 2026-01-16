package com.husam.kanban.domain.entity;

import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "tile", nullable = false)
    private String title;

    @Column(name = "taskDesc", updatable = true)
    private String taskDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TaskStatus taskStat;

    // @Enumerated(EnumType.STRING)
    // @Column(name = "priority", nullable = false)
    @Column(name = "priority")
    private TaskPriority taskPriority;

    public Task() {
    }

    public Task(UUID id, String title, String taskDescription, TaskPriority taskPriority, TaskStatus taskStat) {
        this.id = id;
        this.title = title;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.taskStat = taskStat;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public TaskStatus getTaskStatus() {
        return taskStat;
    }

    public void setTaskStat(TaskStatus taskStat) {
        this.taskStat = taskStat;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(TaskPriority taskPriority) {
        this.taskPriority = taskPriority;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        return Objects.equals(id, task.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Task{"
                + "id=" + id
                + ", title='" + title + '\''
                + ", taskDescription='" + taskDescription + '\''
                + ", taskStat=" + taskStat
                + ", taskPriority=" + taskPriority
                + '}';
    }
}
