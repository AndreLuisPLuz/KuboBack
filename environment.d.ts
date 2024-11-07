declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production",

            DB_HOST: "localhost" | string,
            DB_USER: string,
            DB_PASS: string,

            APP_PORT: string,
            APP_SECRET_KEY: string
        }
    }
}

export {};