import sequelize from "../db/connection";

import Task, {TaskInput} from "../db/models/tasks.model";
import TaskDependencies  from "../db/models/task_dependencies.model";
import {TaskDTO } from '../interfaces/task-interface';
import { TaskFilters} from '../interfaces/task-interface';
import { difference } from "lodash"
import { TASK_STATUS} from '../constants/common-constant';

export class TaskService {

    /**
     * pass user data to store
     * @param data 
     */
    public async createTask(data: TaskDTO) {
        try {
            console.log('data: ', data);
            const taskData: TaskInput = {
                title: data.title,
                status: data.status || TASK_STATUS.INCOMPLETE,
                priority: data.priority
            };
            const user = await Task.create(taskData);
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param filters gell all task details by filtered value
     * @returns 
     */
    public async getAllTasks(filters: TaskFilters) {
        try {
            const page = filters.page || 1;
            const limit = filters.per_page || 10;
            const sortOrder = filters.sort_order || 'asc'
            const sortBy = filters.sort_by || 'status';
            const skip = limit * (page - 1);

            let whereQuery: any = {};
            if (filters.status) {
                whereQuery.status = filters.status;
            }

            if (filters.priority) {
                whereQuery.priority = filters.priority;
            }
            console.log('whereQuery: ', whereQuery);
            const {count, rows} =  await Task.findAndCountAll({
                where: whereQuery,
                order: [
                    [sortBy, sortOrder]
                ],
                offset: skip,
                limit: limit
            });

            const meta = {
                current_page: page,
                last_page: Math.ceil(count / limit),
                per_page: limit,
                total: count,
                from: skip + 1,
                to: skip + rows.length
            };
            return [rows, meta];

        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * delete task using hard delete
     * @param _id 
     * @returns 
     */
    public async deleteTask(_id: number) {
        try {
            return await Task.destroy(
                {where:{id:_id}}
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async updateTask(_id: number, data: any) {
        if (data.status && data.status == TASK_STATUS.COMPLETE )  {
            await this.completeTask(_id);
        }
    }

    async completeTask (id: number)  {
        const isAbleToComplete = await this.abilityToCompleteTask(id);
        console.log('isAbleToComplete: ', isAbleToComplete);
        if (!isAbleToComplete) {
            throw new Error('Dependency task should be completed first');
        }

        await Task.update(
            { status: TASK_STATUS.COMPLETE },
            {
                where: {
                    id
                }
            }
        )
    }

    async abilityToCompleteTask(id: number) {
        const [results] = await sequelize.query(`SELECT td.dependency_id, t.status 
             FROM task_dependencies td
             JOIN tasks t ON td.dependency_id = t.id
             WHERE td.task_id = ${id}
             and t.status!='complete'`);
        return results.length == 0;
    }

    async addDependecies(id: number, depedencyIds: Array<number>) {
        const existingDepencyIds = await TaskDependencies.findAll({
            where: {
                task_id: id
            },
            attributes: ['dependency_id'],
            raw: true
        });
        const uniqueIds = difference(depedencyIds, existingDepencyIds.map((item) => item.dependency_id) || []);
        const data = uniqueIds.map( (taskId:number) => {
            return {
                task_id: id,
                dependency_id: taskId
            }
        });

        if (uniqueIds.length) {
            return await TaskDependencies.bulkCreate(data);
        } else {
            throw new Error('Dependency already exists');
        }
        return null;
        
    }
}
