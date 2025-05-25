-- Active: 1747413686708@@127.0.0.1@5432@ph

-- Grouping and Filtering Data with GROUP BY and HAVING
SELECT * FROM students;

SELECT country, count(*), AVG(age) FROM students
    GROUP BY country;
SELECT country, count(*), AVG(age) FROM students
    GROUP BY country
    HAVING avg(age) > 20;

-- Filter Groups Using HAVING to Show Only Countries with Average Age Above 20.60
SELECT country, AVG(age) FROM students
    GROUP BY country
    HAVING AVG(age) > 20.60;

-- Count Students Born in Each Year
SELECT EXTRACT(YEAR FROM dob) as birth_year, count('birth_year')
    FROM students
    GROUP BY birth_year