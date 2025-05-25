-- Active: 1747413686708@@127.0.0.1@5432@ph

DROP TABLE post;
DROP TABLE "user";

-- Create the "user" table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL
);

-- Create the "post" table with foreign key referencing "user"
-- If a user is deleted, set the post's user_id to DEFAULT (which is 2 here)
CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INTEGER DEFAULT 2 REFERENCES "user"(id) ON DELETE SET DEFAULT
);


-- Insert users
INSERT INTO "user" (username) VALUES
('akash'),    -- id = 1
('batash'),   -- id = 2
('sagor'),    -- id = 3
('nodi');     -- id = 4

SELECT * FROM "user";

-- Insert posts associated with users
INSERT INTO post (title, user_id) VALUES
('Enjoying a sunny day with Akash! ☀️', 2),
('Batash just shared an amazing recipe! 🍲', 1),
('Exploring adventures with Sagor.🌟', 4),
('Nodi''s wisdom always leaves me inspired. 📚', 4);

SELECT * FROM post;



-- Insertion constraint on INSERT post
-- Attempting to insert a post with a user ID that does not exist
-- Inserting a post with a valid user ID
-- Attempting to insert a post without specifying a user ID


-- Example of inserting a post (valid)
INSERT INTO post (title, user_id) VALUES('test', 1);

-- Inset value in table in null values;
INSERT INTO post (title, user_id) VALUES('test', NULL);


-- View all posts
SELECT * FROM post;

-- Clean up posts that might have null user_id (before setting NOT NULL constraint)
DELETE FROM post
    WHERE user_id IS NULL;


-- Make user_id NOT NULL (only possible after removing NULLs)
ALTER TABLE post
    ALTER COLUMN user_id SET NOT NULL;


-- Attempting to insert a post with NULL user_id will now fail due to NOT NULL constraint
INSERT INTO post (title, user_id) VALUES('test', NULL); -- ❌ This will error


-- View all users
SELECT * FROM "user";

-- Example of deleting a user
-- Because of ON DELETE SET DEFAULT, posts linked to this user will be reassigned to user_id = 2
DELETE FROM "user" WHERE id = 4;

-- View all posts to see the change after deletion
SELECT * FROM post;


-- ===========================
-- Deletion Constraint Summary
-- ===========================
-- ON DELETE RESTRICT / NO ACTION  → Prevent deletion if referenced (default)
-- ON DELETE CASCADE              → Delete dependent rows
-- ON DELETE SET NULL             → Set foreign key column to NULL
-- ON DELETE SET DEFAULT          → Set foreign key column to its DEFAULT value
