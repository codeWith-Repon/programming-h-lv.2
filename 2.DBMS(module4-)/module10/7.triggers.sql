-- Active: 1747413686708@@127.0.0.1@5432@ph

/*
A trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions. 
*/

-- Table-Level Events:
    -- INSERT, UPDATE, DELETE, TRUNCATE
-- Database-Level Events
    -- Database Startup, Database Shutdown, Connection start and end etc

-- CREATE TRIGGER trigger_name
-- {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
-- ON table_name
-- [FOR EACH ROW] 
-- EXECUTE FUNCTION function_name();

DROP TABLE if EXISTS my_users;

CREATE Table my_users
(
    user_name VARCHAR(50),
    email VARCHAR(100)
)

INSERT INTO my_users VALUES('mezba', 'mezba@gmail.com'), ('mir', 'mir@gmail.com');

SELECT * FROM my_users;

CREATE Table deleted_users_audit
(
    deleted_users_name VARCHAR(50),
    deleteAt TIMESTAMP
);

SELECT * FROM deleted_users_audit;

-- triger function
CREATE or REPLACE Function save_deleted_users()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS
$$
    BEGIN
        INSERT INTO deleted_users_audit VALUES(OLD.user_name, now());
        RAISE NOTICE 'Deleted user audit log created';
        RETURN OLD;
    END
$$

-- trigger
CREATE or REPLACE Trigger save_deleted_user_trigger
BEFORE DELETE
on my_users
FOR EACH ROW
EXECUTE FUNCTION save_deleted_users();

DELETE FROM my_users WHERE user_name = 'mir'

SELECT * FROM deleted_users_audit;