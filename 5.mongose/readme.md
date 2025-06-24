## What is Mongoose and Why Use It with MongoDB

### 🧠 `What is Mongoose?`

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

It provides a structured, schema-based solution to define your data, enforce validation, and simplify data access.

Think of it like this:

- MongoDB = raw, flexible JSON-like database.
- Mongoose = structured interface on top of MongoDB that helps you manage data more reliably and cleanly.

### `🔎 Why Use Mongoose with MongoDB?`

Here are some solid reasons:

1. ✅ Schema Definition (Structure Your Data)

- MongoDB is schema-less — you can insert anything.
- But Mongoose lets you define a schema to enforce what fields your documents must have.

```bash
const userSchema = new mongoose.Schema({
name: String,
email: String,
age: Number,
});
```

✅ Prevents mistakes like saving documents with missing or wrong fields.

2. 🛡️ Built-in Data Validation

- You can define rules like "email is required", "age must be above 18", etc.

```bash
const userSchema = new mongoose.Schema({
email: {
type: String,
required: true,
unique: true
},
age: {
type: Number,
min: 18,
}
});
```

✅ Ensures clean, reliable data in your database.

3. 🧪 Powerful Query and Model Features

With Mongoose, you can:

- Query documents easily: User.find({ name: 'Repon' })
- Create/update/delete documents with built-in methods
- Chain queries and add conditions

✅ Makes database operations readable and efficient.

4. 🔗 Relationships with populate()
   You can reference documents in other collections (like SQL JOIN):

```bash
postSchema = new Schema({
title: String,
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
```

Then use:

```bash
Post.find().populate('author')
```

✅ Lets you build relational logic even in NoSQL.

5. 🔁 Middleware / Hooks

- Mongoose lets you run logic before or after saving, deleting, etc.

Example:

```bash
userSchema.pre('save', function(next) {
this.name = this.name.toUpperCase();
next();
});
```

✅ Great for logging, transforming data, etc.

6. 🧰 Schema Methods and Virtuals

   You can attach functions to a schema:

```bash
userSchema.methods.getFullName = function () {
return `${this.firstName} ${this.lastName}`;
};
```

✅ Helps you organize logic around the data itself.

7. 🤝 Integration with Node.js Ecosystem

- Works perfectly with Express.js
- Supports promises, async/await
- Connects easily to MongoDB Atlas or local databases

## 🧩 Difference Between methods and statics

| Feature    | `methods`                                 | `statics`                                             |
| ---------- | ----------------------------------------- | ----------------------------------------------------- |
| Belongs to | A single **document/instance**            | The whole **Model (collection)**                      |
| Access     | Used on a **document** (`this = doc`)     | Used on the **Model** (`this = Model`)                |
| Use Case   | For working with data in **one document** | For doing things like **custom queries or utilities** |
| Example    | `user.getFullName()`                      | `User.findByEmail(email)`                             |

| Type                | Use When...                                                                                                                   | Example                  | In Mongoose      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------- |
| **Instance Method** | You already have a **document instance** and want to perform logic on **that specific document**.                             | `book.borrow(2)`         | `schema.methods` |
| **Static Method**   | You only have the **Model** (not a document) and want to perform logic using **model-level operations** (e.g., find, update). | `Book.borrowBook(id, 2)` | `schema.statics` |
