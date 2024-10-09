import { Op } from "sequelize";
import { Feedback } from "../feedback/model";

interface ListParameters {
    from?: string;
    to?: string;
    category?: string;
    page: number;
    pageSize: number;
}

class Service {
    async list(params: ListParameters) {
        const { from, to, category, page, pageSize } = params
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
        return await Feedback.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset: page * pageSize
        })
    }
}

export const adminService = new Service()