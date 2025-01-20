"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.studentSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    age: joi_1.default.number().integer().min(1).required(),
    grade: joi_1.default.string().required(),
});
