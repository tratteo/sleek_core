export default class Decorators {
  static profiledAsync(func, ...args) {
    const start = performance.now();
    const promise = func(...args);
    promise.then((_) => console.log(`\u26A1 ${func.name} completed [${(performance.now() - start).toFixed(3)} ms]`));
    return promise;
  }
  static profiled(func, ...args) {
    const start = performance.now();
    const res = func(...args);
    console.log(`\u26A1 ${func.name} completed [${(performance.now() - start).toFixed(3)} ms]`);
    return res;
  }
  static profiledNamed(name, func, ...args) {
    const start = performance.now();
    const res = func(...args);
    console.log(`\u26A1 ${name} completed [${(performance.now() - start).toFixed(3)} ms]`);
    return res;
  }
}
