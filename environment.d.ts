declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production",

            DB_HOST: "localhost" | string,
            DB_USER: string,
            DB_PASS: string,

            PROXY_USE: "true" | "false",
            PROXY_HOST: string | undefined,
            PROXY_PORT: number | undefined,
            PROXY_USER: string | undefined,
            PROXY_PASS: string | undefined,

            APP_PORT: string,
            APP_SECRET_KEY: string,

            CLOUD_NAME: string,
            CLOUD_API_KEY: string,
            CLOUD_API_SECRET: string,
        }
    }
}

export {};