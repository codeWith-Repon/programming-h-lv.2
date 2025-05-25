# PostgreSQL Learning Notes

This file covers installation steps, user and role management, SQL command basics, data types, table creation, and common operations with examples. Use this as your quick reference guide or study material.

---

## 📦 Installation & Setup

### Install PostgreSQL

- Download from: [https://www.postgresql.org/download](https://www.postgresql.org/download)
- Set a password during installation (e.g., `1234`).

### Add PostgreSQL to Environment Variables (if `psql` doesn't work)

1. Press win-> search env -> Environment Variable -> (system variables find) path -> edit -> New ->
2. Then go to file Explorer -> c drive -> program files -> 17(virson) -> bin -> copy directory and past in path save.

---

## 🖥️ PSQL Commands (Terminal)

```bash
psql -U postgres            # Login as postgres user
\l                          # List all databases
\c database_name            # Connect to a specific database
\d                          # Show all relations (tables, views)
\dt                         # List tables only
\d+                         # Show table with extra info
\dn                         # List all schemas
\du                         # List all roles/users
\conninfo                  # Show current connection info
\! cls                      # Clear terminal
\q                          # Quit PSQL
SELECT version();           # Check PostgreSQL version
create database dabaseName; #create database
\z table_name               # Check permissions
```

# PostgreSQL User, Role, and Privilege Management

Create Users and Roles

```bash
# Create a user with login and encrypted password
CREATE USER user1 WITH LOGIN ENCRYPTED PASSWORD '1234';

# Create a role with login and encrypted password
CREATE ROLE role1 WITH LOGIN ENCRYPTED PASSWORD '1234';
```

# Working with Tables

```bash
# Create a table
CREATE TABLE test_table (
  name VARCHAR(50)
);

# Insert data into the table
INSERT INTO test_table(name) VALUES('mezba');

# View table data as postgres user
SELECT * FROM test_table;
```

Another shell
Go to user1 with postgres database :
psql -U user1 -d postgres

To see table: SELECT \* FROM test_table;

- access denied

You need to access permission to see database information

```bash
# Main Shell
# Grant Full Access to a User
GRANT ALL PRIVILEGES ON TABLE test_table TO user1;
```

now user can access all permission read, write, delete, update

```bash
# now user access
SELECT * FROM test_table;
# show all Data
```

Grant Only Select Permission

```ts
GRANT SELECT ON TABLE test_table TO user2;
```

Revoke Permissions

```ts
REVOKE SELECT ON TABLE test_table FROM user1;
```

Grant Full Access to All Existing Tables in Schema public

```ts
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user2;
```

Grant Permissions for Future Tables

```ts
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO user2;
```

Grant Role Permissions

```ts
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role1;
```

Assign Role to User

```ts
// Give user3 the permissions and access rights of role1.
// In other word
// user3 becomes a member of role1
// user3 inherits all privileges granted to role1

GRANT role1 TO user3;
```

Check Permissions

```bash
  \z table_name
```

Connecting as Another User

```ts
psql -U user1 -d postgres
```

# SQL Language Categories

- DDL: Data Definition Language (CREATE, ALTER, DROP)
- DML: Data Manipulation Language (INSERT, UPDATE, DELETE)
- DCL: Data Control Language (GRANT, REVOKE)
- TCL: Transaction Control Language (BEGIN, COMMIT, ROLLBACK)
- DQL: Data Query Language (SELECT)

# PostgreSQL Data Types Overview

Boolean

- Values: true, false, null

Numeric Types

- SMALLINT: Range -32,768 to 32,767 (2 bytes)
- INT: Range -2,147,483,648 to 2,147,483,647 (4 bytes)
- BIGINT: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,80 (8 bytes)
- FLOAT4: 4 bytes, 6-digit precision
- FLOAT8(Duble Precision): 8 bytes, 15-digit precision
- NUMERIC(precision, scale): Arbitrary precision
- SERIAL: Auto-incrementing integer

Character Types

- CHAR(n): Fixed-length string (padded with spaces)
- Example: CHAR(10) means a fixed-length string of 10 characters.
- VARCHAR(n): Variable-length string (up to n)
- Example: VARCHAR(255) means a variable-length string with a maximum length of 255 characters.

TEXT Type

- TEXT is also a variable-length character type.
- Storage: Similar to VARCHAR, it is not fixed in length.
- Typically used for longer text strings where the exact length is not known or can vary widely.
- Example: TEXT is often used for columns containing large amounts of text.

### Other Types

UUID, ARRAY, JSON, XML, DATE, TIME, TIMESTAMP, INTERVAL

## Creating Tables with Constraints

```ts
// Not null
CREATE TABLE example (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

//Unique
CREATE TABLE example_unique (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE
);

// Foreign Key
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(customer_id)
);

// default
CREATE TABLE example_default (
  id SERIAL PRIMARY KEY,
  status BOOLEAN DEFAULT true
);

//check
CREATE TABLE example_check (
  id SERIAL PRIMARY KEY,
  age INTEGER CHECK (age >= 18)
);
```

### Full Example

```ts
CREATE TABLE person (
  person_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  age INTEGER CHECK (age >= 0),
  email VARCHAR(255) UNIQUE
);
```

# Inserting Data into Tables

Single-Row Insert

```ts
INSERT INTO employees (first_name, last_name, hire_date)
VALUES ('John', 'Doe', '2022-01-15');
```

Multi-Row Insert

```ts
INSERT INTO employees (first_name, last_name, hire_date)
VALUES
  ('Jan', 'Smith', '2022-02-25'),
  ('Bob', 'Johnson', '2021-08-20');
```

## Alter Table

```ts
ALTER TABLE table_name
// -- Example actions:
RENAME TO new_table_name;
ADD COLUMN new_column_name TYPE;
DROP COLUMN column_name;
ALTER COLUMN column_name SET DEFAULT value;
RENAME COLUMN old_name TO new_name;
```

### SELECT Queries

The SELECT statement is used to retrieve data from one or more tables and can be customized with conditions, sorting, and other clauses.

- SELECT: Retrieves data from one or more tables.
- FROM: Specifies the table from which to retrieve data.
- WHERE: Filters data based on specified conditions.
- ORDER BY: Sorts the result set based on specified columns.
- GROUP BY: Groups rows that have the same values in specified columns.
- HAVING: Filters the results of a GROUP BY clause based on specified conditions.
- JOIN: Combines rows from two or more tables based on a related column.
- DISTINCT: Returns unique values in the result set.
- LIMIT: Specifies the maximum number of rows to return.
- OFFSET: Specifies the number of rows to skip before starting to return rows.

```ts
// -- Basic Query
SELECT * FROM table_name;

-- Conditional Query
SELECT * FROM table_name WHERE condition;

// -- Sorting
SELECT * FROM table_name ORDER BY column_name;

// -- Grouping
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;

// -- Filtering Groups
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name HAVING COUNT(*) > 1;

// -- Joins
SELECT a.*, b.* FROM table_a a JOIN table_b b ON a.id = b.a_id;

// -- Distinct
SELECT DISTINCT column_name FROM table_name;

// -- Limit & Offset
SELECT * FROM table_name LIMIT 10 OFFSET 5;
```

# Functions

#### Scalar functions

Scalar functions operate on a single value and return a single value. They perform an operation on each row’s data independently.

Scalar Functions

- UPPER(text) – Converts to uppercase
- LOWER(text) – Converts to lowercase
- CONCAT(str1, str2, ...) – Joins strings
- LENGTH(text) – Returns string length

#### Aggregate functions

Aggregate functions operate on a set of values and return a single value summarizing that set. They perform an operation across multiple rows, often used with the GROUP BY clause.

Aggregate functions:

- AVG(column): Calculate the average of a set of - valucolumnes.
- MAX(column): Returns the max value in a set.
- MIN(column): Returns the minimum value in a set.
- SUM(column): Calculate the sum of values in a set.
- COUNT(\*): Counts the number of rows in a set.
