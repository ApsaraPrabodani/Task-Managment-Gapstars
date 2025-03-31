// import { TaskService } from '../services/task.service';
// import Task from '../db/models/tasks.model';

// jest.mock('../db/models/tasks.model');

// describe('TaskService - deleteTask', () => {
//     let taskService: TaskService;

//     beforeEach(() => {
//         taskService = new TaskService();
//     });

//     it('should delete a task by ID and return the number of deleted rows', async () => {
//         const mockTaskId = 1;
//         const mockDeletedCount = 1;

//         (Task.destroy as jest.Mock).mockResolvedValue(mockDeletedCount);

//         const result = await taskService.deleteTask(mockTaskId);

//         expect(Task.destroy).toHaveBeenCalledWith({ where: { id: mockTaskId } });
//         expect(result).toBe(mockDeletedCount);
//     });

//     it('should throw an error if Task.destroy fails', async () => {
//         const mockTaskId = 1;
//         const mockError = new Error('Database error');

//         (Task.destroy as jest.Mock).mockRejectedValue(mockError);

//         await expect(taskService.deleteTask(mockTaskId)).rejects.toThrow('Database error');
//         expect(Task.destroy).toHaveBeenCalledWith({ where: { id: mockTaskId } });
//     });
// });

import request from 'supertest';
// import * as taskService from '../services/task.service';
import {TaskService}  from '../services/task.service';
import app from '../app'; //

jest.mock('../services/task.service');

describe('Task Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
       
  });

  it('GET /tasks should return a list of users', async () => {
    // const mockUsers = [{ id: 1, name: 'Alice' }];
    // (TaskService.findAllTask as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get('/task-service/v1/tasks');
    expect(response.status).toBe(200);
    // expect(response.body).toEqual(mockUsers);
  });
});