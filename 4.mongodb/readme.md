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

### ### ### 🔹 $in — Value in a List

```bash
db.test.find({ age: { $in: [25, 30, 35] } });
```

✅ Matches documents where age is 25, 30, or \*\*35`.

### ### ### 🔹 $nin — Value Not in a List

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

### ### 🔹 Syntax:

```bash
db.collection.find({ field: { $exists: true } });
```

✅ Returns documents that contain the field

### ### 🔹 Example:

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

### ### 🔹 Syntax:

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

### ### 🔹 Example:

```bash
db.test.find({ age: { $type: "string" } });
```

➡️ Finds documents where age is stored as string, not number.

## ✅ $size

Matches arrays by their length

### ### 🔹 Syntax:

```bash
db.collection.find({ arrayField: { $size: N } });
```

### ### 🔹 Example:

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

### ### ### 🔹 Purpose:

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

### ### ### 🔹 Purpose:

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

### ### ### 🔹 Purpose:

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

### ### 🔹 Purpose:

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

### ### 🔹 Purpose:

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

### ### 🔹 Purpose:

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

### ### 🔹 Purpose:

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
- $[] Updates all array elements (newer feature, called all positional operator)
- $[<identifier>] Used with array filters for more advanced control

### ### 🔹 Bonus: $[] – Update all items in an array

```bash
db.test.updateOne(
  { name: "Sakib" },
  { $set: { "skills.$[].isLearning": false } }
)
```

✅ This sets isLearning: false for all skills items.

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

### Embeddedd Document Vs Referencing Document

Embeddedd

- One-to-One Relationships
- Frequent Reading Data
- Atomic Updates
- Reduced Network Overhead
- Small Data Size

Referencing

- One-to-Many Relationships
- Many-to-Many
- Frequent writing
- Big Data Size
- Scalability
- Flexibility
