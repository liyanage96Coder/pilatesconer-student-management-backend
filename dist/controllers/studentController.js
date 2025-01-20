"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getStudentById = exports.getAllStudents = void 0;
const studentService = __importStar(require("../services/studentService"));
const validation_1 = require("../utils/validation");
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentService.getAllStudents();
        res.json({
            message: "Successful get students",
            students: students,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = Number(req.params.id);
        if (isNaN(studentId)) {
            res.status(400).json({ message: "Invalid student ID" });
            return;
        }
        const student = yield studentService.getStudentById(studentId);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.json({
            message: "Successful get student",
            student: student,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getStudentById = getStudentById;
const addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.studentSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const studentId = yield studentService.addStudent(req.body);
        res.status(201).json(Object.assign({ message: "Successfully Create Student", id: studentId }, req.body));
    }
    catch (err) {
        next(err);
    }
});
exports.addStudent = addStudent;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.studentSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const success = yield studentService.updateStudent(Number(req.params.id), req.body);
        if (!success) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ message: "Student updated successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield studentService.deleteStudent(Number(req.params.id));
        if (!success) {
            res.status(404).json({ message: "Student not found" });
            res.json({ message: "Student deleted successfully" });
            return;
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteStudent = deleteStudent;
