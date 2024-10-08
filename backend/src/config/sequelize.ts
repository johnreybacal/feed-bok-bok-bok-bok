import { Dialect, Sequelize } from "sequelize";

const dialect = process.env.DB_ENGINE! as Dialect

export const sequelize = dialect === "sqlite" ?
    new Sequelize(
        {
            dialect,
            storage: process.env.SQLITE_PATH
        }
    )
    : new Sequelize(
        process.env.DB_NAME!,
        process.env.DB_USERNAME!,
        process.env.DB_PASSWORD,
        {
            dialect: process.env.DB_ENGINE! as Dialect,
            host: process.env.DB_HOST!,
            port: process.env.DB_PORT! as unknown as number
        }
    );