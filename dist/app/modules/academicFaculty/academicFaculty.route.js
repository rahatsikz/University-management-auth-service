'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AcademicFacultyRoutes = void 0
const express_1 = __importDefault(require('express'))
const academicFaculty_controller_1 = require('./academicFaculty.controller')
const validateRequest_1 = require('../../middleware/validateRequest')
const academicFaculty_validate_1 = require('./academicFaculty.validate')
const router = express_1.default.Router()
router.get(
  '/:id',
  academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty
)
router.patch(
  '/:id',
  (0, validateRequest_1.validateRequest)(
    academicFaculty_validate_1.AcademicFacultyValidate
      .updateAcademicFacultyZodSchema
  ),
  academicFaculty_controller_1.AcademicFacultyController.updateFaculty
)
router.delete(
  '/:id',
  academicFaculty_controller_1.AcademicFacultyController.deleteFaculty
)
router.post(
  '/create-faculty',
  (0, validateRequest_1.validateRequest)(
    academicFaculty_validate_1.AcademicFacultyValidate
      .createAcademicFacultyZodSchema
  ),
  academicFaculty_controller_1.AcademicFacultyController.createFaculty
)
router.get(
  '/',
  academicFaculty_controller_1.AcademicFacultyController.getAllFaculties
)
exports.AcademicFacultyRoutes = router
