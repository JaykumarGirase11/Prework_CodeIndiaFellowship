import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';
import { Student } from '../../types/Student';
import StudentCard from './StudentCard';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onToggleStatus: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onToggleStatus }) => {
  const activeStudents = students.filter(s => s.isActive);
  const inactiveStudents = students.filter(s => !s.isActive);

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No students found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by adding a new student.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
              <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeStudents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
              <UserX className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inactive Students</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{inactiveStudents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentList;