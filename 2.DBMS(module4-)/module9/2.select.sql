-- Create a table named 'students' with columns for personal and academic details
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,                -- Auto-incremented unique student ID
    first_name VARCHAR(50) NOT NULL,              -- First name of the student (cannot be NULL)
    last_name VARCHAR(50) NOT NULL,               -- Last name of the student (cannot be NULL)
    age INT,                                      -- Age of the student
    grade CHAR(2),                                -- Grade received (e.g., A+, B-)
    course VARCHAR(50),                           -- Course enrolled
    email VARCHAR(100),                           -- Email address
    dob DATE,                                     -- Date of birth
    blood_group VARCHAR(5),                       -- Blood group (e.g., O+, AB-)
    country VARCHAR(50)                           -- Country of origin
);

-- Insert 15 dummy student records into the 'students' table
INSERT INTO students (first_name, last_name, age, grade, course, email, dob, blood_group, country) 
VALUES
    ('Alice', 'Johnson', 20, 'A+', 'Computer Science', 'alice.johnson@example.com', '2005-03-15', 'O+', 'USA'),
    ('Bob', 'Smith', 22, 'B', 'Electrical Engineering', 'bob.smith@example.com', '2003-07-22', 'A-', 'Canada'),
    ('Clara', 'Lee', 19, 'A', 'Mathematics', 'clara.lee@example.com', '2006-01-10', 'B+', 'UK'),
    ('David', 'Martinez', 21, 'C+', 'Physics', 'david.martinez@example.com', '2004-04-18', 'O-', 'Mexico'),
    ('Ella', 'Nguyen', 23, 'B-', 'Biology', 'ella.nguyen@example.com', '2002-09-25', 'AB+', 'Vietnam'),
    ('Farhan', 'Khan', 20, 'A-', 'Chemistry', 'farhan.khan@example.com', '2005-11-03', 'B-', 'Bangladesh'),
    ('Grace', 'Taylor', 18, 'A+', 'Philosophy', 'grace.taylor@example.com', '2007-05-30', 'O+', 'Australia'),
    ('Henry', 'Brown', 22, 'B+', 'Economics', 'henry.brown@example.com', '2003-08-12', 'A+', 'USA'),
    ('Isla', 'Wilson', 21, 'C', 'History', 'isla.wilson@example.com', '2004-12-07', 'O-', 'New Zealand'),
    ('Jack', 'Patel', 20, 'B', 'Software Engineering', 'jack.patel@example.com', '2005-06-19', 'AB-', 'India'),
    ('Kavya', 'Reddy', 19, 'A', 'Data Science', 'kavya.reddy@example.com', '2006-02-11', 'A+', 'India'),
    ('Leo', 'Garcia', 22, 'B+', 'Mechanical Engineering', NULL, '2003-10-03', 'O-', 'Spain'),
    ('Maria', 'Silva', 20, 'A-', 'Psychology', 'maria.silva@example.com', '2005-01-28', 'B+', 'Brazil'),
    ('Noah', 'Miller', 21, 'C+', 'Architecture', 'noah.miller@example.com', '2004-03-16', 'AB-', 'Germany'),
    ('Sana', 'Ahmed', 18, 'A+', 'Business Administration', 'sana.ahmed@example.com', '2007-09-20', 'O+', 'Pakistan');

-- Select and show all columns and all data from the 'students' table
SELECT * FROM students;

-- Select and show only the 'email' column from the 'students' table
SELECT email FROM students;

-- Select and show the 'email' column, but rename the column as "Student Email" in the result
SELECT email AS "Student Email" FROM students;

-- Select and show all students, sorted by age in ascending order (youngest first)
SELECT * FROM students ORDER BY age ASC;


-- Get a list of all countries from the students table, including duplicates, sorted alphabetically
SELECT country FROM students ORDER BY country ASC;

-- Get a list of unique (non-repeating) countries represented by students
SELECT DISTINCT country FROM students;

-- Get a list of unique blood groups of the students
SELECT DISTINCT blood_group FROM students;

-- --------------------------------------
-- DATA FILTERING EXAMPLES
-- --------------------------------------

-- 1. Select all students who are from the USA
SELECT * FROM students
    WHERE country = 'USA';

-- 2. Select all students who have an "A" grade AND are enrolled in "Data Science"
SELECT * FROM students 
    WHERE grade = 'A' AND course = 'Data Science';

-- 3. Select students who have blood group 'A+'
SELECT * FROM students
    WHERE blood_group = 'A+';

