"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidate = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: 'First name is required' }),
                lastName: zod_1.z.string({ required_error: 'Last name is required' }),
                middleName: zod_1.z.string().optional(),
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({ required_error: "Father's name is required" }),
                fatherOccupation: zod_1.z.string({
                    required_error: "Father's occupation is required",
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: "Father's contact number is required",
                }),
                motherName: zod_1.z.string({ required_error: "Mother's name is required" }),
                motherOccupation: zod_1.z.string({
                    required_error: "Mother's occupation is required",
                }),
                motherContactNo: zod_1.z.string({
                    required_error: "Mother's contact number is required",
                }),
                address: zod_1.z.string({ required_error: 'Address is required' }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({ required_error: "Local guardian's name is required" }),
                occupation: zod_1.z.string({
                    required_error: "Local guardian's occupation is required",
                }),
                contactNo: zod_1.z.string({
                    required_error: "Local guardian's contact number is required",
                }),
                address: zod_1.z.string({
                    required_error: "Local guardian's address is required",
                }),
            }),
            dateOfBirth: zod_1.z.string({ required_error: 'Date of birth is required' }),
            gender: zod_1.z.enum([...student_constant_1.Gender], {
                required_error: 'Gender is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.BloodGroup]).optional(),
            profileImage: zod_1.z.string().optional(),
            email: zod_1.z.string({ required_error: 'Invalid email address' }).email(),
            contactNo: zod_1.z.string({ required_error: 'Contact number is required' }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: 'first name is required' }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({ required_error: 'last name is required' }),
            }),
            gender: zod_1.z.enum([...student_constant_1.Gender], {
                required_error: 'gender is required',
            }),
            dateOfBirth: zod_1.z.string({ required_error: 'birth date is required' }),
            email: zod_1.z.string({ required_error: 'email is required' }).email(),
            contactNo: zod_1.z.string({ required_error: 'contact no is required' }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'emergency contact no is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'presentAddress is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'permanentAddress is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.BloodGroup], {
                required_error: 'blood group is required',
            }),
            designation: zod_1.z.string({ required_error: 'designation is required' }),
            academicDepartment: zod_1.z.string({
                required_error: 'academicDepartment is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'academicFaculty is required',
            }),
        }),
    }),
});
exports.UserValidate = {
    createUserZodSchema,
    createFacultyZodSchema,
};
//   await createUserZodSchema.parseAsync(req)
