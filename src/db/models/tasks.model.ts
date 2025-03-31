import { DataTypes, Optional, Model } from 'sequelize';
import sequelizeConnection from "../connection";
import { TASK_PRIORITY, TASK_STATUS } from '../../constants/common-constant'

interface TaskAttributes {
    id: number;
    title: string;
    status?: string;
    priority?: string;
    dependencies?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface TaskInput extends Optional<TaskAttributes, "id"> { }

export interface TaskOutput extends Required<TaskAttributes> { }

class Task extends Model<TaskAttributes, TaskInput> implements TaskAttributes {
    public id!: number;
    public title!: string;
    public status!: string;
    public priority!: string;
    public dependencies?: string;
    public created_at!: Date;
    public updated_at!: Date;

    toJSON() {
        // hide protected fields
        let attributes: any = Object.assign({}, this.get());
        return attributes;
    }
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM({
                values: Object.values(TASK_STATUS)
            }),
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM({
                values: Object.values(TASK_PRIORITY)
            }),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
        tableName: "tasks",
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default Task;
