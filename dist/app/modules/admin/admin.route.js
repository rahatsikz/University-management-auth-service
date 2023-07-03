"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const admin_validate_1 = require("./admin.validate");
const router = express_1.default.Router();
router.get('/:id', admin_controller_1.AdminController.getSingleAdmin);
router.patch('/:id', (0, validateRequest_1.validateRequest)(admin_validate_1.AdminValidate.updateAdminZodSchema), admin_controller_1.AdminController.updateAdmin);
router.get('/', admin_controller_1.AdminController.getAllAdmins);
exports.AdminRoutes = router;
