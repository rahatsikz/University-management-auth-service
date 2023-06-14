import { z } from 'zod'
import { BloodGroup, Gender } from './faculty.constant'

const updateFacultyZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  gender: z.enum([...Gender] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  designation: z.string().optional(),
  academicDepartment: z.string().optional(),
  academicFaculty: z.string().optional(),
})

export const FacultyValidate = {
  updateFacultyZodSchema,
}
