import { app } from "./src/app";
import { sequelize } from "./src/config/sequelize";

const port = 8080

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.error("Connected to database.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
    console.log(`Listening on port ${port}.`);
});