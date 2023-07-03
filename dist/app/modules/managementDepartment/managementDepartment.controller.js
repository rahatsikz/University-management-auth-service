"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const managementDepartment_service_1 = require("./managementDepartment.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const managementDepartment_constant_1 = require("./managementDepartment.constant");
const pagination_1 = require("../../../constant/pagination");
const createManagementDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ManagementDepartmentData = __rest(req.body, []);
    const result = yield managementDepartment_service_1.ManagementDepartmentService.createManagementDepartment(ManagementDepartmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' ManagementDepartment Created successfully',
        data: result,
    });
}));
const getAllManagementDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, managementDepartment_constant_1.managementDepartmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    // console.log(paginationOptions)
    const result = yield managementDepartment_service_1.ManagementDepartmentService.getAllManagementDepartment(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' ManagementDepartment retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleManagementDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield managementDepartment_service_1.ManagementDepartmentService.getSingleManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ManagementDepartment retrieved successfully',
        data: result,
    });
}));
const updateManagementDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = __rest(req.body, []);
    const result = yield managementDepartment_service_1.ManagementDepartmentService.updateManagementDepartment(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' ManagementDepartment updated successfully',
        data: result,
    });
}));
const deleteManagementDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield managementDepartment_service_1.ManagementDepartmentService.deleteManagementDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' ManagementDepartment deleted successfully',
        data: result,
    });
}));
exports.ManagementDepartmentController = {
    createManagementDepartment,
    getAllManagementDepartment,
    getSingleManagementDepartment,
    updateManagementDepartment,
    deleteManagementDepartment,
};
