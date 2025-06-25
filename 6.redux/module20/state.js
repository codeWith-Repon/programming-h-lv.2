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