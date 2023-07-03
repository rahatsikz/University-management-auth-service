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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminID = exports.findLastAdminID = exports.generateFacultyID = exports.findLastFacultyID = exports.generateStudentID = exports.findLastStudnetID = void 0;
const user_model_1 = require("./user.model");
const findLastStudnetID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    // console.log(lastStudent?.id, 'p')
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) && lastStudent.id.substring(4);
});
exports.findLastStudnetID = findLastStudnetID;
const generateStudentID = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentID = (yield (0, exports.findLastStudnetID)()) || (0).toString().padStart(5, '0');
    // console.log({ currentID })
    let incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0');
    incrementalID = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementalID}`;
    // console.log({ incrementalID })
    return incrementalID;
});
exports.generateStudentID = generateStudentID;
const findLastFacultyID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) && lastFaculty.id.substring(2);
});
exports.findLastFacultyID = findLastFacultyID;
const generateFacultyID = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentID = (yield (0, exports.findLastFacultyID)()) || (0).toString().padStart(5, '0');
    let incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0');
    incrementalID = `F-${incrementalID}`;
    // console.log(incrementalID)
    return incrementalID;
});
exports.generateFacultyID = generateFacultyID;
const findLastAdminID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAmdin = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastAmdin === null || lastAmdin === void 0 ? void 0 : lastAmdin.id) && lastAmdin.id.substring(2);
});
exports.findLastAdminID = findLastAdminID;
const generateAdminID = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentID = (yield (0, exports.findLastAdminID)()) || (0).toString().padStart(5, '0');
    let incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0');
    incrementalID = `A-${incrementalID}`;
    // console.log(incrementalID)
    return incrementalID;
});
exports.generateAdminID = generateAdminID;
