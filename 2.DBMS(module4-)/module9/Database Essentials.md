# Database essentials

## What is Database?

A database is a structured collection of related data that represent some real world entities and are organized for efficient retrieval, storage, and management.

Database হলো সম্পর্কযুক্ত ডেটার একটি সংগঠিত সংগ্রহ, যা বাস্তব জগতের বিভিন্ন বিষয় বা সত্ত্বাকে উপস্থাপন করে এবং ডেটাকে এমনভাবে সংগঠিত করে রাখা হয় যাতে সহজে ও দক্ষতার সাথে সংরক্ষণ (storage), খোঁজা (retrieval) এবং পরিচালনা (management) করা যায়।

## What is Data?

Data is a raw fact or figure that has no meaning by itself but can be processed to produce useful information.

Data হলো কাঁচা তথ্য বা সংখ্যা (raw fact/figure) — যেগুলোর নিজের মধ্যে আলাদা করে কোনো মানে থাকে না। তবে এগুলোকে প্রক্রিয়াজাত (process) করলে উপযোগী তথ্য (information) তৈরি হয়।

## What is information?

Information is processed and organized data that provides meaningful context, insight or knowledge.

Information হলো এমন ডেটা যা প্রক্রিয়াজাত (processed), সংগঠিত (organized), বা বিশ্লেষণ (analyzed) করা হয়েছে, যাতে সেটি থেকে কোনো অর্থবোধক ধারণা, প্রেক্ষাপট (context), অন্তর্দৃষ্টি (insight), বা জ্ঞান (knowledge) পাওয়া যায়।

## What is a DBMS (Database management System)?

A DBMS is software that is used to store, manage, retrieve, and organize data in databases efficiently.

## What is RDBMS (Relational Database management System)?

RDBMS is a type of DBMS that stores data in tables (also called relations) and uses SQL (Structured Query Language) to manage it.

### Problem in storing data using a file system.

1. Unstructured data, multiple formats.(.txt, .mp4, etc)
2. Data redundancy
3. Data inconsistency
4. No concurrency protocol
5. Security issue
6. Access complication

### Types of Database.

1. Relational -> mySql, postGrace, SQLite, SQL Server
2. Document -> MongoDB, amazon DynamoDb
3. Key value -> redis

# Database Terminologies

- Table / Relation
- Column / Attribute
- Rows / Tuples / Records
- Constraint / Domain
  - **Constraint:** A rule applied on a table/column to enforce data integrity.
  - **Domain:** The permissible set of values that an attribute can take.
- Degree (Collection of Columns)
- Cardinality(collection of rows)

# Database Key Concepts

## What is Key?

**Definition:**  
A key in a relational database is a field (column) or a combination of fields that **uniquely identifies a record** (row/tuple) in a table.

---

## Types of Keys

### 1. Super Key

**Definition:**  
A set of one or more attributes that can uniquely identify a row in a table.

**Example Table:**  
| StudentID | Name | Email |
|-----------|-------|-----------------|
| 1 | Alice | alice@test.com |
| 2 | Bob | bob@test.com |

**Example Super Keys:**

- `{StudentID}`
- `{StudentID, Name}`
- `{StudentID, Email}`

**Identify:**  
Any combination of columns that can uniquely identify a record is a Super Key.

---

### 2. Candidate Key

**Definition:**  
A minimal set of attributes that can uniquely identify a row.  
It cannot have unnecessary attributes.

### What does "Minimal Set" mean?

- The **smallest number of attributes** needed to uniquely identify a row.
- If you remove any attribute from it → uniqueness breaks.

**Example Table:**

| Roll | Name  | Email           |
| ---- | ----- | --------------- |
| 101  | Alice | alice@gmail.com |
| 102  | Bob   | bob@gmail.com   |

- `{Roll}` → ✅ Candidate Key

  - Uniquely identifies rows
  - Minimal (only one attribute)

- `{Roll, Email}` → ❌ Not Candidate Key
  - It’s a **Super Key** (still unique)
  - But not minimal (Roll alone is enough)

**Properties of Candidate Key:**

1. **Uniqueness** → Must uniquely identify each row.
2. **Minimality** → No extra attribute allowed.
3. **No NULLs** → All attributes must have values.

👉 Candidate Key = **Super Key** with no unnecessary attributes.  
👉 Also called **Minimal Super Key**.  
👉 From Candidate Keys, one is chosen as the **Primary Key**.

