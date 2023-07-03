"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentValidate = void 0;
const zod_1 = require("zod");
const createManagementDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
const updateManagementDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
    }),
});
exports.ManagementDepartmentValidate = {
    createManagementDepartmentZodSchema,
    updateManagementDepartmentZodSchema,
};
