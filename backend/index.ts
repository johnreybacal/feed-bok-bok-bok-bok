import { app } from "./src/app";
import { kafkaProducer } from "./src/config/kafka";
import { sequelize } from "./src/config/sequelize";

const port = 8080

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.error("Connected to database.");
        await kafkaProducer.connect();
        console.error("Connected to message bus.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
    console.log(`Listening on port ${port}.`);
});