---

| StudentID | Name  | Email           |
| --------- | ----- | --------------- |
| 101       | Alice | alice@gmail.com |
| 102       | Bob   | bob@gmail.com   |
| 103       | Carol | carol@gmail.com |

- `{StudentID}` → ✅ Candidate Key (unique for each student)
- `{Email}` → ✅ Candidate Key (unique for each student)
- `{StudentID, Email}` → ❌ Super Key but not Candidate Key (not minimal).

---

## 📌 Proper Subset Concept

- **Proper subset** = smaller set of attributes taken from a super key.

Example:

- `{ID, Email}` → ✅ Super Key
  - `{ID}` → ✅ Still Super Key
  - `{Email}` → ✅ Still Super Key
- So, `{ID, Email}` ❌ Not Candidate Key (because subsets are also super keys).

👉 `{ID}` → ✅ Candidate Key (minimal super key).

---

## ✅ Quick Recap

- **Candidate Key** = Minimal Super Key
- **Super Key** = Can uniquely identify rows, but may not be minimal
- From Candidate Keys → one is chosen as **Primary Key**
- Others become **Alternate Keys**

### 3. Alternate Key

**Definition:**  
A candidate key that is **not chosen as the primary key**.

**Example Table:**

| StudentId (PK) | Phone      | Email           |
| -------------- | ---------- | --------------- |
| 101            | 1234567890 | alice@gmail.com |
| 102            | 0987654321 | bob@gmail.com   |

Candidate Keys = `{StudentId}`, `{Email}`, `{Phone}`

- Primary Key → `StudentId`
- Alternate Keys → `Email`, `Phone`

**Identify:**  
Candidate keys not selected as primary keys are alternate keys.

---

### 4. Composite Key

**Definition:**  
A key that consists of **two or more attributes** to uniquely identify a row.

| StudentId | CourseId | Grade |
| --------- | -------- | ----- |
| 101       | C101     | A     |
| 101       | C102     | B     |
| 102       | C101     | A     |

- `StudentId` → ❌ Not unique
- `CourseId` → ❌ Not unique
- `{StudentId, CourseId}` → ✅ Composite Candidate Key

**Identify:**  
Used when a single column is not sufficient to uniquely identify a record.

---

### 5. Foreign Key

**Definition:**  
An attribute (or set of attributes) in one table that **refers to the primary key** in another table.  
It is used to maintain **referential integrity**.

**Example Tables:**

**Users Table (Primary Key):**  
| UserID (PK) | Name |
|-------------|-------|
| 1 | Alice |
| 2 | Bob |

**Orders Table (Foreign Key):**  
| OrderID | UserID (FK) | Product |
|---------|-------------|---------|
| 101 | 1 | Laptop |
| 102 | 2 | Phone |

**Identify:**  
Column in child table that references PK of parent table.

---

### 6. Primary Key

**Definition:**  
A candidate key chosen to **uniquely identify rows** in a table.

**Properties of Primary Key:**

- Unique
- Not NULL
- Only one Primary Key per table
- Chosen from candidate keys

**Example Table:**  
| StudentID (PK) | Name | Age | Department |
|----------------|-------|-----|-----------|
| 1 | Alice | 20 | CSE |
| 2 | Bob | 21 | EEE |
| 3 | Carol | 22 | BBA |

**Identify:**  
Chosen candidate key that ensures uniqueness for each record in the table.

---

## ✅ Comparison: Super Key vs Candidate Key vs Primary Key

| Key Type          | Uniqueness | Minimal | NULL Allowed     | Count per Table |
| ----------------- | ---------- | ------- | ---------------- | --------------- |
| **Super Key**     | ✅         | ❌      | Can include NULL | Many            |
| **Candidate Key** | ✅         | ✅      | ❌               | Many            |
| **Primary Key**   | ✅         | ✅      | ❌               | Only 1          |

## Summary Table of Keys

| Key Type      | Definition                                     | Example / Identify                 |
| ------------- | ---------------------------------------------- | ---------------------------------- |
| Super Key     | Any set of attributes uniquely identifying row | `{StudentID}`, `{StudentID, Name}` |
| Candidate Key | Minimal super key                              | `{StudentID}`, `{Email}`           |
| Alternate Key | Candidate key not primary                      | `Email` if `StudentID` is PK       |
| Composite Key | Two or more columns combined to identify row   | `{StudentID, CourseID}`            |
| Foreign Key   | References PK in another table                 | `Orders.UserID → Users.UserID`     |
| Primary Key   | Chosen candidate key for unique identification | `StudentID`                        |

