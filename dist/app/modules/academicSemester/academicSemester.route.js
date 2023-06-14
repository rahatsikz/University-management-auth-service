'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicSemesterRoutes = void 0
const express_1 = __importDefault(require('express'))
const validateRequest_1 = require('../../middleware/validateRequest')
const academicSemester_validation_1 = require('./academicSemester.validation')
const academicSemester_controller_1 = require('./academicSemester.controller')
const router = express_1.default.Router()
router.get(
  '/:id',
  academicSemester_controller_1.AcademicSemesterController.getSingleSemester
)
router.patch(
  '/:id',
  (0, validateRequest_1.validateRequest)(
    academicSemester_validation_1.AcademicSemesterValidate
      .updateAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.updateSemester
)
router.delete(
  '/:id',
  academicSemester_controller_1.AcademicSemesterController.deleteSemester
)
router.post(
  '/create-semester',
  (0, validateRequest_1.validateRequest)(
    academicSemester_validation_1.AcademicSemesterValidate
      .createAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.createSemester
)
router.get(
  '/',
  academicSemester_controller_1.AcademicSemesterController.getAllSemesters
)
exports.AcademicSemesterRoutes = router
