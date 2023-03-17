import {Semaphore} from "../common";

export function mutex(){
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const locks: Map<string, Semaphore> = new Map();

    descriptor.value = async function (...args: any[]) {
      const key = JSON.stringify(args);

      let lock = locks.get(key);
      if (!lock) {
        lock = new Semaphore(1);
        locks.set(key, lock);
      }

      const release = await lock.acquire();
      const result = await originalMethod.apply(this, args);
      release();
      return result;
    }

    return descriptor
  }
}
