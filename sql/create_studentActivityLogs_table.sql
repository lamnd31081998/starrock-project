CREATE TABLE `student_activity_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `account_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `lesson_id` INT NOT NULL,
    `lesson_material_id` INT NOT NULL,
    `is_completed` TINYINT NOT NULL,
    `required_duration` INT NOT NULL,
    `viewed_duration` INT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)