import { checkSchema } from 'express-validator';
import { TASK_PRIORITY, TASK_STATUS, TASK_SORT_ATTRIBUTES, SORT_ORDER_VALUES } from '../constants/common-constant';

const statusOption = Object.values(TASK_STATUS);
const proprityOption = Object.values(TASK_PRIORITY);
export const createTaskValidation = checkSchema({
    title: {
        in: ['body'],
        isString: { errorMessage: 'Title must be a string' },
        notEmpty: { errorMessage: 'Title is required' },
    },
    status: {
        in: ['body'],
        optional : {options : { nullable : false}},
        isString: { errorMessage: 'status must be a string' },
        isIn: {
            options: [statusOption.join()],
            errorMessage: `status must be a ${statusOption.join()}`
        }
    },
    priority: {
        in: ['body'],
        isString: { errorMessage: 'priority must be a string' },
        isIn: {
            options: [proprityOption.join()],
            errorMessage: `priority must be a ${proprityOption.join()}`
        }
    }
});

export const fetchTaskValidation = checkSchema({
    status: {
        in: ['query'],
        optional : {options : { nullable : false}},
        isString: { errorMessage: 'status must be a string' },
        isIn: {
            options: [statusOption.join()],
            errorMessage: `status must be a ${statusOption.join()}`
        }
    },
    priority: {
        in: ['query'],
        optional : {options : { nullable : false}},
        isString: { errorMessage: 'priority must be a string' },
        isIn: {
            options: [proprityOption.join()],
            errorMessage: `priority must be a ${proprityOption.join()}`
        }
    },
    page: {
        in: ['query'],
        optional : {options : { nullable : false}},
        isInt: { errorMessage: 'page must be a number' },
    },
    per_page :{
        in: ['query'],
        optional : {options : { nullable : false}},
        isInt: { errorMessage: 'per_page must be a number' },

    },
    sort_by : {
        in: ['query'],
        optional : {options : { nullable : false}},
        isString: { errorMessage: 'sort_by must be a string' },
        isIn: {
            options: [TASK_SORT_ATTRIBUTES.join()],
            errorMessage: `priority must be a ${TASK_SORT_ATTRIBUTES.join()}`
        }
    },
    sort_order : {
        in: ['query'],
        optional : {options : { nullable : false}},
        isString: { errorMessage: 'sort_order must be a string' },
        isIn: {
            options: [SORT_ORDER_VALUES.join()],
            errorMessage: `priority must be a ${SORT_ORDER_VALUES.join()}`
        }
    }
});

export const createTaskDependecnyValidation = checkSchema({
    id: {
        in: ['params'],
        isInt: { errorMessage: 'id must be a number' },
        notEmpty: { errorMessage: 'id is required' },
    },
    dependencies: {
        in: ['body'],
        isArray: { options: { min: 1 }, errorMessage: 'dependencies must be an array' }
    },
    'dependencies.*': {
        in: ['body'],
        isInt: { errorMessage: 'dependencies  should be array of int' },
    }
});
