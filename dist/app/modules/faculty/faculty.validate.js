"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidate = void 0;
const zod_1 = require("zod");
const faculty_constant_1 = require("./faculty.constant");
const updateFacultyZodSchema = zod_1.z.object({
    name: zod_1.z
        .object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    })
        .optional(),
    gender: zod_1.z.enum([...faculty_constant_1.Gender]).optional(),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    contactNo: zod_1.z.string().optional(),
    emergencyContactNo: zod_1.z.string().optional(),
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]).optional(),
    designation: zod_1.z.string().optional(),
    academicDepartment: zod_1.z.string().optional(),
    academicFaculty: zod_1.z.string().optional(),
});
exports.FacultyValidate = {
    updateFacultyZodSchema,
};
