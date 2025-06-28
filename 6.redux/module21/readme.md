## Redux কেন ব্যবহার করা হয়? (Why Redux in Bangla)

Redux হল একটি state management library, যা মূলত React অ্যাপ্লিকেশনের global state ম্যানেজ করতে ব্যবহৃত হয়।

## 🧠 ১. State ম্যানেজমেন্টের সমস্যা

React এ আমরা সাধারণত useState বা useContext দিয়ে local state ম্যানেজ করি। কিন্তু যখন অ্যাপ বড় হয়ে যায় (যেমন: অনেক পেজ, কম্পোনেন্ট, ইউজার ইনপুট, অর্ডার, কার্ট, অথেনটিকেশন), তখন state অনেক জায়গায় ছড়িয়ে পড়ে এবং data flow ট্র্যাক করা কঠিন হয়ে যায়।

## 🧩 ২. Redux কীভাবে সাহায্য করে?

Redux:

✅ একটি centralized state container তৈরি করে — অর্থাৎ সব কম্পোনেন্টের দরকারি ডেটা এক জায়গায় থাকে
✅ predictable — কারণ state update করার নিয়ম নির্দিষ্ট: action ➝ reducer ➝ new state
✅ debugging সহজ — Redux DevTools দিয়ে দেখা যায় কোন action কখন চলেছে এবং state কীভাবে বদলেছে
✅ scalable — বড় অ্যাপে structure maintain করা সহজ হয়

## 🧰 ৩. Redux কখন ব্যবহার করবো?

Redux দরকার যখন:

- অ্যাপের multiple components একই ডেটা ব্যবহার করে (যেমন: ইউজার ইনফো, language - settings, dark mode)
- অনেক nested component থাকে এবং props drilling এ সমস্যা হয়
- complex UI logic থাকে (যেমন cart system, filters, authentication, etc.)
- অ্যাপের state অনেক বড় এবং অনেক জায়গা থেকে control করতে হয়

## State, Bi-directional, and uni-directional data flow.

### 🧠 ১. State কী?

State মানে হলো কোনো একটি কম্পোনেন্টের অবস্থা বা তথ্য, যেটা সময়ের সাথে পরিবর্তন হতে পারে।
React বা অন্যান্য ফ্রেমওয়ার্কে state ব্যবহার করে UI আপডেট করা হয়।

উদাহরণ:
একটি counter app-এ count মান হচ্ছে state:

```bash
const [count, setCount] = useState(0);
```

### 🔄 ২. Uni-directional Data Flow (একমুখী ডেটা প্রবাহ)

📌 সংজ্ঞা:
ডেটা শুধু একদিকে প্রবাহিত হয় — parent ➝ child।

React এ uni-directional flow ফলো করা হয়।

🧱 উদাহরণ:

```bash
function Parent() {
  const [name, setName] = useState("Repon");

  return <Child name={name} />;
}

function Child({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

এখানে Parent কম্পোনেন্ট থেকে name নামে data Child এ গেছে — এটি একমুখী (uni-directional) flow।

✅ সুবিধা:

- Predictable (সহজে বুঝা যায় কে কোথা থেকে ডেটা পাচ্ছে)
- Debugging সহজ
- Maintainability ভালো

## 🔁 ৩. Bi-directional Data Flow (দ্বিমুখী ডেটা প্রবাহ)

📌 সংজ্ঞা:

ডেটা parent থেকে child এবং আবার child থেকে parent-এ ফিরে আসে।
অর্থাৎ ডেটা দুই দিকে যাতায়াত করে।

এটা React এ সরাসরি হয় না, তবে event/callback দিয়ে simulate করা যায়।

🧱 উদাহরণ:

```bash
function Parent() {
  const [name, setName] = useState("");

  return <Child name={name} onChange={setName} />;
}

