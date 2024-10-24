export function pipe<T>(...fns: Array<(arg: T) => T>): (x: T) => T {
  return (x: T) => fns.reduce((v, f) => f(v), x);
}
