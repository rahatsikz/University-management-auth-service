"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validate_1 = require("./user.validate");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.validateRequest)(user_validate_1.UserValidate.createUserZodSchema), user_controller_1.UserController.createStudent);
// create faculty
router.post('/create-faculty', (0, validateRequest_1.validateRequest)(user_validate_1.UserValidate.createFacultyZodSchema), user_controller_1.UserController.createFaculty);
// create admin
exports.UserRoutes = router;
