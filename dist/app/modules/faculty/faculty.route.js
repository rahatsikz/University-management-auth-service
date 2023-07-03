"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const faculty_validate_1 = require("./faculty.validate");
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.FacultyController.getSingleFaculty);
router.delete('/:id', faculty_controller_1.FacultyController.deleteFaculty);
router.patch('/:id', (0, validateRequest_1.validateRequest)(faculty_validate_1.FacultyValidate.updateFacultyZodSchema), faculty_controller_1.FacultyController.updateFaculty);
router.get('/', faculty_controller_1.FacultyController.getAllFaculties);
exports.FacultyRoutes = router;
