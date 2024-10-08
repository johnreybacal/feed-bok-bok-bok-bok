import { Feedback } from "../components/feedback/model";
import { sequelize } from "../config/sequelize";

async function sync() {
    await sequelize.authenticate();
    await Feedback.sync()

    process.exit(0)
}

sync();