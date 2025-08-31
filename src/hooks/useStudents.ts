import { useState, useEffect, useMemo } from 'react';
import { Student, Course } from '../types/Student';

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    courseId: 4,
    courseName: 'React In Depth',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isActive: true,
    enrollmentDate: '2024-01-15'
  },
  {
    id: '2',
    studentId: 'STU002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    courseId: 3,
    courseName: 'JavaScript Pro',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isActive: true,
    enrollmentDate: '2024-02-01'
  }
];

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const filteredStudents = useMemo(() => {
    if (selectedCourseId === null) return students;
    return students.filter(student => student.courseId === selectedCourseId);
  }, [students, selectedCourseId]);

  const analytics = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.isActive).length;
    const inactiveStudents = totalStudents - activeStudents;
    
    const courseStats = students.reduce((acc, student) => {
      const courseName = student.courseName;
      acc[courseName] = (acc[courseName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalStudents,
      activeStudents,
      inactiveStudents,
      courseStats
    };
  }, [students]);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const toggleStudentStatus = (studentId: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId 
          ? { ...student, isActive: !student.isActive }
          : student
      )
    );
  };

  return {
    students: filteredStudents,
    allStudents: students,
    analytics,
    selectedCourseId,
    setSelectedCourseId,
    addStudent,
    updateStudent,
    toggleStudentStatus
  };
};