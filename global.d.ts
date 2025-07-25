declare global {
  var mongoose: {
    conn: any
    promise: any
  }

  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      JWT_SECRET: string
      EMAIL_USER: string
      EMAIL_PASS: string
      NODE_ENV: "development" | "production"
    }
  }
}

export {}
