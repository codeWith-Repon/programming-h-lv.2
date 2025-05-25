-- Active: 1747413686708@@127.0.0.1@5432@ph

DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS students;

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name CHAR(3) NOT NULL
) 


CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    score INT NOT NULL,
    department_id INT REFERENCES departments(department_id)
)

CREATE TABLE course_enrollments(
    course_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_title TEXT,
    enrolled_on TIMESTAMP
)

INSERT INTO departments (department_name)
VALUES 
('CSE'),
('EEE'),
('BBA'),
('ENG');

INSERT INTO students (name, age, score, department_id)
VALUES 
('Alice', 20, 85, 1),
('Bob', 21, 78, 2),
('Charlie', 22, 92, 1),
('Diana', 19, 74, 3),
('Evan', 23, 88, 4);

INSERT INTO course_enrollments (student_id, course_title, enrolled_on)
VALUES 
(1, 'Data Structures', '2025-01-10 09:30:00'),
(2, 'Circuits 101', '2025-01-15 10:00:00'),
(1, 'Algorithms', '2025-02-01 11:00:00'),
(3, 'Operating Systems', '2025-02-05 12:00:00'),
(2, 'Business Management', '2025-02-10 14:30:00'),
(1, 'English Literature', '2025-02-12 16:00:00');


SELECT * FROM departments;
SELECT * FROM course_enrollments;


-- Retrieve all students who scored higher than the average score.
SELECT * FROM students;

SELECT * FROM students
WHERE score > (
    SELECT avg(score) FROM students
);

-- SELECT name, AVG(score) AS avg_score
-- FROM students
-- GROUP BY name
-- HAVING AVG(score) > 80;


-- Find students whose age is greater than the average age of all students.
SELECT * FROM students
WHERE age > (
    SELECT avg(age) FROM students
)

-- Get names of students who are enrolled in any course (use IN with subquery).
SELECT * FROM students;

SELECT student_id, name
FROM students
WHERE student_id IN (
    SELECT student_id
    FROM course_enrollments
)

-- Get student_id, name and course title of students who are enrolled in any course (use IN with subquery).
SELECT * FROM course_enrollments;

SELECT student_id, name,
    (
        SELECT course_title
        FROM course_enrollments
        WHERE course_enrollments.student_id = students.student_id
        LIMIT 1
    ) as course_title
FROM students
WHERE student_id IN (
    SELECT student_id FROM course_enrollments
);


-- Retrieve departments with at least one student scoring above 90 (use EXISTS).
SELECT * FROM departments;

SELECT * 
FROM departments as d
WHERE EXISTS (
    SELECT * 
    FROM students as s
    WHERE s.department_id = d.department_id
      AND s.score > 90
);

SELECT  d.department_id,
    d.department_name,
    s.student_id,
    s.name,
    s.age,
    s.score
FROM departments as d 
JOIN
students as s 
ON s.department_id = d.department_id
WHERE s.score > 90;


-- Create a view to show each student’s name, department, and score.

