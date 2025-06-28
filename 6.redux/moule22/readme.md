## Basics of Functional Programming.

🎯 Functional Programming হল প্রোগ্রাম লেখার একটি স্টাইল, যেখানে ফাংশন, ইমিউটেবল ডেটা এবং সাইড-এফেক্ট ফ্রি কোডকে প্রাধান্য দেওয়া হয়।

## 🧠 Functional Programming (FP) কী?

Functional Programming হল এমন একটি paradigm যেখানে প্রোগ্রাম লেখা হয় pure functions দিয়ে এবং state mutation বা side effects যতটা সম্ভব এড়িয়ে চলা হয়।

### 🔑 Functional Programming-এর মূল বৈশিষ্ট্য

| বৈশিষ্ট্য                  | ব্যাখ্যা                                                                  |
| -------------------------- | ------------------------------------------------------------------------- |
| **Pure Functions**         | একই input দিলে সবসময় একই output, কোনো external state এর উপর নির্ভর করে না |
| **Immutability**           | ডেটা পরিবর্তন না করে নতুন কপি তৈরি করা                                    |
| **First-Class Functions**  | ফাংশনগুলোকে variable এ রাখা, argument হিসেবে পাঠানো, return করা যায়       |
| **Higher-Order Functions** | ফাংশন নেয় বা ফাংশন রিটার্ন করে                                            |
| **No Side Effects**        | বাইরের কিছু পরিবর্তন করে না (যেমন: DOM, file, DB)                         |
| **Function Composition**   | ছোট ছোট ফাংশনকে জুড়ে বড় কাজ করা যায়                                       |

### 🔍 ১. Pure Function উদাহরণ

```bash
// ✅ Pure function
function add(a, b) {
  return a + b;
}
```

```bash
// ❌ Impure function (external state)
let counter = 0;
function increment() {
  counter += 1;
}
```

### 🔍 ২. Immutability

```bash
// ❌ Mutation
const user = { name: "Repon" };
user.name = "Tamim";

// ✅ Immutability
const newUser = { ...user, name: "Tamim" };
```

### 🔍 ৩. Higher-Order Function

```bash
// map is a higher-order function
const nums = [1, 2, 3];
const squared = nums.map((n) => n * n);

```

### 🔍 ৪. First-Class Function

```bash
function greet() {
  return "Hello!";
}

const sayHi = greet;         // ✅ function stored in variable
console.log(sayHi());        // Hello!
```

### 🔍 ৫. Function Composition

```bash
const double = (x) => x * 2;
const square = (x) => x * x;

const composed = (x) => square(double(x));  // (2 × 2)² = 16
console.log(composed(2));
```

🧠 Functional Programming ব্যবহার কেন করবো?

✅ Predictable output

✅ Testing-friendly

✅ Less bugs

✅ Code reusability

✅ Easy to debug (no hidden state)

🚫 Imperative vs ✅ Declarative (FP Style)

| Imperative (How)      | Functional (What)          |
| --------------------- | -------------------------- |
| Loop দিয়ে কাজ করা     | map/filter/reduce দিয়ে কাজ |
| state পরিবর্তন        | state কপি করে নতুন তৈরি    |
| control flow manually | ছোট ফাংশনে ভেঙে লেখা       |

### 🧪 JS FP Methods (খুব দরকারি)

- .map()
- .filter()
- .reduce()
- .forEach() (not pure FP but useful)
- compose() / pipe() (Ramda বা Lodash FP লাইব্রেরিতে)

## `🔍 Function Currying কী?`

Function Currying হল একটি ফাংশনকে এমনভাবে রূপান্তর করা, যাতে সেটা একাধিক আর্গুমেন্ট না নিয়ে, প্রতিবার একটি করে আর্গুমেন্ট নেয় এবং পরবর্তীতে আরেকটি ফাংশন রিটার্ন করে।

📌 সাধারণভাবে:

```bash
// সাধারণ function
function add(a, b) {
  return a + b;
}

add(2, 3); // 5
```

➡️ Currying করার পর:

```bash
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

curriedAdd(2)(3); // 5
```

### 🧪 JavaScript এ Currying Example (Arrow Function দিয়ে):

```ts
const multiply = (a) => (b) => (c) => a * b * c;

console.log(multiply(2)(3)(4)); // 24
```

👉 এটা এমনভাবে কাজ করে:

- multiply(2) → returns a function: b => c => 2 `*` b `*` c
- multiply(2)(3) → returns: c => 2 `*` 3 `*` c
- multiply(2)(3)(4) → returns: 24

🎯 কেন Currying দরকার হতে পারে?

✅ ১. Reusability

একবার আর্গুমেন্ট সেট করে future use এ apply করা যায়।

```ts
const add10 = curriedAdd(10); // function যা সব কিছুর সাথে 10 যোগ করে
console.log(add10(5)); // 15
console.log(add10(20)); // 30
```

✅ ২. Partial Application

একটা ফাংশনের কিছু আর্গুমেন্ট আগে থেকেই fix করে ফেলা যায়।

### 🔁 Currying vs Partial Application (সংক্ষেপে পার্থক্য)

| বিষয়                         | Currying | Partial Application                     |
| ---------------------------- | -------- | --------------------------------------- |
| প্রতিবার একটি আর্গুমেন্ট নেয় | ✅       | ❌ (একাধিক আর্গুমেন্ট একবারে নিতে পারে) |
| পুরো ফাংশনকে ভেঙে দেয়        | ✅       | কিছু আর্গুমেন্ট fix করে                 |

### 🔁 Currying Example 1: Simple Greeting

```ts
function greet(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greet('Hello');
console.log(sayHello('Repon')); // Hello, Repon!
console.log(sayHello('Tamim')); // Hello, Tamim!

const sayHi = greet('Hi');
console.log(sayHi('Hasan')); // Hi, Hasan!
```

✅ আমরা greeting fix করে future এ name দিতে পারছি।

### 🔁 Currying Example 2: Math Function (Addition)

```ts
const add = (a) => (b) => a + b;

console.log(add(5)(3)); // 8

const add10 = add(10);
console.log(add10(20)); // 30
console.log(add10(100)); // 110
```

✅ এখানে add10 হচ্ছে এমন এক ফাংশন যা সব কিছুর সাথে 10 যোগ করে।

🔁 Currying Example 4: Formatting Utility

```ts
const formatCurrency = (currency) => (amount) =>
  `${currency}${amount.toFixed(2)}`;

const formatUSD = formatCurrency('$');
const formatBDT = formatCurrency('৳');

console.log(formatUSD(19.9)); // $19.90
console.log(formatBDT(100)); // ৳100.00
```

✅ একই formatter অনেক জায়গায় use করা যাবে।

🔁 Currying Example 5: Filtering Users

```ts
const users = [
  { name: 'Repon', age: 22 },
  { name: 'Tamim', age: 30 },
  { name: 'Hasan', age: 22 },
];

const filterByAge = (age) => (user) => user.age === age;

const age22 = users.filter(filterByAge(22));
console.log(age22);
// [
//   { name: "Repon", age: 22 },
//   { name: "Hasan", age: 22 }
// ]
```

✅ Currying এর মাধ্যমে filter logic আরও reusable হয়েছে।

🔁 Currying Example 6: Currying Function Generator

```ts
function multiply(a, b, c) {
  return a * b * c;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...next) => curried(...args, ...next);
  };
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24
```


