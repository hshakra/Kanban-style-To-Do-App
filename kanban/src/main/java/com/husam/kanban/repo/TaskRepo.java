package com.husam.kanban.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.husam.kanban.domain.entity.Task;

@Repository
public interface TaskRepo extends JpaRepository<Task, UUID> {
}