function Child({ name, onChange }) {
  return <input value={name} onChange={(e) => onChange(e.target.value)} />;
}
```

এখানে:

- Parent → Child: name
- Child → Parent: onChange callback

এভাবে Bi-directional data flow implement হয়।

⚠️ সমস্যা:

- জটিল হতে পারে
- Component গুলোর মধ্যে tight coupling হয়
- বড় অ্যাপে বাগ খুঁজে বের করা কঠিন

| বিষয়            | Uni-directional     | Bi-directional                    |
| --------------- | ------------------- | --------------------------------- |
| ডেটা কোথায় যায়  | Parent ➝ Child      | Parent ⬄ Child                    |
| Control         | Parent control করে  | দুপক্ষই পরিবর্তন করতে পারে        |
| React-এ ব্যবহৃত | ✅ হ্যাঁ            | ⚠️ Callback দিয়ে simulate করা যায় |
| সুবিধা          | Clean & Predictable | Flexibility                       |

## Flux architecture in simple terms.

Flux হলো একটি আর্কিটেকচারাল প্যাটার্ন, যেটা Facebook তৈরি করেছিল React অ্যাপ্লিকেশনগুলোর ডেটা ম্যানেজমেন্ট সহজ ও পরিষ্কার করার জন্য।

## 🔁 Flux কীভাবে কাজ করে? (মূল ৪টি অংশ)

Flux এর পুরো সিস্টেমে ডেটা সবসময় একদিকেই (uni-directional) প্রবাহিত হয়।
এই ৪টি মূল অংশ থাকে:

### 1️⃣ Action

➡️ এটা হচ্ছে এমন একটা জিনিস, যা বলে দেয় কি ঘটছে।
একটা object যা type এবং optionally payload ধারণ করে।

```bash
{ type: "ADD_ITEM", payload: { id: 1, name: "Pen" } }
```

### 2️⃣ Dispatcher

➡️ এটা হচ্ছে central hub, যেটা সব action গ্রহণ করে এবং store-কে জানায়।
Flux-এ dispatcher অনেকটা postmaster এর মতো — action কে যাকে দরকার তার কাছে পাঠায়।

### 3️⃣ Store

➡️ Store হচ্ছে state এবং logic রাখার জায়গা।
Action এলে Store নিজের স্টেট আপডেট করে।

একটা অ্যাপে একাধিক Store থাকতে পারে।

### 4️⃣ View (React Component)

➡️ View হচ্ছে React component যেটা Store থেকে ডেটা নিয়ে UI দেখায়।

### 🔄 ডেটা ফ্লো — একদিকে (Uni-directional)

👇 সহজভাবে পুরো প্রক্রিয়াটা দেখো:

```bash
User Clicks Button
        ↓
   ➤ Action তৈরি হয়
        ↓
   ➤ Dispatcher Action পাঠায়
        ↓
   ➤ Store সেই Action দেখে State আপডেট করে
        ↓
   ➤ View (React) নতুন State দিয়ে রেন্ডার হয়
```

এটা হলো একমুখী ডেটা ফ্লো, যা Flux এর মূল ধারণা।
🎯 Flux কেন দরকার হয়?

- ডেটা কিভাবে কোথায় যাচ্ছে — এটা পরিষ্কার করে
- Complex app এ state flow সহজ করে
- Debugging সহজ হয়
- Predictable UI behavior পাওয়া যায়

#### 🆚 Flux vs Redux?

Redux মূলত Flux এর উপর ভিত্তি করেই তৈরি, কিন্তু Flux এর চেয়ে সরল:
| বিষয় | Flux | Redux |
| ---------- | ----------------- | ------------------------------ |
| Dispatcher | থাকে | নেই (Redux নিজেই dispatch করে) |
| Store | অনেকগুলো | একটা বড় store |
| Structure | একটু বেশি verbose | তুলনামূলক সরল |

Flux বুঝতে মনে রাখো:

Action ➝ Dispatcher ➝ Store ➝ View (React)

সবসময় একদিকেই ডেটা যায়, আর এটাই Flux এর মূল শক্তি।

## Inner workings of redux.

Redux বাইরে থেকে দেখতে সহজ লাগে — কিন্তু ভিতরে কীভাবে কাজ করে, সেটা বুঝলে তুমি advanced Redux concepts যেমন middleware, thunk, Redux Toolkit ইত্যাদিও সহজে শিখতে পারবে।

🔁 Redux এ কী ঘটে? এক নজরে:

```bash
UI ➝ dispatch(action)
           ↓
     reducer(state, action)
           ↓
        new state
           ↓
       store updates
           ↓
   subscribed components re-render

```

এখন আমরা প্রত্যেক অংশের ভিতরের কাজ দেখি:

## 1️⃣ Store: Redux-এর হৃদয়

Redux Store হচ্ছে একটি central object যেটা:

- পুরো অ্যাপের state ধরে রাখে
- Reducer দিয়ে সেই state আপডেট করে
- Component গুলোকে জানায় state পরিবর্তন হয়েছে

👉 createStore() দিয়ে Store তৈরি করা হয় (বা configureStore() – Redux Toolkit এ)

Store-এর তিনটি গুরুত্বপূর্ণ method:

- getState() → বর্তমান state ফেরত দেয়
- dispatch(action) → reducer-এ action পাঠায়
- subscribe(listener) → state পরিবর্তন হলে callback চালায়

## 2️⃣ Action: কী ঘটছে তা বর্ণনা করে

Action একটি JavaScript object যা বলে দেয় “কী ঘটবে”।

```bash
const action = { type: "INCREMENT" };
```

👉 Action এর মধ্যে type field থাকা বাধ্যতামূলক।

## 3️⃣ Reducer: pure function যেটা নতুন state তৈরি করে

Reducer হলো একটি pure function যা দুইটা ইনপুট নেয়:

- আগের state

- নতুন action

এবং নতুন state ফেরত দেয়।

```bash
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

