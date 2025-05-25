-- Show current timestamp with time zone (based on server setting)
SELECT now();

-- Create a table with both timestamp without and with time zone
CREATE TABLE timezon (
    ts TIMESTAMP WITHOUT TIME ZONE,
    tsz TIMESTAMP WITH TIME ZONE
);

-- Insert a row into the timezon table
INSERT INTO timezon VALUES('2025-01-12 09:45:00', '2025-05-23 09:45:00');

-- View data from the timezon table
SELECT * FROM timezon;

-- Show current timestamp
SELECT now();

-- Show current date
SELECT CURRENT_DATE;

-- Show current date by casting now() to DATE
SELECT now()::DATE;

-- Show current time by casting now() to TIME
SELECT now()::TIME;

-- Format the current timestamp as 'dd/mm/yyyy'
SELECT to_char(now(), 'dd/mm/yyyy');

-- Format the current timestamp to show full month name
SELECT to_char(now(),'MONTH');

-- Subtract 1 year from the current date
SELECT CURRENT_DATE - INTERVAL '1 year';

-- Subtract 1 month from the current date
SELECT CURRENT_DATE - INTERVAL '1 month';

-- Subtract 1 year 2 months 2 days from the current date
SELECT CURRENT_DATE - INTERVAL '1 year 2 months 2 days';

-- Calculate the age between today and a given date
SELECT age(CURRENT_DATE, '2003-01-01');

SELECT * FROM students;

-- Select all student data along with their age
SELECT *, age(CURRENT_DATE, dob) FROM students;

-- Extract year from a date
SELECT extract(YEAR FROM '2025-01-03'::DATE);

-- Extract day from a date
SELECT extract(DAY FROM '2025-01-03'::DATE);

-- Cast character to boolean: 'y' becomes true, 'n' becomes false
SELECT 'y'::BOOLEAN;
SELECT 'n'::BOOLEAN; -- This will return false

-- Notes:
-- 'y'::BOOLEAN and 'n'::BOOLEAN work in PostgreSQL, where 'y', 'yes', '1', 't', 'true' → true, and 'n', 'no', '0', 'f', 'false' → false.
