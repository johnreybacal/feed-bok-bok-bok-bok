import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class Feedback extends Model {
    declare id: string;
    declare name: string;
    declare email: string;
    declare feedback: string;
    declare category: string;
    declare createdAt: Date;
}

Feedback.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks'
});