import { DataTypes, Optional, Model } from 'sequelize';
import sequelizeConnection from "../connection";

interface TaskDependenciesAttributes {
    task_id: number;
    dependency_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface TaskInput extends Optional<TaskDependenciesAttributes, "created_at"> { }

export interface TaskOutput extends Required<TaskDependenciesAttributes> { }

class TaskDependencies extends Model<TaskDependenciesAttributes, TaskInput> implements TaskDependenciesAttributes {
    public task_id!: number;
    public dependency_id!: number;
    public created_at!: Date;
    public updated_at!: Date;

    toJSON() {
        // hide protected fields
        let attributes: any = Object.assign({}, this.get());
        return attributes;
    }
}

TaskDependencies.init(
    {
        task_id: {
            type: DataTypes.INTEGER,
        },
        dependency_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: "task_dependencies",
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default TaskDependencies;
