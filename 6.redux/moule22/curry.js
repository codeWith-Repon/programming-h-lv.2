function curry(fn) {
  return function curried(...args) {
    console.log('Received args:', args);

    if (args.length >= fn.length) {
      console.log('Calling original function with:', args);

      return fn(...args);
    } else {
      console.log('Not enough args, returning new function');

      return function (...next) {
        return curried(...args, ...next);
      };
    }
  };
}

const curried = curry((a, b, c) => a * b * c);
console.log(curried(2)(3)(4));
