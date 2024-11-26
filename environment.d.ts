declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production",

            DB_HOST: "localhost" | string,
            DB_USER: string,
            DB_PASS: string,

            PROXY_URL: string | undefined,

            APP_PORT: string,
            APP_SECRET_KEY: string,

            CLOUD_NAME: string,
            CLOUD_API_KEY: string,
            CLOUD_API_SECRET: string,
        }
    }
}

export {};