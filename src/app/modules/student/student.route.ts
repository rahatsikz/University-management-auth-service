import express from 'express'
import { StudentController } from './student.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { StudentValidate } from './student.validate'

const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)
router.patch(
  '/:id',
  validateRequest(StudentValidate.updateStudentZodSchema),
  StudentController.updateStudent
)
router.delete('/:id', StudentController.deleteStudent)

router.get('/', StudentController.getAllStudents)

export const StudentRoutes = router
