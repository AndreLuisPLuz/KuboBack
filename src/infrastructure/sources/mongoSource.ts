import "dotenv/config";
import mongoose from "mongoose";

const getMongoSource = () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;

    const dbString = `mongodb://${host}:${port}/${name}`;
    mongoose.connect(dbString, {})
        .then(() => console.log(`[server]: connected to ${dbString}`));
}

export default getMongoSource;