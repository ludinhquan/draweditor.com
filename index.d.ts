interface ClassType<T = {}> extends Function {
  new(...args: any[]): T;
}

interface IUser {
  id: string
  name: string
  email: string
  password: string
}

