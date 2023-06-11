import { z } from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty required',
    }),
  }),
})

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    academicFaculty: z
      .string({ required_error: 'Academic faculty required' })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
}
