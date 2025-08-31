import React, { useState, useEffect } from 'react';
import { BookOpen, Filter, Users } from 'lucide-react';
import { Course, Student } from '../../types/Student';
import { fetchCourses } from '../../services/mockApi';
import StudentCard from '../Students/StudentCard';

interface CourseFilterProps {
  allStudents: Student[];
  selectedCourseId: number | null;
  onCourseSelect: (courseId: number | null) => void;
  onEditStudent: (student: Student) => void;
  onToggleStatus: (studentId: string) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({
  allStudents,
  selectedCourseId,
  onCourseSelect,
  onEditStudent,
  onToggleStatus
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentsByCourse = (courseId: number) => {
    return allStudents.filter(student => student.courseId === courseId);
  };

  const filteredStudents = selectedCourseId 
    ? getStudentsByCourse(selectedCourseId)
    : allStudents;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Courses & Students</h2>
      </div>

      {/* Course Filter Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Course</h3>
        </div>
        
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Loading courses...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onCourseSelect(null)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                selectedCourseId === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Courses ({allStudents.length})
            </button>
            
            {courses.map((course) => {
              const studentsInCourse = getStudentsByCourse(course.id);
              return (
                <button
                  key={course.id}
                  onClick={() => onCourseSelect(course.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    selectedCourseId === course.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {course.name} ({studentsInCourse.length})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Course Info */}
      {selectedCourseId && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Showing {filteredStudents.length} students enrolled in{' '}
              {courses.find(c => c.id === selectedCourseId)?.name}
            </span>
          </div>
        </div>
      )}

      {/* Students List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEditStudent}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No students found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {selectedCourseId 
              ? 'No students are enrolled in this course yet.'
              : 'Add some students to get started.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseFilter;