package com.motivatemate.backend.service;

import com.motivatemate.backend.model.Task;
import com.motivatemate.backend.repository.TaskRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Business logic for task retrieval.
 *
 * <p>
 * Delegates database access to {@link TaskRepository}. Currently supports
 * read operations only. Write operations (create, update, delete, complete)
 * will be added as the migration continues.
 * </p>
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Retrieves all tasks belonging to a specific user.
     *
     * @param userId the ID of the user whose tasks to retrieve
     * @return a list of tasks for that user, or an empty list if none exist
     */
    public List<Task> getTasksForUser(Integer userId) {
        return taskRepository.findByUserId(userId);
    }

    /**
     * Retrieves a single task by ID, scoped to a specific user.
     *
     * <p>
     * The user ID check prevents a user from accessing another user's
     * task by guessing the task ID.
     * </p>
     *
     * @param id     the task's primary key
     * @param userId the ID of the user who owns the task
     * @return the task if found and owned by the user, or empty otherwise
     */
    public Optional<Task> getTaskForUser(Integer id, Integer userId) {
        return taskRepository.findByIdAndUserId(id, userId);
    }
}
