package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.Task;
import java.util.Optional;
import java.util.List;

/**
 * TaskRepository: Data access layer for {@link Task} entities.
 * <p>
 * Inherits standard CRUD operations from {@link JpaRepository}.
 * Custom query methods follow Spring Data JPA's derived query naming
 * convention and are implemented automatically at runtime.
 * </p>
 */
public interface TaskRepository extends JpaRepository<Task, Integer> {

    /**
     * Finds the tasks for the user by their unique user id.
     * 
     * @param userId the ID of the user whose tasks to retrieve
     * @return a list of tasks for that user, or an empty list if none exist
     */
    List<Task> findByUserId(Integer userId);

    /**
     * Finds a specific task with ID for user
     * 
     * <p>
     * This prevents a user from accessing another user's task by guessing
     * the task ID. The {@code user_id} check is part of the query.
     * </p>
     * 
     * @param Id     the task's primary key
     * @param userId the ID of the user who owns the task
     * @return the task if found and owned by the user, or empty otherwise
     */
    Optional<Task> findByIdAndUserId(Integer id, Integer userId);
}
