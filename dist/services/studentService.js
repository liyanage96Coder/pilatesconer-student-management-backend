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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getStudentById = exports.getAllStudents = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.execute('SELECT * FROM students');
    return rows;
});
exports.getAllStudents = getAllStudents;
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query("SELECT * FROM students WHERE id = ?", [id]);
    return rows[0] || null;
});
exports.getStudentById = getStudentById;
const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query('INSERT INTO students (name, age, grade) VALUES (?,?,?)', [
        student.name,
        student.age,
        student.grade,
    ]);
    return result.insertId;
});
exports.addStudent = addStudent;
const updateStudent = (id, student) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query('UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?', [
        student.name,
        student.age,
        student.grade,
        id,
    ]);
    return result.affectedRows > 0;
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.default.query('DELETE FROM students WHERE id = ?', [id]);
    return result.affectedRows > 0;
});
exports.deleteStudent = deleteStudent;
