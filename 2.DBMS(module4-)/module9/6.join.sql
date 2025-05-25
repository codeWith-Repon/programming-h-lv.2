-- Active: 1747413686708@@127.0.0.1@5432@ph
-- =============================
-- 💥 Drop Existing Tables (if any)
-- =============================
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS "user";

-- =============================
-- 👤 Create "user" Table
-- =============================
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE
);

-- =============================
-- 📝 Create "post" Table
-- =============================
CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INTEGER DEFAULT 2 REFERENCES "user"(id) ON DELETE SET DEFAULT
);

-- =============================
-- 👥 Insert Users
-- =============================
INSERT INTO "user" (username) VALUES
    ('akash'),    -- id = 1
    ('batash'),   -- id = 2 (default user_id)
    ('sagor'),    -- id = 3
    ('nodi');     -- id = 4

-- ✅ View All Users
SELECT * FROM "user";

-- =============================
-- 🗒️ Insert Posts
-- =============================
INSERT INTO post (title, user_id) VALUES
    ('Enjoying a sunny day with Akash! ☀️', 2), -- batash
    ('Batash just shared an amazing recipe! 🍲', 1), -- akash
    ('Exploring adventures with Sagor.🌟', 4), -- nodi
    ('Nodi''s wisdom always leaves me inspired. 📚', 4); -- nodi

-- ✅ View All Posts
SELECT * FROM post;

-- =============================
-- 🔗 Join Tables (INNER JOIN)
-- =============================

-- 🎯 Get title of posts and usernames (INNER JOIN)
SELECT title, username 
FROM post
JOIN "user" ON post.user_id = "user".id;

-- 📄 Get full row data from both tables
SELECT * 
FROM post
JOIN "user" ON post.user_id = "user".id;

-- 🆔 Get only post IDs where the post is linked to a user
-- show errr: Which id provided?
SELECT id 
FROM post
JOIN "user" ON post.user_id = "user".id;

-- 🎯 Same as above, but more specific (post.id)
SELECT post.id 
FROM post
JOIN "user" ON post.user_id = "user".id;

-- ✅ Using table aliases (p = post, u = user)
SELECT p.id 
FROM post p
JOIN "user" u ON p.user_id = u.id;

-- ✅ Same as above, with explicit aliasing using AS
SELECT p.id 
FROM post AS p
JOIN "user" AS u ON p.user_id = u.id;

-- ✅ Get all columns from both tables using aliases
SELECT * 
FROM post as p
JOIN "user" as u ON p.user_id = u.id; -- join and INNER Join is same



-- ===========================================
-- 🧠 Summary:
-- - INNER JOIN shows only rows with matching user_id
-- - Table aliases (p, u) make queries cleaner
-- - ON DELETE SET DEFAULT keeps posts assigned to user_id = 2 if a user is deleted
-- ===========================================

-- ================
-- left join
-- ================
INSERT INTO post (title, user_id) 
    VALUES ('This is test title', NULL)

SELECT * FROM post;

SELECT * FROM post 
    LEFT JOIN "user" on post.user_id = "user".id  -- LEFT JOIN and LEFT JOIN OUTER is same

-- ========================
-- right join
-- ========================

SELECT * FROM post 
    RIGHT JOIN "user" on post.user_id = "user".id -- right join and right join outer same

-- ========================
-- full join
-- ========================

SELECT * FROM post 
    FULL JOIN "user" on post.user_id = "user".id

