import { z } from 'zod'
import { BloodGroup, Gender } from '../student/student.constant'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        lastName: z.string({ required_error: 'Last name is required' }),
        middleName: z.string().optional(),
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: "Father's name is required" }),
        fatherOccupation: z.string({
          required_error: "Father's occupation is required",
        }),
        fatherContactNo: z.string({
          required_error: "Father's contact number is required",
        }),
        motherName: z.string({ required_error: "Mother's name is required" }),
        motherOccupation: z.string({
          required_error: "Mother's occupation is required",
        }),
        motherContactNo: z.string({
          required_error: "Mother's contact number is required",
        }),
        address: z.string({ required_error: 'Address is required' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: "Local guardian's name is required" }),
        occupation: z.string({
          required_error: "Local guardian's occupation is required",
        }),
        contactNo: z.string({
          required_error: "Local guardian's contact number is required",
        }),
        address: z.string({
          required_error: "Local guardian's address is required",
        }),
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      profileImage: z.string().optional(),
      email: z.string({ required_error: 'Invalid email address' }).email(),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
})

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'first name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'last name is required' }),
      }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'birth date is required' }),
      email: z.string({ required_error: 'email is required' }).email(),
      contactNo: z.string({ required_error: 'contact no is required' }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact no is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]], {
        required_error: 'blood group is required',
      }),
      designation: z.string({ required_error: 'designation is required' }),
      academicDepartment: z.string({
        required_error: 'academicDepartment is required',
      }),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
    }),
  }),
})

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'first name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'last name is required' }),
      }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'birth date is required' }),
      email: z.string({ required_error: 'email is required' }).email(),
      contactNo: z.string({ required_error: 'contact no is required' }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact no is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]], {
        required_error: 'blood group is required',
      }),
      designation: z.string({ required_error: 'designation is required' }),
      managementDepartment: z.string({
        required_error: 'managementDepartment is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
})

export const UserValidate = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
}

//   await createUserZodSchema.parseAsync(req)
