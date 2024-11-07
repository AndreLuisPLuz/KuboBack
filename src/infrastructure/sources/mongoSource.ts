import "dotenv/config";
import mongoose from "mongoose";

const getMongoSource = () => {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const dbString = `mongodb+srv://${user}:${pass}@${host}`;
    mongoose.connect(dbString, {})
        .then(() => console.log(`[server]: connected to ${dbString}`));
}

export default getMongoSource;