# Database Design & SDLC

---

## 📌 Software Development Life Cycle (SDLC)

Phases of SDLC:

1. **Planning**
2. **Analysis**
3. **System Design**
4. **Building (Implementation)**
5. **Testing**
6. **Deployment (Maintenance)**

---

## 📌 Purpose of Database Design

- Ensure **structured organization** of data.
- Enable **efficient management and retrieval**.
- Reduce **data redundancy** and **anomalies**.

---

## 📌 Techniques to Design Database

1. **Top-down Approach**
   - Start from a high-level conceptual model and refine down.
2. **Bottom-up Approach**
   - Start from attributes/fields and gradually group into entities.

---

## 📌 Steps of Top-down Technique

1. **Determining Entities**

   - Identify real-world objects (e.g., Student, Course, Teacher).

2. **Determining Attributes For Each Entity**

   - Example: Student → `StudentID, Name, Email`.

3. **Relationships Among Entities**

   - Example: Student **enrolls in** Course.

4. **Solving Many-to-Many Relationships**
   - Use **junction/bridge tables** to break many-to-many into two one-to-many relationships.

---

## 📌 Entity-Relationship (ER) Diagram

- A **visual representation** of data and their relationships.
- Shows **entities, attributes, and relationships**.
- Types of relationships:
  - **One-to-One (1:1)**
  - **One-to-Many (1:N)**
  - **Many-to-Many (M:N)**

---

## 📌 Cardinality

- Defines **how many instances** of one entity relate to another.

Examples:

- **1:1** → Each employee has **one unique ID card**.
- **1:N** → One teacher teaches **many students**.
- **M:N** → Students can enroll in **many courses**, and each course can have **many students**.

---

## 📌 Tooling for ER Diagram

![cardinality](./Picture2.png)

Popular tools for designing ER Diagrams:

- **draw.io (diagrams.net)**
- **Lucidchart**
- **DBDiagram.io**
- **MySQL Workbench**
- **Microsoft Visio**

---

## 📌 Anomalies in Databases

When database design is poor (not normalized), anomalies occur:

1. **Update Anomalies**

   - Same data stored in multiple places → updating one copy but missing others causes inconsistency.

2. **Delete Anomalies**

   - Deleting a record accidentally removes valuable information.

3. **Insert Anomalies**
   - Cannot insert data because other required fields are missing.

---

# Database Normalization

---

## 📌 What is Normalization?

Normalization is a **database design process** that organizes data to minimize **redundancy** and **dependency**, resulting in a more efficient, consistent, and manageable database.

---

## 📌 Functional Dependency

Functional Dependency means that **the value of one attribute uniquely determines the value of another attribute**.

Notation:  
`A → B`

- If two rows have the same value of `A`, then they must have the same value of `B`.
- So, **A functionally determines B**.

### Example:

| StudentID | Name  | DeptID |
| --------- | ----- | ------ |
| 101       | Alice | CSE    |
| 102       | Bob   | EEE    |
| 103       | Alice | CSE    |

- `StudentID → Name` ✅ (each ID has one name)
- `StudentID → DeptID` ✅ (each student belongs to one department)
- `Name → StudentID` ❌ (two students can have the same name)

---

## 📌 Normal Forms (Levels of Normalization)

Normalization is divided into **levels**, called **Normal Forms**.  
Each higher level builds on the rules of the previous level.

---

### 🔴 Unnormalized Form (UNF)

- Data is **not organized**.
- Might contain **multi-valued attributes** or **repeating fields**.

**Example (UNF):**

| StudentID | Name  | Course           |
| --------- | ----- | ---------------- |
| 101       | Alice | DBMS, Networking |
| 102       | Bob   | DBMS             |

**Problem:**

- `Course` column has multiple values → not atomic.

---

### 🟢 1NF – First Normal Form

**Rules of 1NF:**

1. **Atomic values** → Each field should contain only one value (no lists).
2. **Unique column names** → Each column must have a distinct name.
3. **No positional dependency** → Data should not depend on order of columns.
4. **Same data type** → Column values should be of the same type.
5. **Primary Key required** → Must identify each row uniquely.

