"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const managementDepartment_validate_1 = require("./managementDepartment.validate");
const managementDepartment_controller_1 = require("./managementDepartment.controller");
const router = express_1.default.Router();
router.get('/:id', managementDepartment_controller_1.ManagementDepartmentController.getSingleManagementDepartment);
router.patch('/:id', (0, validateRequest_1.validateRequest)(managementDepartment_validate_1.ManagementDepartmentValidate.updateManagementDepartmentZodSchema), managementDepartment_controller_1.ManagementDepartmentController.updateManagementDepartment);
router.delete('/:id', managementDepartment_controller_1.ManagementDepartmentController.deleteManagementDepartment);
router.post('/create-management', (0, validateRequest_1.validateRequest)(managementDepartment_validate_1.ManagementDepartmentValidate.createManagementDepartmentZodSchema), managementDepartment_controller_1.ManagementDepartmentController.createManagementDepartment);
router.get('/', managementDepartment_controller_1.ManagementDepartmentController.getAllManagementDepartment);
exports.ManagementDepartmentRoutes = router;
