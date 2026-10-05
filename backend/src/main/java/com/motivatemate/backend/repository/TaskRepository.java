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
     * @param userId the user id to search the task for
     * @return list of task for that specific user
     */
    List<Task> findTasksByUserId(Integer userId);

    /**
     * Finds a specific task with ID for user
     * 
     * @param Id     ID of the task
     * @param userId ID of the user
     * @return Task assigned to that specific user ID
     */
    Optional<Task> findByIdAndUserId(Integer Id, Integer userId);
}