**Fixed Example (1NF):**

| StudentID | Name  | Course     |
| --------- | ----- | ---------- |
| 101       | Alice | DBMS       |
| 101       | Alice | Networking |
| 102       | Bob   | DBMS       |

✅ Fixes Applied:

- Courses split into separate rows (atomic values).
- No repeating groups.
- Clear and consistent column types.

---

### 📌 Primary Key in 1NF

To make 1NF fully compliant:

- Choose a **Primary Key**.
- Options:
  1. Composite Key → `(StudentID, Course)`
  2. Surrogate Key → Create new column `EnrollmentID`

---

# Second Normal Form (2NF)

## Rules

- Must be in **1NF**
- Must not contain any non-prime (non-key) attribute that is functionally dependent on a **proper subset** of any candidate key of the relation  
  👉 If the table has a composite key (2 or more columns), then no non-key column should depend on just part of that key.  
  👉 It must depend on the **whole key**

---

## Proper Subset

A set **A** is a proper subset of set **B** if:

1. **A** is a subset of **B** (all elements of A are in B)
2. **A** ≠ **B** (A has fewer elements than B)

---

## Problem Scenario: Table in 1NF but not 2NF

| StudentID | Name  | Course     |
| --------- | ----- | ---------- |
| 101       | Alice | DBMS       |
| 101       | Alice | Networking |
| 102       | Bob   | DBMS       |

- **Composite Key**: (StudentID, Course) → uniquely identifies each row
- **Non-prime attribute**: Name

### ❌ Problem

- StudentName depends only on StudentID, not on the full composite key
- This creates a **Partial Dependency** → violates 2NF

---

## Key Terms

- **Candidate Key** → A minimal set of attributes that can uniquely identify a row
- **Composite Key** → A key made of more than one column (e.g., StudentID + Course)
- **Non-prime Attribute** → An attribute that is not part of any candidate key
- **Partial Dependency** → A non-prime attribute depends on part of a composite key, not the whole key

---

## ✅ Solution: Convert to 2NF

### Table 1: Students

| StudentID | Name  |
| --------- | ----- |
| 101       | Alice |
| 102       | Bob   |

### Table 2: Enrollments

| StudentID | Course     |
| --------- | ---------- |
| 101       | DBMS       |
| 101       | Networking |
| 102       | DBMS       |

Now:

- StudentName depends only on StudentID → correct place
- Enrollment table only has data that depends on the full composite key

---

## Rules of 2NF – In Simple Words

1. Must be in **1NF** (atomic values, no repeating groups)
2. No **Partial Dependency** (no non-prime attribute should depend on part of a composite key)
3. Every non-prime attribute must fully depend on the **entire candidate key**

# Third Normal Form (3NF)

## Rules

- Must be in **2NF**
- Must not contain **Transitive Dependency**

---

## Why is 3NF Needed?

To remove transitive dependencies, which can cause:

- Data redundancy
- Update anomalies
- Inconsistent data

---

## Example (Before 3NF — violates it)

### Table: Students

| StudentID | StudentName | DeptID | DeptName |
| --------- | ----------- | ------ | -------- |
| 101       | Alice       | D01    | CSE      |
| 102       | Bob         | D02    | EEE      |
| 103       | Charlie     | D01    | CSE      |

### Analysis

- **Primary Key**: StudentID
- StudentName and DeptID depend on StudentID → ✅ OK
- But DeptName depends on DeptID, not directly on StudentID → ❌ Problem

This is called a **Transitive Dependency**.

---

## Transitive Dependency

If this is true:

- `X → Y` and
- `Y → Z`  
  Then, it must also be true that:
- `X → Z`

In this case:

- StudentID → DeptID → DeptName
- Therefore, StudentID → DeptName (indirect dependency)
- This violates **3NF**

---

## ✅ Fix (Bring to 3NF)

### Students Table

| StudentID | StudentName | DeptID |
| --------- | ----------- | ------ |
| 101       | Alice       | D01    |
| 102       | Bob         | D02    |
| 103       | Charlie     | D01    |

### Departments Table

| DeptID | DeptName |
| ------ | -------- |
| D01    | CSE      |
| D02    | EEE      |

---

## Final Result

- DeptName depends only on DeptID
- No transitive dependency
- ✅ Now the design is in **3NF**
