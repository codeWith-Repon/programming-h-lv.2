-- Active: 1747413686708@@127.0.0.1@5432@ph

-- Show current employee records
SELECT * FROM employees;

-- Drop existing procedure named remove_emp if it exists
DROP PROCEDURE IF EXISTS remove_emp;

-- Create a procedure that deletes employee with ID = 27
CREATE PROCEDURE remove_emp()
LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE FROM employees WHERE employee_id = 27;
END
$$;

-- Call the procedure to delete employee with ID = 27
CALL remove_emp();

-- View updated employee records
SELECT * FROM employees;

-- Create a procedure that uses a variable to delete employee with ID = 26
CREATE PROCEDURE remove_emp_var()
LANGUAGE plpgsql
AS
$$
DECLARE
    test_var INT;  -- Variable to hold the employee ID
BEGIN
    -- Fetch the employee ID into variable
    SELECT employee_id INTO test_var FROM employees WHERE employee_id = 26;

    -- Delete the employee using the variable
    DELETE FROM employees WHERE employee_id = test_var;
END
$$;

-- Call the procedure to remove employee with ID = 26
CALL remove_emp_var();

-- Create a parameterized procedure to remove an employee by ID
CREATE PROCEDURE remove_emp_by_id(p_emp_id INT)
LANGUAGE plpgsql
AS
$$
DECLARE
    test_var INT;  -- Local variable to store the employee ID
BEGIN
    -- Fetch the employee ID matching the input parameter
    SELECT employee_id INTO test_var FROM employees WHERE employee_id = p_emp_id;

    -- Delete the employee using the fetched ID
    DELETE FROM employees WHERE employee_id = test_var;

    -- Display a message after successful deletion
    RAISE NOTICE 'Employee removed successfully!';
END
$$;

-- Call the procedure with a specific employee ID to delete
CALL remove_emp_by_id(25);

-- View updated employee table to verify the deletion
SELECT * FROM employees;
