DROP DATABASE IF EXISTS grab_the_shovel;

CREATE DATABASE
IF NOT EXISTS grab_the_shovel DEFAULT CHARACTER
SET utf8 DEFAULT
COLLATE utf8_general_ci;

CREATE USER 'root'@'%' IDENTIFIED BY 'password1234';
GRANT ALL PRIVILEGES ON grab_the_shovel.* TO 'root'@'%';
FLUSH PRIVILEGES;

USE grab_the_shovel;

CREATE TABLE `users`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(255) NOT NULL,
  `email` varchar
(255) NOT NULL,
  `password` varchar
(255) NOT NULL,
  `newsletter_suscribed` tinyint
(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp
(),
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp
() ON
UPDATE current_timestamp(),
  PRIMARY KEY
(`id`),
  UNIQUE KEY `email`
(`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `job_skills`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(255) NOT NULL,
  `cod` varchar
(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp
(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp
() ON
UPDATE current_timestamp(),
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `job_posts`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `title` varchar
(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar
(255) NOT NULL,
  `salary` decimal
(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp
(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp
() ON
UPDATE current_timestamp(),
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `job_post_job_skill`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `job_post_id` int
(11) NOT NULL,
  `job_skill_id` int
(11) NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `job_post_id`
(`job_post_id`),
  KEY `job_skill_id`
(`job_skill_id`),
  CONSTRAINT `job_post_job_skill_ibfk_1` FOREIGN KEY
(`job_post_id`) REFERENCES `job_posts`
(`id`),
  CONSTRAINT `job_post_job_skill_ibfk_2` FOREIGN KEY
(`job_skill_id`) REFERENCES `job_skills`
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO users
  (name, email, password, created_at, email_verified_at)
VALUES
  ('John Doe', 'john.doe@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-01 12:00:00', '2023-10-01 12:00:00'),
  ('Jane Smith', 'jane.smith@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-02 12:00:00', '2023-10-02 12:00:00'),
  ('Alice Johnson', 'alice.johnson@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-03 12:00:00', '2023-10-03 12:00:00'),
  ('Bob Brown', 'bob.brown@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-04 12:00:00', '2023-10-04 12:00:00'),
  ('Charlie Davis', 'charlie.davis@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-05 12:00:00', '2023-10-05 12:00:00'),
  ('David Evans', 'david.evans@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-06 12:00:00', '2023-10-06 12:00:00'),
  ('Eve Foster', 'eve.foster@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-07 12:00:00', '2023-10-07 12:00:00'),
  ('Frank Green', 'frank.green@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-08 12:00:00', '2023-10-08 12:00:00'),
  ('Grace Harris', 'grace.harris@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-09 12:00:00', '2023-10-09 12:00:00'),
  ('Hank Ingram', 'hank.ingram@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-10 12:00:00', '2023-10-10 12:00:00'),
  ('Ivy Jackson', 'ivy.jackson@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-11 12:00:00', '2023-10-11 12:00:00'),
  ('Jack King', 'jack.king@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-12 12:00:00', '2023-10-12 12:00:00'),
  ('Karen Lewis', 'karen.lewis@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-13 12:00:00', '2023-10-13 12:00:00'),
  ('Larry Moore', 'larry.moore@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-14 12:00:00', '2023-10-14 12:00:00'),
  ('Mona Nelson', 'mona.nelson@example.com', '$2y$10$eImiTXuWVxfM37uY4JANjQ==', '2023-10-15 12:00:00', '2023-10-15 12:00:00');

INSERT INTO job_skills
  (name, cod)
VALUES
  ('PHP', 'php'),
  ('JavaScript', 'javascript'),
  ('Python', 'python'),
  ('Java', 'java'),
  ('C#', 'csharp'),
  ('Ruby', 'ruby'),
  ('Go', 'go'),
  ('Swift', 'swift'),
  ('Kotlin', 'kotlin'),
  ('SQL', 'sql'),
  ('HTML', 'html'),
  ('CSS', 'css'),
  ('TypeScript', 'typescript'),
  ('C++', 'cplusplus'),
  ('R', 'r');

INSERT INTO job_posts
  (title, description, location, salary)
VALUES
  ('Software Engineer', 'Develop and maintain web applications.', 'Remote', 60000.00),
  ('Frontend Developer', 'Create and style web interfaces.', 'New York', 55000.00),
  ('Backend Developer', 'Build and maintain server-side logic.', 'San Francisco', 70000.00),
  ('Full Stack Developer', 'Work on both frontend and backend.', 'Chicago', 65000.00),
  ('Data Scientist', 'Analyze and interpret complex data.', 'Boston', 80000.00),
  ('DevOps Engineer', 'Manage infrastructure and deployments.', 'Seattle', 75000.00),
  ('Mobile Developer', 'Develop mobile applications.', 'Austin', 68000.00),
  ('QA Engineer', 'Test and ensure software quality.', 'Denver', 62000.00),
  ('Project Manager', 'Oversee project development.', 'Miami', 72000.00),
  ('UI/UX Designer', 'Design user interfaces and experiences.', 'Los Angeles', 64000.00),
  ('System Administrator', 'Manage and maintain IT systems.', 'Houston', 60000.00),
  ('Network Engineer', 'Design and implement network solutions.', 'Dallas', 67000.00),
  ('Security Analyst', 'Protect systems from cyber threats.', 'Atlanta', 78000.00),
  ('Product Manager', 'Define product vision and strategy.', 'San Diego', 74000.00),
  ('Technical Support', 'Provide technical assistance.', 'Phoenix', 50000.00);

INSERT INTO job_post_job_skill
  (job_post_id, job_skill_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 11),
  (6, 12),
  (7, 13),
  (7, 14),
  (8, 15),
  (9, 1),
  (10, 2),
  (11, 3),
  (12, 4),
  (13, 5),
  (14, 6),
  (15, 7);