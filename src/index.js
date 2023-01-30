function sum() {
  let args = Array.from(arguments);
  return args.reduce((start, result) => {
    return start + result;
  }, 0);
}

function test(arr1, arr2) {
  return [...arr1, ...arr2];
}

function test2(obj = {}) {
  return obj?.name ?? -1;
}

export { sum, test, test2 };
