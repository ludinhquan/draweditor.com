export class Semaphore {
  private count = 0;
  private tasks: Function[] = []

  constructor(count: number) {
    this.count = count;
  }

  public async acquire(): Promise<Function> {
    return new Promise(resolve => {
      const task = () => {
        if (this.count > 0) {
          this.count--;
          resolve(this.release.bind(this));
          return;
        }
        this.tasks.push(task)
      }
      task();
    })
  }

  private release() {
    this.count++;
    if (this.tasks.length > 0) this.tasks.shift()();
  }
}

// const sleep = () => new Promise(res => {
//   setTimeout(res, 2000)
// });
//
// const semaphore = new Semaphore(3);
//
// Array(10).fill(null).map(async (_, i) => {
//   const release = await semaphore.acquire()
//   await sleep()
//   release()
//   console.log(i)
// });
