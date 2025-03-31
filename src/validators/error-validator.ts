import { ValidationError } from 'express-validator';

export const errorFormatter = ({msg}: ValidationError) => {
    return msg;
};