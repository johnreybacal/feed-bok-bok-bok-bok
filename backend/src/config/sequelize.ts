import { Dialect, Sequelize } from "sequelize";

const isTest = (process.env.NODE_ENV || "development") === "test";
let dialect = (isTest ? process.env.TEST_DB_ENGINE! : process.env.DB_ENGINE!) as Dialect
let sqlitePath = isTest ? process.env.TEST_SQLITE_PATH! : process.env.SQLITE_PATH!

export const sequelize = dialect === "sqlite" ?
    new Sequelize(
        {
            dialect,
            storage: sqlitePath
        }
    )
    : new Sequelize(
        isTest ? process.env.TEST_DB_NAME! : process.env.DB_NAME!,
        isTest ? process.env.TEST_DB_USERNAME! : process.env.DB_USERNAME!,
        isTest ? process.env.TEST_DB_PASSWORD! : process.env.DB_PASSWORD!,
        {
            dialect,
            host: isTest ? process.env.TEST_DB_HOST! : process.env.DB_HOST!,
            port: (isTest ? process.env.TEST_DB_PORT! : process.env.DB_PORT!) as unknown as number
        }
    );