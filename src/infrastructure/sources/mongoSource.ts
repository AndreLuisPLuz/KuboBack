import "dotenv/config";
import { HttpProxyAgent } from "http-proxy-agent";
import mongoose, { ConnectOptions, mongo } from "mongoose";

const getMongoSource = () => {
    const mongoOptions: ConnectOptions = { };

    const useProxy = (process.env.PROXY_USE == "true");

    if (useProxy) {
        mongoOptions.proxyHost = process.env.PROXY_HOST;
        mongoOptions.proxyPort = Number(process.env.PROXY_PORT || 6969);
        mongoOptions.proxyUsername = process.env.PROXY_USER;
        mongoOptions.proxyPassword = process.env.PROXY_PASS;
    }

    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const dbString = `mongodb+srv://${user}:${pass}@${host}/?retryWrites=true&w=majority&appName=KuboWeb`;
    mongoose.connect(dbString, mongoOptions)
        .then(() => console.log(`[server]: connected to ${dbString}`));
}

export default getMongoSource;