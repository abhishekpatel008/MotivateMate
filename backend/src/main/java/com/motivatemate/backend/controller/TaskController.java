package com.motivatemate.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.motivatemate.backend.dto.TaskResponse;
import com.motivatemate.backend.service.TaskService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * REST endpoints for task operations.
 *
 * <p>
 * All endpoints are mounted under {@code /api/tasks}. Because JWT
 * authentication has not yet been migrated, the user ID is passed as a
 * path variable. Once JWT is in place, the user ID will come from the
 * authenticated principal instead.
 * </p>
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Returns a single task by ID, scoped to a specific user.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/tasks/{id}/user/{userId}}
     * </p>
     *
     * @param id     the task's ID
     * @param userId the ID of the user who owns the task
     * @return HTTP 200 with the task, or HTTP 404 if not found or not owned
     */
    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity<TaskResponse> getTaskForUser(@PathVariable Integer id, @PathVariable Integer userId) {
        return taskService.getTaskForUser(id, userId).map(TaskResponse::new).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
