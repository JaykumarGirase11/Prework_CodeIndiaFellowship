export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  courseId: number;
  courseName: string;
  profileImage: string;
  isActive: boolean;
  enrollmentDate: string;
}

export interface Course {
  id: number;
  name: string;
}

export interface StudentFormData {
  studentId: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  profileImage: File | null;
  isActive: boolean;
}