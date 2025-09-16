# MongoDB Guide 📘

## 📑 Table of Contents

- [📥 insert() & insertOne()](#-insert--insertone)
- [🔍 find() & findOne()](#-find--findone)
- [🎯 Field Filtering (Projection)](#-return-only-specific-fields-with-find)
- [🔬 $project (Aggregation)](#-project-used-inside-aggregation)
- [🔍 MongoDB Comparison Operators](#-mongodb-comparison-operators)
- [🧪 Example Queries](#-example-queries)
- [$in, $nin, and Implicit AND](#in-nin-implicit-and-condition)
- [$and (Explicit)](#-and-explicit-and)
- [$or (Either Condition)](#-or-either-condition)
- [$exists, $type, $size](#-exists-type-size)
- [$all](#-all)
- [$elemMatch](#-elemmatch)
- [$set](#-set)
- [$addToSet](#-addtoset)
- [$push](#-push)
- [$unset](#-unset)
- [$pop](#-pop)
- [$pull](#-pull)
- [$pullAll](#-pullall)
- [🔸 Positional Operator `$`](#-what-is-the-positional-operator)
- [🗑️ Delete Documents](#-delete-documents)
- [🧨 Drop a Collection](#-2-drop-a-collection)
- [🚀 What is the Aggregation Framework?](#-what-is-the-aggregation-framework)
  - [$match – Filtering Documents](#-match--filtering-documents)
  - [$project – Selecting or Transforming Fields](#project--selecting-or-transforming-fields)
  - [$addFields](#-addfields--add-or-update-fields)
  - [$out](#-out--save-aggregation-result-to-a-new-collection)
  - [$merge](#-merge--save-aggregation-results-insert-or-update)
  - [$group](#-group)
  - [$unwind](#-unwind)
  - [🧠 $$ROOT](#-what-is-root)
  - [$bucket](#-bucket--group-documents-into-ranges-buckets)
  - [$limit](#-limit--limit-number-of-documents)
  - [$facet](#-what-is-facet)
  - [$lookup – For Joining Collections](#-lookup--for-joining-collections)
- [📦 Embedded vs Referenced Document](#embeddedd-document-vs-referencing-document)
- [⚔️ COLLSCAN vs IXSCAN](#-collscan-vs-ixscan)
- [📘 Compound Index](#-compound-index)
- [🔤 Text Index](#-text-index)

## 📥 insert() & insertOne()

### 👉 insertOne() — insert a single document

```bash
db.test.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
});
```

### 👉 insertMany() — insert multiple documents

```bash
db.test.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 28 }
]);
```

## 🔍 find() & findOne()

### 👉 find() — returns all matching documents

```bash
db.test.find({ age: { $gt: 25 } });
```

### 👉 findOne() — returns only one matching document

```bash
db.test.findOne({ name: "Alice" });
```

## 🎯 Field Filtering (also called Projection)

## 👉 Return only specific fields with find()

```bash
db.test.find(
 { age: { $gte: 25 } },
 { name: 1, age: 1, _id: 0 } // include name and age, exclude _id
);
```

- 1 → include field
- 0 → exclude field

## 🔬 $project (used inside aggregation)

### Example: Show only name and age using $project

```bash
db.test.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      _id: 0
    }
  }
]);
```

## 🔍 MongoDB Comparison Operators

| Operator       | Meaning               | Example Usage           |
| -------------- | --------------------- | ----------------------- |
| `$eq`          | Equal to              | `{ age: { $eq: 25 } }`  |
| `$ne` / `$neq` | Not equal to          | `{ age: { $ne: 25 } }`  |
| `$gt`          | Greater than          | `{ age: { $gt: 30 } }`  |
| `$lt`          | Less than             | `{ age: { $lt: 18 } }`  |
| `$gte`         | Greater than or equal | `{ age: { $gte: 21 } }` |
| `$lte`         | Less than or equal    | `{ age: { $lte: 65 } }` |

## 🧪 Example Queries

### 🔸 Find all people exactly 30 years old

```bash
db.test.find({ age: { $eq: 30 } });
```

### 🔸 Find all people not 30 years old

```bash
db.test.find({ age: { $ne: 30 } });
```

### 🔸 Find all people older than 25

```bash
db.test.find({ age: { $gt: 25 } });
```

### 🔸 Find all people younger than 18

```bash
db.test.find({ age: { $lt: 18 } });
```

### 🔸 Find all people at least 21 years old

```bash
db.test.find({ age: { $gte: 21 } });
```

### 🔸 Find all people aged 60 or below

```bash
db.test.find({ age: { $lte: 60 } });
```

#### 🧠 Note: If age is stored as a string (like "21"), MongoDB compares it as a string, which can cause issues in numeric comparisons. Always store numbers as numbers.

## $in, $nin, implicit and condition

- $in → match if a field's value is in a list
- $nin → match if a field's value is not in a list
- Implicit $and condition

### 🔹 $in — Value in a List

```bash
db.test.find({ age: { $in: [25, 30, 35] } });
```

✅ Matches documents where age is 25, 30, or \*\*35`.

### 🔹 $nin — Value Not in a List

```bash
db.test.find({ age: { $nin: [18, 21] } });
```

✅ Matches documents where age is NOT 18 or 21.

### 🔸 $in Example on Strings

```bash
db.test.find({ "languages": { $in: ["German", "Spanish"] } });
```

✅ Matches documents where the languages array contains either "German" or "Spanish".

## 🧩 Implicit $and (default behavior)

MongoDB automatically ANDs multiple fields when used like this:

```bash
db.test.find({ age: { $gt: 20 }, gender: "Male" });
```

✅ This is the same as:

```bash
db.test.find({ $and: [ { age: { $gt: 20 } }, { gender: "Male" } ] });
```

So:

- { a: X, b: Y } = { $and: [ { a: X }, { b: Y } ] }
- It's called an implicit $and.

## ✅ $and (Explicit AND)

### 📌 Meaning:

#### All conditions must be true.

##### 🔍 Syntax:

```bash
db.test.find({
  $and: [
    { age: { $gt: 25 } },
    { gender: "Male" }
  ]
});
```

## ✅ Implicit AND (Default behavior)

MongoDB automatically ANDs conditions when you list multiple fields:

```bash
db.test.find({
  age: { $gt: 25 },
  gender: "Male"
});
```

✅ This is the same as the $and version above.

🧠 Rule:

```bash
{ field1: value1, field2: value2 }
#  is the same as
{ $and: [ { field1: value1 }, { field2: value2 } ] }

```

### 🔸 When to use explicit $and?

- When combining multiple conditions on the same field
- When dynamically building complex queries

### ✅ Example:

```bash
db.test.find({
  $and: [
    { age: { $gt: 25 } },
    { age: { $lt: 40 } }
  ]
});
```

## ✅ $or (Either condition)

### 📌 Meaning:

At least one condition must be true.

#### 🔍 Syntax:

```bash
db.test.find({
  $or: [
    { gender: "Male" },
    { age: { $lt: 20 } }
  ]
});
```

✅ Matches documents where gender is Male OR age is less than 20.

## 🔍 $exists, $type, $size

### ✅ $exists

Checks if a field exists or not

### 🔹 Syntax:

```bash
db.collection.find({ field: { $exists: true } });
```

✅ Returns documents that contain the field

### 🔹 Example:

➡️ Finds documents where email field exists

```bash
db.test.find({ email: { $exists: true } });
```

➡️ Finds documents where age field does NOT exist

```bash
db.test.find({ age: { $exists: false } });
```

## ✅ $type

Checks the BSON data type of a field

### 🔹 Syntax:

```bash
db.collection.find({ field: { $type: "string" } });
```

| Type Name  | Example Value     |
| ---------- | ----------------- |
| `"string"` | `"hello"`         |
| `"int"`    | `42`              |
| `"bool"`   | `true`            |
| `"array"`  | `[1, 2, 3]`       |
| `"object"` | `{ name: "Ali" }` |

### 🔹 Example:

```bash
db.test.find({ age: { $type: "string" } });
```

➡️ Finds documents where age is stored as string, not number.

## ✅ $size

Matches arrays by their length

### 🔹 Syntax:

```bash
db.collection.find({ arrayField: { $size: N } });
```

### 🔹 Example:

```bash
db.test.find({ skills: { $size: 3 } });
```

➡️ Finds documents where skills array has exactly 3 items

## ✅ $all

### What is $all?

- Matches documents where an array field contains all the specified elements (order doesn't matter).
- Think of it like a "contains all these values" check inside an array.

#### Syntax:

```bash
db.collection.find({ arrayField: { $all: [value1, value2, ...] } });
```

Example:
Suppose you have documents like:

```bash
{
name: "Alice",
skills: ["JavaScript", "Python", "Java"]
},
{
name: "Bob",
skills: ["JavaScript", "C#", "Go"]
}
```

Query:

```bash
db.test.find({ skills: { $all: ["JavaScript", "Python"] } });
```

Result:

Only Alice’s document will match because her skills include both "JavaScript" AND "Python".

## ✅ $elemMatch

### What is $elemMatch?

- Used to match documents where at least one element in an array matches multiple criteria.
- Useful for arrays of objects where you want to match a single element with multiple conditions.

Syntax:

```bash
db.collection.find({
arrayField: { $elemMatch: { field1: value1, field2: value2 } }
});
```

Example:

Suppose your documents have a skills array of objects:

```bash
{
name: "Alice",
skills: [
    { name: "JavaScript", level: "Expert" },
    { name: "Python", level: "Beginner" }
  ]
},
{
name: "Bob",
skills: [
    { name: "JavaScript", level: "Beginner" },
    { name: "Go", level: "Expert" }
  ]
}
```

Query:

```bash
db.test.find({
skills: { $elemMatch: { name: "JavaScript", level: "Expert" } }
});
```

Result:

Only Alice’s document matches because she has a skill object with name = "JavaScript" AND level = "Expert".

## ✅ $set

### 🔹 Purpose:

Sets (creates or updates) the value of a field.

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $set: { fieldName: value } }
)
```

#### 🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $set: { age: 25 } }
)
```

🧠 If age exists, it will be updated. If not, it will be created.

## ✅ $addToSet

### 🔹 Purpose:

Adds a value to an array only if it doesn’t already exist. Prevents duplicates.

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $addToSet: { arrayField: value } }
)
```

🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $addToSet: { languages: "Spanish" } }
)
```

If "Spanish" already exists in languages, nothing happens.

If not, it will be added.

## ✅ $push

### 🔹 Purpose:

Appends a value to an array (duplicates allowed).

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $push: { arrayField: value } }
)
```

🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $push: { languages: "Spanish" } }
)
```

"Spanish" will be added to the languages array even if it already exists.

## 🔁 $push with $each:

You can push multiple items like this:

```bash
db.test.updateOne(
  { name: "Alice" },
  {
    $push: {
      languages: { $each: ["German", "French"] }
    }
  }
)
```

## ✅ $unset

### 🔹 Purpose:

Removes a field from the document.

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $unset: { fieldName: "" } }
)
```

🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $unset: { salary: "" } }
)
```

📌 This removes the salary field completely.

## ✅ $pop

### 🔹 Purpose:

Removes an element from the beginning or end of an array.

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $pop: { arrayField: 1 } }  # 1 = last, -1 = first
)
```

🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $pop: { languages: -1 } }  // Removes the first element
)
```

## ✅ $pull

### 🔹 Purpose:

Removes specific elements from an array that match a condition or value.

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $pull: { arrayField: valueOrCondition } }
)
```

🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $pull: { languages: "Spanish" } }
)
```

📌 This removes "Spanish" from the languages array if it exists.

You can also use a condition:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $pull: { skills: { name: "Kotlin" } } }
)
```

📌 Removes skill objects with name: "Kotlin" from the skills array.

## ✅ $pullAll

### 🔹 Purpose:

Removes multiple specific values from an array at once (must match exactly).

🧠 Syntax:

```bash
db.collection.updateOne(
  { _id: someId },
  { $pullAll: { arrayField: [value1, value2] } }
)
```

🧪 Example:

```bash
db.test.updateOne(
  { name: "Alice" },
  { $pullAll: { languages: ["German", "French"] } }
)
```

📌 Removes both "German" and "French" if they exist in the array.

## 🔸 What is the Positional Operator $?

The $ positional operator is used to update the first matching element in an array that meets a condition.

✅ Syntax:

```bash
db.collection.updateOne(
  { "arrayField.key": value },      // Match condition inside the array
  { $set: { "arrayField.$.key": newValue } }
)
```

✅ Example Data:

```bash
{
  name: "Sakib",
  skills: [
    { name: "JavaScript", level: "Intermediate" },
    { name: "Python", level: "Beginner" }
  ]
}
```

### 🔹 Goal: Update the level of "Python" to "Expert"

💡 Using the positional $ operator:

```bash
db.test.updateOne(
  { name: "Sakib", "skills.name": "Python" },
  { $set: { "skills.$.level": "Expert" } }
)
```

#### 📌 Explanation:

Match: Find the document where name = Sakib and an element in skills has name = Python.

Update: Use skills.$.level to change only that matched array element’s level.

### 🔸 Important Notes

Feature Behavior

- $ Only affects the first matching array element
- $[ ] Updates all array elements (newer feature, called all positional operator)
- $[<identifier> ] Used with array filters for more advanced control

### 🔹 Bonus: $[ ] – Update all items in an array

```bash
db.test.updateOne(
  { name: "Sakib" },
  { $set: { "skills.$[].isLearning": false } }
)
```

✅ This sets isLearning: false for all skills items.

### Sample Data

```bash
{
  "name": "Sakib",
  "skills": [
    { "name": "Go", "level": "Beginner" },
    { "name": "Python", "level": "Beginner" }
  ]
}
```

```json
db.test.updateOne(
  { name: "Sakib" },
  [
    { $set: {
        skills: {
          $map: {
            input: "$skills",   // skills array এর প্রতিটি element নিয়ে কাজ করবে
            as: "s",            // প্রতিটি element কে "s" নামে ধরবে
            in: {
              $cond: [
                { $eq: ["$$s.name", "Python"] },   // যদি element.name Python হয়
                { name: "$$s.name", level: "Expert" }, // level → Expert
                "$$s"                              // নাহলে আগের element আগের মতো রাখবে
              ]
            }
          }
        }
    }}
  ]
)

```

#### result

```yaml
{
  'name': 'Sakib',
  'skills':
    [
      { 'name': 'Go', 'level': 'Beginner' },
      { 'name': 'Python', 'level': 'Expert' },
    ],
}
```

## 🗑️ Delete Documents

### 🔹 deleteOne()

Deletes the first matching document.

```bash
db.collection.deleteOne({ field: value })
```

Example:

```bash
db.users.deleteOne({ name: "Sakib" })
```

### 🔹 deleteMany()

Deletes all matching documents.

```bash
db.collection.deleteMany({ field: value })
```

Example:

```bash
db.users.deleteMany({ age: { $lt: 20 } })
```

### 🔹 Delete all documents in a collection (but not the collection itself):

```bash
db.collection.deleteMany({})
```

## 🧨 2. Drop a Collection

Deletes the entire collection, including all documents and indexes.

```bash
db.collection.drop()
```

Example:

```bash
db.users.drop()
```

✅ After this command, the users collection is gone completely.

⚠️ Warnings

- deleteMany({}) = deletes all documents, but keeps the collection.
- drop() = deletes the entire collection.
- These operations are irreversible in production — always use with caution.

## 🚀 What is the Aggregation Framework?

`The Aggregation Framework allows you to process data records and return computed results. It works like a pipeline — data flows through stages, and each stage transforms the data.`

## 🔍 $match – Filtering Documents

### ✅ Purpose:

Filters the documents just like the .find() method, but as a stage in the pipeline.

📘 Syntax:

```bash
{ $match: { field: value } }
```

📌 Example:

```bash
db.users.aggregate([
  { $match: { age: { $gte: 18 } } }
])
```

✅ This filters and returns only documents where age is 18 or above.

🧱 $project – Selecting or Transforming Fields

✅ Purpose:

- Include or exclude fields
- Rename fields
- Add computed fields
- Reshape documents

📘 Syntax:

```bash
{ $project: { field1: 1, field2: 1, _id: 0 } }
# 1 = include, 0 = exclude

```

📌 Example:

```bash
db.users.aggregate([
  { $project: { name: 1, age: 1, _id: 0 } }
])
```

✅ This will return only name and age fields, excluding \_id.

🤝 Using $match and $project together

```bash
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $project: { name: 1, age: 1, email: 1, _id: 0 } }
])
```

✅ Output: Only adult users, showing their name, age, and email.

## 🧩 $addFields — Add or Update Fields

### ✅ Purpose:

Adds new fields or updates existing ones without removing any other fields.

📘 Syntax:

```bash
{ $addFields: { newField: <expression> } }
```

📌 Example:

```bash
db.users.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] }
    }
  }
])
```

✅ Adds a new fullName field by combining first and last names.

## 📤 $out — Save Aggregation Result to a New Collection

### ✅ Purpose:

Writes the final output of the aggregation to a new collection, replacing the old one if it exists.

### ⚠️ Note: This ends the pipeline, so it must be the last stage.

📘 Syntax:

```bash
{ $out: "newCollectionName" }
```

📌 Example:

```bash
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $out: "adults" }
])
```

✅ Creates a new collection called adults with only users aged 18+.

## 🔀 $merge — Save Aggregation Results (Insert or Update)

### ✅ Purpose:

Writes the output of the pipeline to a target collection, with flexible options:

- Insert new documents
- Merge (update) existing documents
- Replace existing documents

📘 Syntax:

```bash
{
  $merge: {
    into: "targetCollection",
    on: "_id",
    whenMatched: "merge",    // or "replace", "fail", "keepExisting"
    whenNotMatched: "insert" // or "discard", "fail"
  }
}
```

📌 Example:

```bash
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  {
    $merge: {
      into: "adults",
      on: "_id",  #optional
      whenMatched: "merge", #optional
      whenNotMatched: "insert" #optional
    }
  }
])
# you can write like this
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  {
    $merge: "adults"
  }
])
```

✅ Updates or inserts records into the adults collection.

🆚 $out vs $merge
| Feature            | `$out`                |`$merge` |
| ------------------ | ---------------------- | --------------------------------------- |
| Replaces data | Yes (whole collection) | No (updates or inserts individual docs) |
| Overwrites safely | No | Yes (custom merge rules) |
| Must be last stage | ✅ | ✅ |

## 🔁 $group

The $group stage is used to group documents by a specific field and apply aggregation operations like $sum, $avg, $push, etc.

📌 Syntax:

```bash
{
  $group: {
    _id: "$fieldName",  // group by this field
    resultField: { aggregationOperator: "$anotherField" }
  }
}
```

## 💯 $sum

$sum is used to calculate the total of a numeric field within each group.

📘 Example: Total salary by company

```bash

db.users.aggregate([
  {
    $group: {
      _id: "$company",
      totalSalary: { $sum: "$salary" }
    }
  }
])

```

👆 This groups all users by company and sums their salary.

## 📥 $push

$push is used to create an array of values (from a field) in each group.

📘 Example: List of names by city

```bash
db.users.aggregate([
  {
    $group: {
      _id: "$address.city",
      people: { $push: "$name.firstName" }
    }
  }
])
```

👆 This creates an array of all first names for each city.

### 🧠 Full Example

### 🎯 Task: Group users by course and:

- Count total students in each course
- Collect all emails in that course

```bash
db.users.aggregate([
  {
    $group: {
      _id: "$course",
      totalStudents: { $sum: 1 },
      emails: { $push: "$email" }
    }
  }
])
```

🧾 Result:

```bash
{
  "_id": "level-2",
  "totalStudents": 5,
  "emails": [
    "ali@mail.com",
    "sakib@mail.com",
    "nodi@mail.com"
  ]
}
```

# 🧩 MongoDB Aggregation: `$group` with `$unwind`

## 🔄 `$unwind`

The `$unwind` stage is used to **deconstruct an array field** from the input documents and **output a document for each element** in the array.

### 📌 Syntax

```js
{
  $unwind: '$arrayField';
}
```

## 🔁 `$group` + `$unwind`

When combined with `$group`, `$unwind` is especially powerful for aggregating data from array fields.

#### 📘 Example:

Count how many people know each skill
Assume each user document has a skills array like:

```bash
"skills": [
  { "name": "JavaScript", "level": "Expert" },
  { "name": "Python", "level": "Beginner" }
]
```

#### 🛠 Query

```bash
db.users.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$skills.name",
      totalPeople: { $sum: 1 }
    }
  }
])
```

✅ Output

```bash
[
  { "_id": "JavaScript", "totalPeople": 20 },
  { "_id": "Python", "totalPeople": 15 },
  { "_id": "C#", "totalPeople": 8 }
]
```

📌 This means 20 people have JavaScript as a skill, 15 know Python, etc.

### 🎯 Real Example: From Your Dataset

Let’s say you want to:

- List how many people are currently learning each skill.
- The skill status is stored as isLearning: true.

Query

```bash
db.users.aggregate([
{ $unwind: "$skills" },
{ $match: { "skills.isLearning": true } },
{
$group: {
_id: "$skills.name",
totalLearning: { $sum: 1 }
}
}
])
```

Output

```bash
[
  { "_id": "C#", "totalLearning": 1 },
  { "_id": "GO", "totalLearning": 2 }
]
```

🧠 This tells you how many users are learning each skill.

## 🧠 What is $$ROOT?

It gives you access to the full document from within an aggregation stage.

Useful when you want to preserve the full document while projecting, grouping, or transforming.

📘 Example Use Case: `$group` to get the highest salary per company but keep the full document

```bash
db.users.aggregate([
  {
    $sort: { salary: -1 } # sort by salary descending
  },
  {
    $group: {
      _id: "$company",
      topEarner: { $first: "$$ROOT" } # get full document of top earner
    }
  }
])
```

#### 🧾 Output Example:

```bash
{
  "_id": "Skipfire",
  "topEarner": {
    "_id": ObjectId("..."),
    "name": { "firstName": "Mariele", "lastName": "Dangl" },
    "salary": 363,
    "company": "Skipfire",
    ...
  }
}
```

## 🪣 $bucket — Group documents into ranges (buckets)

### 📌 Purpose:

Categorize documents based on a numeric field into defined ranges (like age groups, salary bands, etc.).

📘 Syntax:

```bash
{
  $bucket: {
    groupBy: "$fieldName",   # Must be a number field
    boundaries: [0, 20, 40, 60, 80],  # Ranges (start inclusive, end exclusive)
    default: "Other",        # Optional: where unmatched values go
    output: {
      count: { $sum: 1 },
      items: { $push: "$name" }
    }
  }
}
```

🧠 Example:
Group users by salary ranges:

```bash
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$salary",
      boundaries: [0, 100, 300, 500],
      default: "Other",
      output: {
        count: { $sum: 1 },
        emails: { $push: "$email" }
      }
    }
  }
])
```

## 🔢 `$limit` — Limit number of documents

### 📌 Purpose:

Restrict output to a certain number of documents.

📘 Syntax:

```bash
{ $limit: 5 }  # Only 5 documents will pass
```

#### 🧠 Example:

Top 5 highest-paid users:

```bash
db.users.aggregate([
  { $sort: { salary: -1 } },
  { $limit: 5 }
])
```

## 💡 What is $facet?

`$facet` allows you to run multiple aggregation pipelines in parallel on the same input data and return all the results in a single document.

#### 📌 Why use $facet?

It’s useful when you:

- Want to group, filter, and transform data in different ways at the same time.
- Need to generate multiple views (e.g., statistics, summaries, paginated lists) from the same dataset in one go.

📘 Syntax:

```bash
db.collection.aggregate([
  {
    $facet: {
      output1: [ /* pipeline 1 */ ],
      output2: [ /* pipeline 2 */ ],
      ...
    }
  }
])
```

#### 🧠 Example:

🎯 Task: From a users collection:

- Count how many users are Male and Female.
- Get top 3 earners.
- Group by course.

```bash
db.users.aggregate([
  {
    $facet: {
      genderStats: [
        { $group: { _id: "$gender", total: { $sum: 1 } } }
      ],
      topEarners: [
        { $sort: { salary: -1 } },
        { $limit: 3 },
        { $project: { name: 1, salary: 1 } }
      ],
      byCourse: [
        { $group: { _id: "$course", count: { $sum: 1 } } }
      ]
    }
  }
])
```

✅ Output example:

```bash
{
  genderStats: [
    { _id: "Male", total: 5 },
    { _id: "Female", total: 3 }
  ],
  topEarners: [
    { name: "Sakib", salary: 5000 },
    { name: "Nodi", salary: 4500 },
    ...
  ],
  byCourse: [
    { _id: "Level-2", count: 6 },
    { _id: "Level-1", count: 2 }
  ]
}
```

🧾 Use cases:

- Dashboard data (stats + charts)
- E-commerce filters (brands + prices + ratings)
- Blog analytics (top authors + most views + recent posts)

## 🔍 $lookup – For Joining Collections

In MongoDB, $lookup is used to perform joins between two collections — similar to SQL joins — even though MongoDB is a NoSQL database.

### 📘 Syntax of $lookup

```bash
{
  $lookup: {
    from: "otherCollection",      # Collection to join with
    localField: "fieldInThis",    # Field from the current collection
    foreignField: "fieldInOther", # Field from the other collection
    as: "outputArray"             # Name of the new field for matched data
  }
}
```

✅ Example:

1.  orders Collection:

```bash
{
  _id: 1,
  customerId: "C123",
  total: 200
}
```

2. customers Collection:

```bash
{
  _id: "C123",
  name: "Ali Hossain",
  email: "ali@example.com"
}
```

Aggregation Query:

```bash
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo"
    }
  }
])
```

🧾 Output:

```bash
{
  _id: 1,
  customerId: "C123",
  total: 200,
  customerInfo: [
    {
      _id: "C123",
      name: "Ali Hossain",
      email: "ali@example.com"
    }
  ]
}
```

### Embeddedd Document Vs Referencing Document

📌 Embedded Document (ডকুমেন্টের ভেতরে ডেটা রাখা)

👉 ডেটা সরাসরি মূল ডকুমেন্টের ভেতরে রাখা হয়।

কখন ব্যবহার করবে:

- One-to-One Relationship

  - যেমন: ইউজারের প্রোফাইল + অ্যাড্রেস একসাথে রাখা।

- Frequent Reading Data

  - একইসাথে ডেটা পড়তে হয় (join দরকার নেই)।

- Atomic Updates

  - একটা ডকুমেন্টের মধ্যে সব আপডেট একসাথে করা যায়।

- Reduced Network Overhead

  - একবারেই পুরো ডেটা পাওয়া যায়, আলাদা query লাগে না।

- Small Data Size

  - ডেটা ছোট হলে একসাথে রাখা সহজ।

📌 Referencing Document (ডেটাকে আলাদা কালেকশনে রাখা এবং reference ব্যবহার করা)

👉 এখানে আলাদা collection এ ডেটা রাখা হয়, আর ObjectId বা অন্য key দিয়ে সম্পর্ক তৈরি করা হয়।

কখন ব্যবহার করবে:

- One-to-Many Relationship

  - যেমন: একজন ইউজারের অনেকগুলো অর্ডার।

- Many-to-Many Relationship

  - যেমন: ইউজার অনেক কোর্স এনরোল করতে পারে, আর কোর্সে অনেক ইউজার থাকতে পারে।

- Frequent Writing

  - আলাদা আলাদা অংশ বারবার আপডেট করতে হয়।

- Big Data Size

  - ডেটা অনেক বড় হলে একসাথে রাখা অকার্যকর।

- Scalability & Flexibility
  - আলাদা কালেকশন হিসেবে বড় ডেটা ম্যানেজ করা সহজ।

## ⚔️ COLLSCAN vs IXSCAN

| Feature        | `COLLSCAN`                           | `IXSCAN`                                  |
| -------------- | ------------------------------------ | ----------------------------------------- |
| Stands for     | Collection Scan                      | Index Scan                                |
| How it works   | Checks **every document** one-by-one | Uses **index structure** to jump directly |
| Performance    | Slow (linear search)                 | Fast (optimized search)                   |
| When it occurs | No index is present for the query    | An index **matches the query**            |

## 🧪 Example:

### ❌ Without Index:

```bash
db.users.find({ age: 25 })
```

MongoDB will COLLSCAN the entire collection.

✅ With Index:

```bash
db.users.createIndex({ age: 1 })
db.users.find({ age: 25 })
```

Now MongoDB will do an IXSCAN — fast!

### 🔍 Check Query Plan:

To see how MongoDB executes a query:

```bash
db.users.find({ age: 25 }).explain("executionStats")
```

You will see either:

- "stage": "COLLSCAN" → No index used
- "stage": "IXSCAN" → Index used

## 📘 Compound Index

A compound index is an index on multiple fields in a document.

### 📌 Syntax:

```bash
db.collection.createIndex({ field1: 1, field2: -1 })
# 1 means ascending
# -1 means descending
```

✅ Example:

```bash
db.users.createIndex({ age: 1, name: 1 })
```

This index will help speed up queries like:

```bash
db.users.find({ age: 25, name: "Sakib" })
```

#### 💡 Notes:

- The order of fields matters in compound indexes.
- This index can be used for queries that use the prefix of the fields (age, or age + name), but not just name alone.

## 🔤 Text Index

A text index allows you to perform full-text search on string content.

### 📌 Syntax:

```bash
db.collection.createIndex({ field: "text" })
```

✅ Example:

```bash
db.articles.createIndex({ title: "text", body: "text" })
```

Then you can search like this:

```bash
db.articles.find({ $text: { $search: "mongodb indexing" } })
```

#### 🧠 Features:

- Supports language-based stemming and stop words (e.g., ignores "the", "is").
- Can search multiple fields with one text index.

#### 🔐 Limitations:

- Only one text index allowed per collection.
- You cannot combine text search with some operators like $or directly.