👉 Reducer আগের state কে mutate করে না, বরং নতুন object তৈরি করে return করে।

Mutation মানে হচ্ছে কোনো object বা array কে সরাসরি পরিবর্তন করা।

🔴 Mutation (খারাপ):

```bash
state.count = state.count + 1;  // ❌ এটা সরাসরি আগের state কে modify করছে
```

🟢 Immutability (ভাল):

```bash
return { ...state, count: state.count + 1 }; // ✅ এটা আগের state এর কপি তৈরি করে, শুধু count আপডেট করে
```

```bash
increment: (state, action) => {
  state.count += action.payload;
}
```

এবং এটা কাজও করছে — যদিও আমরা আগেই বলেছি state mutate করা ঠিক না।

তাহলে প্রশ্ন হলো:

`🔍 state.count += action.payload — এটা তো mutation!`

**➡️ তাহলে Redux Toolkit এ এটা কীভাবে কাজ করছে?**

#### 🧪 উত্তর: Redux Toolkit এর ভিতরে Immer.js ব্যবহার হয়

Redux Toolkit 👉 immer লাইব্রেরি ব্যবহার করে mutation-এর মতো লিখতে দিয়ে, কিন্তু আসলে immutable update করে।

✅ কী হচ্ছে ভিতরে?

```bash
// তুমি যা লিখছো
state.count += 1;
```

Immer ভিতরে এটা করে:

```bash
const newState = {
  ...state,
  count: state.count + 1
};
```

তুমি সরাসরি state কে পরিবর্তন করছো বলে মনে হলেও, Immer এটা track করে, এবং শেষে একটি নতুন copy তৈরি করে return করে।

### 🔎 Immer.js কী?

Immer হলো একটা লাইব্রেরি যা:

- তোমাকে mutable-style syntax (যেমন: state.count++) লেখার সুযোগ দেয়

- কিন্তু ভিতরে draft state তৈরি করে, এবং শেষে নতুন immutable state রিটার্ন করে

Redux Toolkit এটি built-in ভাবে ব্যবহার করে।

✅ কেন নতুন object তৈরি করি?

Redux এ state immutable হতে হবে, কারণ:

- Debugging সহজ হয় (পুরানো state সংরক্ষিত থাকে)
- Redux DevTools বা time-travel debugging সম্ভব হয়
- React-এ shallow compare করে re-render করে — তাই নতুন object দরকার

## 🔁 তাহলে Reducer কীভাবে কাজ করে?

ধরি state এর মান ছিল:

```bash
state = { count: 0, name: "Repon" }
```

🔴 ভুল (Mutation):

```bash
function reducer(state, action) {
  if (action.type === "INCREMENT") {
    state.count += 1;  // ❌ পুরানো state পরিবর্তন
    return state;
  }
}
```

এটা করলে Redux detect করতে পারবে না যে state পরিবর্তন হয়েছে, কারণ object reference একই থাকে।

🟢 সঠিক (Immutable):

```bash
function reducer(state, action) {
  if (action.type === "INCREMENT") {
    return { ...state, count: state.count + 1 }; // ✅ নতুন object
  }
  return state;
}
```

এখানে ...state দিয়ে পুরানো state এর কপি নিচ্ছে, তারপর count overwrite করছে — তাই নতুন object তৈরি হচ্ছে।

```bash
store.dispatch({ type: "INCREMENT" });
```

## 5️⃣ Subscribe: state পরিবর্তন মনিটর করা

Redux এর store.subscribe() method ব্যবহার করে তুমি জানাতে পারো, state পরিবর্তন হলে তুমি কী করতে চাও।

React এ এটা স্বয়ংক্রিয়ভাবে useSelector() দিয়ে হয়।

## `reducer -> How to do`, `Action -> What to do`, `Store -> What to store`

## 🔄 Redux Flow (আরো পরিষ্কারভাবে):

1. ইউজার UI তে কিছু করে →
2. dispatch() কল হয় →
3. Action store-এ যায় →
4. Reducer নতুন state রিটার্ন করে →
5. Store আপডেট হয় →
6. যেসব component subscribe করা আছে, তারা re-render হয়
