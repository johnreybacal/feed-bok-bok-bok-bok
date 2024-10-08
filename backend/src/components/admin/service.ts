import { Op } from "sequelize";
import { Feedback } from "../feedback/model";

interface ListParameters {
    from?: Date;
    to?: Date;
    category?: string;
}

class Service {
    async list(params: ListParameters) {
        const { from, to, category } = params
        const whereCondition = {};

        if (category) {
            Object.assign(whereCondition, {
                category: category
            })
        }
        if (from && to) {
            Object.assign(whereCondition, {
                createdAt: {
                    [Op.between]: [from, to]
                }
            })
        } else if (from) {
            Object.assign(whereCondition, {
                createdAt: {
                    [Op.gte]: from
                }
            })
        } else if (to) {
            Object.assign(whereCondition, {
                createdAt: {
                    [Op.lte]: to
                }
            })
        }
        return await Feedback.findAll({ where: whereCondition });
    }
}

export const adminService = new Service()