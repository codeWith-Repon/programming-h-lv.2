# 📘 Table of Contents

## 🧠 Core Concepts

- [What is State? Understanding the Core of UI Logic](#what-is-state-understanding-the-core-of-ui-logic)
- [🎯 উদাহরণ দিয়ে বোঝানো যাক](#উদাহরণ-দিয়ে-বোঝানো-যাক)
- [📦 State কোথায় থাকে?](#state-কোথায়-থাকে)
- [💡 কেন State গুরুত্বপূর্ণ?](#কেন-state-গুরুত্বপূর্ণ)

## 🔁 React State Behavior

- [How State Triggers Renders in React](#how-state-triggers-renders-in-react-react-এ-state-কীভাবে-render-ট্রিগার-করেঃ)
- [⚖️ Stateless vs Stateful Component](#stateless-vs-stateful-component)
- [Synchronous vs Asynchronous Behavior of useState](#synchronous-vs-asynchronous-behavior-of-usestate)

## 🔍 Behind the Scenes

- [How useState Works Behind the Scenes (Simulated in Vanilla JS)](#how-usestate-works-behind-the-scenes-simulated-in-vanilla-js)
- [Multiple useState Simulation in Vanilla JS](#multiple-usestate-simulation-in-vanilla-js)

## ⚙️ React Internals

- [React Reconciler & Fiber Explained Simply](#react-reconciler--fiber-explained-simply)
- [🖼️ উদাহরণ দিয়ে Fiber বোঝা](#উদাহরণ-দিয়ে-fiber-боঝা)
- [⚙️ Fiber এর সুবিধা](#fiber-এর-সুবিধা)

## 🌟 Advanced Concepts

- [What Are Signals? The Future of Reactive State](#what-are-signals-the-future-of-reactive-state)
- [Signals vs useState](#signals-vs-usestate)
- [Signals কেন ভবিষ্যৎ](#signals-কেন-ভবিষ্যৎ)

## 🧩 Working with Complex State

- [Using Objects as State in React: Gotchas & Best Practices](#using-objects-as-state-in-react-gotchas--best-practices)

## 🧠 useReducer

- [useReducer: When useState Isn’t Enough](#usereducer-when-usestate-isnt-enough)

## What is State? Understanding the Core of UI Logic

### 🧠 State কী?

State হলো কোনো অ্যাপ্লিকেশন বা UI-এর এমন একটি অবস্থা (data/condition) যা সময়ের সাথে পরিবর্তন হয় এবং যার উপর ভিত্তি করে UI-এর আকার বা আচরণ নির্ধারিত হয়।

সহজ ভাষায় বললে — state মানে হলো “একটা সময়ের snapshot” যেখানে আপনার অ্যাপ এখন আছে।

## 🎯 উদাহরণ দিয়ে বোঝানো যাক:

ধরুন, আপনি একটা Counter অ্যাপ বানাচ্ছেন যেখানে একটা সংখ্যা দেখানো হয়, আর আপনি একটি বাটনে ক্লিক করলে সংখ্যাটা বাড়ে।

```bash
let count = 0; // এটাই হলো আমাদের State
```

- যখন count = 0, তখন UI দেখাবে: 0
- আপনি বাটনে ক্লিক করলে count = 1 হয়ে যাবে
- তখন UI আবার আপডেট হয়ে দেখাবে: 1

এখানে count হচ্ছে state — এটা বদলালে UI বদলায়।

## 📦 State কোথায় থাকে?

- Vanilla JS: সাধারণ ভ্যারিয়েবলের মধ্যে
- React: useState, useReducer, অথবা Context API ব্যবহার করে
- Redux: একটি centralized store-এ রাখা হয়

## 💡 কেন State গুরুত্বপূর্ণ?

- UI কে ডায়নামিক করার জন্য
- ইউজারের ইনপুট বা ইন্টারঅ্যাকশন অনুযায়ী ডেটা ম্যানেজ করার জন্য
- অ্যাপ্লিকেশন এর অবস্থা (condition) অনুযায়ী নির্ণয় নিতে

## How State Triggers Renders in React( React-এ State কীভাবে Render ট্রিগার করে)

React-এর একটি core feature হলো 👉 "state বদলালে UI আপডেট হয় (re-render হয়)"।
এই জিনিসটাই React-কে ডায়নামিক এবং ইন্টার‌অ্যাকটিভ করে তোলে।

State কীভাবে Render ট্রিগার করে:

✅ ১. State declare

```bash
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // এখানেই state তৈরি
  ...
}
```

এখানে count হলো state, আর setCount হলো state আপডেট করার function।

✅ ২. State ব্যবহার করে UI দেখানো

```bash
return (
  <div>
    <h1>{count}</h1>  {/* state ব্যবহার */}
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </div>
);
```

প্রথমবার render-এ, UI-তে দেখাবে 0।

✅ ৩. State আপডেট করা হয় (setCount দিয়ে)
যখন ইউজার বাটনে ক্লিক করে:

```bash
setCount(count + 1);
```

👉 তখন React-এর ভিতরের একটি মেকানিজম কাজ করে:

- count মান পাল্টে যায় (আগে 0 → এখন 1)
- React বুঝতে পারে: "State বদলেছে"
- তখন সে আবার render করে সেই কম্পোনেন্ট

### 🔄 React কীভাবে বুঝে render করতে হবে?

React-এর ভিতরে একটা "Virtual DOM" থাকে।

🔍 যখন state বদলায়:

- React পুরনো Virtual DOM আর নতুন Virtual DOM এর মধ্যে পার্থক্য খুঁজে বের করে
- যেখানে পরিবর্তন আছে, শুধু সেখানেই UI আপডেট করে
  👉 একে বলে efficient re-rendering

📌 কেন এটা দরকার?

- ইউজার ক্লিক করলে UI তৎক্ষণাৎ বদলাবে
- অ্যাপ্লিকেশন থাকবে ইনটার‌্যাকটিভ
- কোড থাকবে সহজ এবং predictable

### ⚖️ Stateless vs Stateful Component

| বৈশিষ্ট্য            | Stateless Component                 | Stateful Component               |
| -------------------- | ----------------------------------- | -------------------------------- |
| 📦 State আছে?        | না                                  | হ্যাঁ                            |
| 🧠 ব্যবহৃত হয় যখন    | শুধুমাত্র props দিয়ে data দেখাতে হয় | dynamic data manage করতে হয়      |
| 🔁 Re-render হয় কখন? | props বদলালে                        | state বা props বদলালে            |
| 🔧 উদাহরণ            | UI layout, header/footer            | form, counter, toggle button     |
| ⚙️ API               | শুধু `props`                        | `useState`, `useReducer` ইত্যাদি |

## How useState Works Behind the Scenes (Simulated in Vanilla JS)

🔍 useState কী করে?

React এ useState মূলত:

- একটা value ধরে রাখে (state)
- একটা function দেয় (setter), যা value আপডেট করলে component আবার render হয়

এখন Vanilla JS দিয়ে আমরা কিভাবে এই মেকানিজম বুঝি, সেটা দেখি।

### 🧪 Simulate useState in Vanilla JS

```bash
// useState এর মতো আচরণ করতে একটা simple ফাংশন বানাচ্ছি
function createUseState(initialValue) {
  let state = initialValue;

  function getState() {
    return state;
  }

  function setState(newValue) {
    state = newValue;
    render(); // simulate re-render
  }

  return [getState, setState];
}
```

## 🧪 React-এর মতো Component Simulate:

```bash
let [getCount, setCount] = createUseState(0);

function render() {
  console.clear();
  console.log("Count:", getCount());

  // Simulate a button click
  console.log("Clicking the button...");
  setTimeout(() => {
    setCount(getCount() + 1);
  }, 1000);
}

// প্রথমবার render কল
render();
```

## 🧠 এখানে কী হচ্ছে:

- আমরা createUseState(0) কল করছি → এটা state = 0 ধরে রাখে
- যখন setState কল হয়:
  - state আপডেট হয়
  - render() আবার চালু হয়, ঠিক React-এর মতো

### 🔁 Output (সেকেন্ড প্রতি):

```bash
Count: 0
Clicking the button...
Count: 1
Clicking the button...
Count: 2
Clicking the button...
...
```

## ✅ Multiple useState সিমুলেট করা Vanilla JS দিয়ে

এবং এর মাধ্যমে বুঝবো React কীভাবে Hooks এর অর্ডার অনুযায়ী কাজ করে।

### 🧠 React-এর ভিতরে কী হয়?

React যখন useState() কল করে, তখন সে internal একটা list ধরে, যেটাতে প্রতিটি হুকের মান (state, effect ইত্যাদি) রাখা হয়।

React ধারণা করে যে:
👉 “Hooks সবসময় একই অর্ডারে কল হবে।”

### 🧪 Vanilla JS দিয়ে Multiple useState Simulation:

```bash
let hookStates = [];
let hookIndex = 0;

function useState(initialValue) {
  const currentIndex = hookIndex;

  if (hookStates[currentIndex] === undefined) {
    hookStates[currentIndex] = initialValue;
  }

  function setState(newValue) {
    hookStates[currentIndex] = newValue;
    render();
  }

  hookIndex++;
  return [hookStates[currentIndex], setState];
}
```

### 🔁 Simulate a Component:

```bash
function MyComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Repon");

  console.log("Rendering...");
  console.log("Count:", count);
  console.log("Name:", name);

  // Simulate interaction
  setTimeout(() => {
    setCount(count + 1);
  }, 1000);

  setTimeout(() => {
    setName(name + "!");
  }, 2000);
}

function render() {
  hookIndex = 0; // Reset before each render (important)
  MyComponent();
}

// Initial render
render();
```

### 🔍 কী হচ্ছে এখানে?

| ধাপ          | ব্যাখ্যা                                             |
| ------------ | ---------------------------------------------------- |
| `hookStates` | সব হুকগুলোর মান ধরে রাখে (যেমন React internal array) |
| `hookIndex`  | কোন হুক এখন active তা ট্র্যাক করে                    |
| `useState`   | প্রতিবার আলাদা index-এ state রাখে                    |
| `render()`   | আবার কম্পোনেন্ট চালায় + হুক index reset করে          |

### 🧾 Output (সময় অনুযায়ী):

```bash
Rendering...
Count: 0
Name: Repon

// ১ সেকেন্ড পর:
Rendering...
Count: 1
Name: Repon

// ২ সেকেন্ড পর:
Rendering...
Count: 1
Name: Repon!
```

## React Reconciler & Fiber Explained Simply

### 🔍 Reconciler মানে কী?

Reconciler হলো React-এর সেই অংশ, যা ঠিক করে:

- “কোন Component, কোন DOM Node আবার আপডেট করতে হবে?”

এটা হচ্ছে React-এর compare আর update logic।

যখন আপনি state বা props আপডেট করেন, React Virtual DOM তৈরি করে এবং তারপর দেখে আগের Virtual DOM এর সাথে নতুন Virtual DOM-এ পার্থক্য কোথায়, তারপর শুধু ওই অংশই DOM-এ আপডেট করে।

### 🧠 Fiber Architecture কী?

React 16 থেকে, Reconciler তৈরি করা হয় Fiber architecture দিয়ে।

Fiber হলো:

React-এর একেকটা Component বা কাজ (unit of work) কে Represent করার জন্য ছোট ছোট Node (Fiber Node)।

Fiber দিয়ে React এখন কাজগুলো break করে ছোট ছোট অংশে, যাতে সে pause/resume/cancel করতে পারে। এটাই React কে non-blocking UI update করতে সাহায্য করে।

### 🔄 Fiber & Reconciliation – Workflow:

✅ Step-by-Step

1. State বা Props আপডেট হয়
2. React একটা নতুন Virtual DOM তৈরি করে
3. Fiber Engine বলে:

- কে নতুন আছে?
- কে বদলেছে?
- কে বাদ গেছে?

4.  এই সব পার্থক্য দেখে Work Units এ ভাগ করে কাজ শুরু করে
5.  ব্রাউজারের idle time এ কাজগুলো করে (সাধারণত requestIdleCallback দিয়ে)
6.  সব কাজ শেষ হলে — শুধু পরিবর্তিত DOM গুলো Update করে

## 🖼️ উদাহরণ দিয়ে বুঝি:

আপনার কম্পোনেন্ট এর আগে DOM এ দেখাচ্ছিল:

```bash
<ul>
  <li>🍎 Apple</li>
  <li>🍌 Banana</li>
</ul>
```

আপনি setState দিয়ে পরিবর্তন করে ফেললেন:

```bash
<ul>
  <li>🍎 Apple</li>
  <li>🍇 Grape</li>
</ul>
```

React কী করবে?

1. Fiber Node তৈরি হবে <li>🍇 Grape</li> এর জন্য

2. Fiber Reconciler বলবে:

- “আগে ছিল Banana, এখন Grape — মানে এটা পরিবর্তিত হয়েছে”

3. তাই শুধু সেই DOM Node টুকু আপডেট হবে।

### ⚙️ Fiber এর সুবিধা:

| ফিচার                      | ব্যাখ্যা                                             |
| -------------------------- | ---------------------------------------------------- |
| 🧩 Work Splitting          | বড় কম্পোনেন্ট গুলো ছোট কাজ (Fiber units) এ ভাগ হয়    |
| 🔄 Interruptible rendering | ব্রাউজার ব্যস্ত থাকলে React রেন্ডার থামাতে পারে      |
| ⏱️ Scheduling              | React কাজের অগ্রাধিকার দিতে পারে (low/high priority) |
| 🚀 Fast UI                 | Smooth & responsive UI পাওয়া যায়                     |

## Synchronous vs Asynchronous Behavior of useState

### 🔍 মূল বিষয়:

❓ setState (বা setCount) কি Asynchronous?

👉 হ্যাঁ, কিন্তু context অনুযায়ী।

React এ setState synchronously কল করা হয়,

কিন্তু state আপডেট ও re-render হয় asynchronously।

### 🎯 উদাহরণ ১: (React-এ ব্যবহৃত)

```bash
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // কি দেখাবে?
};
```

👉 আপনি যদি ভাবেন console.log(count) → 1 দেখাবে, তাহলে ভুল।
এটা দেখাবে: 0 (পুরানো মান)

### 🧠 কেন?

- setCount() কল হবার পরেও, React এখনই state আপডেট করে না
- React ব্যাকএন্ডে Fiber দিয়ে একটা “pending update” তৈরি করে
- তারপর render queue তে schedule করে
- তাই setCount call-এর পরপরই state অবজেক্ট আপডেট হয় না — এটা delayed বা asynchronous update

### ⏳ তাহলে কি setState async?

| দৃষ্টিকোণ        | ব্যাখ্যা                                                  |
| ---------------- | --------------------------------------------------------- |
| 🔁 Function call | `setState` বা `setCount` **synchronous** (তৎক্ষণাৎ কল হয়) |
| 🧠 State update  | React **asynchronously** state আপডেট করে এবং render করে   |
| 🔍 Console check | তাই `console.log(count)` → পুরোনো মান দেখায়               |

✅ সঠিক মান পেতে হলে কী করব?

🔄 Updated state পেতে হলে, React rerender-এর পরের অবস্থায় দেখতে হবে।

সমাধান:

```bash
useEffect(() => {
  console.log("Updated count:", count);
}, [count]);
```

👉 এখন count আপডেট হলেই log হবে।

### 🧪 উদাহরণ ২: Multiple setState Together

```bash
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

👉 অনেকেই ভাবেন: 3 বার ১ করে বাড়বে → count = 3

❌ কিন্তু হবে: count = 1

কারণ তিনবারই count এর পুরোনো মান (0) কে ভিত্তি করে আপডেট করছে

✅ সমাধান (functional update ব্যবহার করে):

```bash
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

👉 এখন count = 3 হবে ✅

### 🧠 উপসংহার:

| প্রশ্ন                               | উত্তর                                            |
| ------------------------------------ | ------------------------------------------------ |
| `setState` কি async?                 | আপডেট এবং render **async**, কিন্তু কলটা **sync** |
| কেন `console.log` এ পুরানো মান আসে?  | React এখনই render করে না, সে পরে করে             |
| একাধিক `setState` একসাথে করলে কী হয়? | পুরোনো state ধরলে overwrite হয়                   |
| Functional update কেন দরকার?         | আগের state-এর উপর নির্ভর করে update করতে         |

## What Are Signals? The Future of Reactive State

### 🔔 Signals — কী?

🔹 সংজ্ঞা:

Signals হলো reactive primitives — অর্থাৎ, এমন data units যা নিজে থেকেই "change"-কে track করে এবং যেখানে যেখানে প্রয়োজন, সেখানে auto-update trigger করে।

🧠 সহজ ভাষায়:

যখন আপনি signal-এর মান বদলান, সেগুলো automatic dependency tracking করে এবং UI বা logic নিজে থেকেই re-run হয় — আপনাকে আলাদাভাবে useEffect, setState, memo, ইত্যাদি নিয়ে চিন্তা করতে হয় না।

📦 Signals আসে কোথা থেকে?

- SolidJS, Qwik, Vue 3, Angular 16+ → এদের core concept

- React-এ Signals এখনো experimental (React Canary build)

### 🔁 Signals vs useState

| বিষয়        | `useState`                                         | `signal`                                    |
| ----------- | -------------------------------------------------- | ------------------------------------------- |
| API         | `const [count, setCount] = useState(0)`            | `const count = signal(0)`                   |
| Update      | `setCount(count + 1)`                              | `count.value++`                             |
| Tracking    | আপনাকে `useEffect`, `memo` দিয়ে dependency দিতে হয় | Signals **নিজে থেকে** dependency track করে  |
| Re-render   | পুরো component rerender হয়                         | কেবল যেটুকু data বদলেছে, সেটুকু rerun হয়    |
| Performance | ভালো, কিন্তু rerender-heavy                        | **Ultra-performant** (fine-grained updates) |

⚡ Signals কেন ভবিষ্যৎ?

- ✅ Automatic reactivity — useEffect ছাড়াই

- ✅ Ultra performance — No unnecessary renders

- ✅ Fine-grained updates — Component-level নয়, DOM-level optimize করে

- ✅ Simpler mental model — No dependency arrays, reducers, memoization

- ✅ Used in modern frameworks like Qwik, SolidJS, Angular

## Using Objects as State in React: Gotchas & Best Practices

React-এ Object কে State হিসেবে ব্যবহার করা হয় প্রায়ই — যেমনঃ user, form, settings ইত্যাদি। কিন্তু এখানে কিছু মুখোশের ভিতর ফাঁদ আছে — মানে কিছু Gotchas (বিপদ), আর আছে Best Practices (ভালো অভ্যাস)।

চলো বিস্তারিতভাবে বাংলায় দেখে নিই:

📦 Object as State: একটা সাধারণ উদাহরণ

```bash
const [user, setUser] = useState({
  name: "Repon",
  age: 22
});
```

⚠️ Gotchas (সম্ভাব্য বিপদ)

1️⃣ ❌ Direct object overwrite করে পূর্বের মান হারানো

```bash
setUser({ name: "Hasan" }); // এখন age চলে যাবে!
```

👉 এখানে আমরা শুধু name আপডেট করেছি, কিন্তু পুরনো age হারিয়ে গেছে।

✅ সমাধান:

```bash
setUser(prev => ({ ...prev, name: "Hasan" }));
```

🔁 এখানে আমরা আগের object spread করে রাখছি এবং শুধু name আপডেট করছি।

2️⃣ ❌ Nested object এ shallow copy ভুল

```bash
const [settings, setSettings] = useState({
  theme: {
    color: "dark",
    font: "large"
  }
});

setSettings(prev => ({
  ...prev,
  theme: { color: "light" }  // font হারিয়ে যাবে
}));
```

✅ সমাধান:

```bash
setSettings(prev => ({
  ...prev,
  theme: {
    ...prev.theme,
    color: "light"
  }
}));
```

🔍 Nested update মানে আপনাকে প্রতিটি layer spread করতে হবে।

3️⃣ ❌ Object === Object ভুল ধারণা

```bash
const user = { name: "Repon" };
const updatedUser = { name: "Repon" };

console.log(user === updatedUser); // ❌ false

```

React shallow comparison করে। মানে:
👉 setState({...sameObject}) করলেও যদি কিছু না বদলায়, React re-render করবে না।

✅ Best Practices

| নিয়ম                                          | উদাহরণ                             |
| --------------------------------------------- | ---------------------------------- |
| 🧠 `prev => ({...prev, newData})` ব্যবহার করো | সবসময় safe update                  |
| 🔁 Shallow copy & update                      | Spread (`...`) করে পুরানো মান রাখো |
| 📏 Immutable রাখতে চেষ্টা করো                 | পুরনো object mutate কোরো না        |
| 🪜 Nested structure হলে ধাপে ধাপে spread করো  | `theme: {...prev.theme, ...}`      |
| 🧪 Helper ফাংশন বানিয়ে নাও                    | Object update বারবার লাগলে         |

## useReducer: When useState Isn’t Enough

### 🧠 কেন useReducer দরকার?

useState সিম্পল স্টেটের জন্য ভালো, যেমন:

```bash
const [count, setCount] = useState(0);
```

কিন্তু যখন state:

- অনেক property রাখে
- state update হয় multiple condition/logic অনুযায়ী
- বা একই state এর উপর complex update rules প্রয়োগ হয়

👉 তখন useReducer বেশি উপযুক্ত ও maintainable।

## ✅ useReducer কী?

useReducer React এর একটা hook যেটা state এবং dispatch function রিটার্ন করে।
এটা Redux-এর মতো reducer pattern ফলো করে:

```bash
const [state, dispatch] = useReducer(reducerFunction, initialState);
```

🔁 Example: Counter

✅ Step 1: Reducer Function তৈরি করি

```bash
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}
```

✅ Step 2: Component এ useReducer ব্যবহার

```bash
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>➕</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>➖</button>
      <button onClick={() => dispatch({ type: 'reset' })}>🔁</button>
    </>
  );
}

```

✅ কবে useReducer ব্যবহার করা উচিত?

| কন্ডিশন                  | কারণ                                           |
| ------------------------ | ---------------------------------------------- |
| 🔁 Complex state updates | অনেক condition ও logic আছে                     |
| 🧩 Multiple sub-values   | nested object বা বড় state আছে                 |
| ⚙️ Predictable flow      | action type দিয়ে কে কী করবে তা বোঝা সহজ        |
| 🔄 Reusable logic        | একই reducer component এর বাইরে ব্যবহার করা যায় |
