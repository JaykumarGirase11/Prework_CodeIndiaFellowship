import React from 'react';
import { Mail, Phone, BookOpen, Edit, CheckCircle, XCircle } from 'lucide-react';
import { Student } from '../../types/Student';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onToggleStatus: (studentId: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit, onToggleStatus }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={student.profileImage}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {student.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: {student.studentId}
              </p>
              <div className="flex items-center mt-1">
                {student.isActive ? (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600 dark:text-red-400 font-medium">Inactive</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onEdit(student)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Mail className="h-4 w-4" />
            <span>{student.email}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Phone className="h-4 w-4" />
            <span>{student.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <BookOpen className="h-4 w-4" />
            <span>{student.courseName}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
          </span>
          
          <button
            onClick={() => onToggleStatus(student.id)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
              student.isActive
                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800'
            }`}
          >
            {student.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;