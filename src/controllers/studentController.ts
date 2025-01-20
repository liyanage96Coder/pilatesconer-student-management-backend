import { Request, Response, NextFunction, RequestHandler } from "express";
import * as studentService from "../services/studentService";
import { studentSchema } from "../utils/validation";

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await studentService.getAllStudents();
    res.json({
      message: "Successful get students",
      students: students,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentById: RequestHandler = async (req, res, next) => {
  try {
    const studentId = Number(req.params.id);

    if (isNaN(studentId)) {
      res.status(400).json({ message: "Invalid student ID" });
      return;
    }

    const student = await studentService.getStudentById(studentId);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json({
      message: "Successful get student",
      student: student,
    });
  } catch (err) {
    next(err);
  }
};

export const addStudent: RequestHandler = async (req, res, next) => {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const studentId = await studentService.addStudent(req.body);
    res.status(201).json({
      message: "Successfully Create Student",
      id: studentId,
      ...req.body,
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const success = await studentService.updateStudent(
      Number(req.params.id),
      req.body
    );
    if (!success) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.status(200).json({ message: "Student updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const success = await studentService.deleteStudent(Number(req.params.id));
    if (!success) {
      res.status(404).json({ message: "Student not found" });
      res.json({ message: "Student deleted successfully" });
      return;
    }
  } catch (err) {
    next(err);
  }
};