-- 4. Select students who are from either USA or Australia
SELECT * FROM students
    WHERE country = 'USA' OR country = 'Australia';

-- 5. Select students who are from USA OR Australia AND whose age is exactly 20
SELECT * FROM students
    WHERE (country = 'USA' OR country = 'Australia') AND age = 20;

-- 6. Select students who have grade 'A' OR 'B' AND their course is either Mathematics OR Physics
SELECT * FROM students
    WHERE (grade = 'A' OR grade = 'B') AND (course = 'Mathematics' OR course = 'Physics');

-- 7. Select students who are older than 20 AND studying Biology
SELECT * FROM students
    WHERE age > 20 AND course = 'Biology';

-- 8. Select all students whose age is NOT equal to 20
-- You can use either '!=' or '<>' for NOT EQUAL in SQL (both are valid)
SELECT * FROM students
    WHERE age <> 20;

-- Convert all first names to uppercase and rename the output column
SELECT UPPER(first_name) AS first_name_in_upper FROM students;

-- Concatenate first_name and last_name as full_name, and include all columns
SELECT CONCAT(first_name, ' ', last_name) AS full_name, * FROM students;

-- Get length of each first_name
SELECT LENGTH(first_name) FROM students;

-- Calculate average age of students
SELECT AVG(age) FROM students;

-- Find the oldest student
SELECT MAX(age) FROM students;

-- Find the youngest student
SELECT MIN(age) FROM students;

-- Get total sum of all students' ages
SELECT SUM(age) FROM students;

-- Count total number of students
SELECT COUNT(*) FROM students;

-- Get the maximum number of characters in a first_name
SELECT MAX(LENGTH(first_name)) FROM students;

-- Select students not from the USA
SELECT * FROM students WHERE NOT country = 'USA';

-- Select students whose email is NULL
SELECT * FROM students WHERE email IS NULL;

-- Select students whose email is NOT NULL
SELECT * FROM students WHERE email IS NOT NULL;

-- Replace NULL email with "Email not provided"
SELECT COALESCE(email, 'Email not provided') AS "Email", first_name FROM students;

-- Select students from USA, UK, or Canada (written in two ways)
SELECT * FROM students WHERE country = 'USA' OR country = 'Canada' OR country = 'UK';
SELECT * FROM students WHERE country IN('USA', 'UK', 'Canada');

-- Exclude students from USA, UK, and Canada
SELECT * FROM students WHERE country NOT IN('USA', 'UK', 'Canada');

-- Select students between age 19 and 22 (inclusive)
SELECT * FROM students WHERE age BETWEEN 19 AND 22;

-- Select students born between given dates, and order by date of birth
SELECT * FROM students 
    WHERE dob BETWEEN '2000-03-15' AND '2005-01-01' 
    ORDER BY dob;

-- Names ending with 'ce'
SELECT * FROM students WHERE first_name LIKE '%ce';

-- Names starting with 'A'
SELECT * FROM students WHERE first_name LIKE 'A%';

-- Names where 3rd letter is 'a' (e.g., "Isa", "Kavya")
SELECT * FROM students WHERE first_name LIKE '__a%';

-- Names ending with 3-letter pattern, last letter 'a'
SELECT * FROM students WHERE first_name LIKE '%__a';

-- Names with exactly 4 letters, where 3rd is 'a'
SELECT * FROM students WHERE first_name LIKE '__a_';

-- Case-insensitive match for names starting with 'a'
SELECT * FROM students WHERE first_name ILIKE 'a%';

-- Limit the output to 5 students
SELECT * FROM students LIMIT 5;

-- Limit output to 2 students from specific countries
SELECT * FROM students WHERE country IN('USA', 'UK', 'Canada') LIMIT 2;

-- Pagination examples using LIMIT and OFFSET
SELECT * FROM students LIMIT 5 OFFSET 5*0;  -- Page 1 index 0
SELECT * FROM students LIMIT 5 OFFSET 5*1;  -- Page 2 index 1
SELECT * FROM students LIMIT 5 OFFSET 10*2; -- Page 3 index 2
SELECT * FROM students LIMIT 5 OFFSET 15*3; -- Page 4 index 3

-- Delete all records from students table
DELETE FROM students;

-- Delete students with grade 'C' or 'B+' and from the USA
DELETE FROM students
    WHERE grade = 'C' OR (grade = 'B+' AND country = 'USA');

-- Select all students from the USA
SELECT * FROM students WHERE country = 'USA';

-- Update email address for students younger than 20
UPDATE students
    SET email = 'child@gmail.com'
    WHERE age < 20;

SELECT * FROM students;