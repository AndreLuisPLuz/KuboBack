import "dotenv/config";
import { HttpProxyAgent } from "http-proxy-agent";
import mongoose, { ConnectOptions } from "mongoose";

const getMongoSource = () => {
    const mongoOptions: ConnectOptions = { };

    const proxyUrl = process.env.PROXY_URL;

    if (proxyUrl !== undefined) {
        const proxyAgent = new HttpProxyAgent(proxyUrl);
        mongoOptions[""]
    }

    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const dbString = `mongodb+srv://${user}:${pass}@${host}/?retryWrites=true&w=majority&appName=KuboWeb`;
    mongoose.connect(dbString, )
        .then(() => console.log(`[server]: connected to ${dbString}`));
}

export default getMongoSource;