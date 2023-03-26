export {}

declare global {
  const isDevelopment

  namespace Express {
    interface User {
      id: string
    }
  }
}
