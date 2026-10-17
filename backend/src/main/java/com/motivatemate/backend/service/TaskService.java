package com.motivatemate.backend.service;

import com.motivatemate.backend.dto.CreateTaskRequest;
import com.motivatemate.backend.model.Task;
import com.motivatemate.backend.model.User;
import com.motivatemate.backend.repository.TaskRepository;
import com.motivatemate.backend.repository.UserRepository;
import com.motivatemate.backend.repository.PetRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import java.util.Map;

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

    private final PetRepository petRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, PetRepository petRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.petRepository = petRepository;
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

    /**
     * Creates a new task for a specific user.
     *
     * <p>
     * Calculates {@code pointsWorth} from the task's priority and difficulty
     * using the same formula as the Node.js backend: the priority base value
     * multiplied by the difficulty multiplier, rounded to the nearest integer.
     * Missing priority or difficulty defaults to "medium".
     * </p>
     *
     * @param userId  the ID of the user creating the task
     * @param request the task data from the client
     * @return the saved task entity
     */

    public Task createTask(Integer userId, CreateTaskRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int pointsWorth = calculatePointsWorth(request.getPriority(), request.getDifficulty());

        Task task = new Task();
        task.setUser(user);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority() != null ? request.getPriority() : "medium");
        task.setDifficulty(request.getDifficulty() != null ? request.getDifficulty() : "medium");
        task.setDueDate(request.getDueDate());
        task.setPointsWorth(pointsWorth);
        task.setCompleted(false);

        return taskRepository.save(task);
    }

    /**
     * Calculates the points a task is worth.
     *
     * <p>
     * Base points come from priority: low=10, medium=25, high=50, urgent=75.
     * The base is multiplied by a difficulty factor: easy=1, medium=1.5, hard=2.
     * The result is rounded to the nearest integer.
     * </p>
     *
     * @param priority   the task's priority (may be null)
     * @param difficulty the task's difficulty (may be null)
     * @return the calculated points value
     */

    private int calculatePointsWorth(String priority, String difficulty) {
        Map<String, Integer> priorityPoints = Map.of(
                "low", 10,
                "medium", 25,
                "high", 50,
                "urgent", 75);

        Map<String, Double> difficultyMultiplier = Map.of(
                "easy", 1.0,
                "medium", 1.5,
                "hard", 2.0);

        int base = priorityPoints.getOrDefault(priority, 10);
        double multiplier = difficultyMultiplier.getOrDefault(difficulty, 1.0);

        return (int) Math.round(base * multiplier);
    }

    @Transactional
    public Task completeTask(Integer taskId, Integer userId) {
        // Find the task scoped to the user
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("User not Found!"));

        // If already completed, REHECT
        if (Boolean.TRUE.equals(task.getCompleted())) {
            throw new RuntimeException("Task already completed!");
        }

        // Mark the task as complete
        task.setCompleted(true);
        task.setCompletedAt(LocalDateTime.now());
        task.setPointsEarned(task.getPointsWorth());
        taskRepository.save(task);

        // Award Points to user
        User user = task.getUser();
        user.setPoints(user.getPoints() + task.getPointsWorth());
        userRepository.save(user);

        // Increase pet happiness
        petRepository.findByUserId(userId).ifPresent(pet -> {
            pet.setHappiness(Math.min(100, pet.getHappiness() + 5));
            pet.setLastInteraction(LocalDateTime.now());
            petRepository.save(pet);
        });

        return task;
    }

}
