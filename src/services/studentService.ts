import pool from '../config/db';
import {Student} from '../models/students';
import { RowDataPacket } from "mysql2";

export const getAllStudents = async (): Promise<Student[]> => {
    const [rows] = await pool.execute('SELECT * FROM students');
    return rows as Student[];
};

export const getStudentById = async (id: number): Promise<Student | null> => {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM students WHERE id = ?",
      [id]
    );
    return rows[0] as Student || null;
};

export const addStudent = async (student: Student): Promise<number> => {
    const [result] = await pool.query('INSERT INTO students (name, age, grade) VALUES (?,?,?)',[
        student.name,
        student.age,
        student.grade,
    ]);
    return (result as any).insertId;
};

export const updateStudent = async (id: number, student: Student): Promise<Boolean> => {
    const [result] = await pool.query('UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?',[
        student.name,
        student.age,
        student.grade,
        id,
    ]);
    return (result as any).affectedRows > 0;
};

export const deleteStudent = async (id: number): Promise<Boolean> => {
    const [result] =  await pool.query('DELETE FROM students WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
}
