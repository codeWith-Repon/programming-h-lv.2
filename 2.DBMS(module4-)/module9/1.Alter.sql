-- Active: 1747413686708@@127.0.0.1@5432@ph
SELECT * FROM person2

ALTER TABLE person2
    ADD COLUMN email VARCHAR(25) DEFAULT 'default@email.com' NOT NULL;

ALTER TABLE person2
    DROP COLUMN email

ALTER TABLE person2
    RENAME COLUMN age to user_age;

ALTER TABLE person2
    ALTER COLUMN user_name TYPE VARCHAR(41);

ALTER TABLE person2
    ALTER COLUMN user_age set NOT NULL

ALTER TABLE person2
    ALTER COLUMN user_age DROP NOT NULL

-- Different Methods to Alter Tables For Primary key, Unique 
ALTER TABLE person2
    ADD constraint unique_person2_user_name UNIQUE(user_name)

ALTER TABLE person2
    DROP constraint unique_person2_user_name

-- clear all data instead of table

TRUNCATE TABLE person2;

-- clear all data with table
DROP TABLE person2


INSERT INTO person2 values(10, 'test1', 34, 'user@gmail.com')