import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useStudents } from './hooks/useStudents';
import { Student, StudentFormData, Course } from './types/Student';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import TabNavigation from './components/Navigation/TabNavigation';
import StudentForm from './components/Students/StudentForm';
import StudentList from './components/Students/StudentList';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import CourseFilter from './components/Courses/CourseFilter';
import MentoringGuide from './components/Guide/MentoringGuide';
import { fetchCourses } from './services/mockApi';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const {
    students,
    allStudents,
    analytics,
    selectedCourseId,
    setSelectedCourseId,
    addStudent,
    updateStudent,
    toggleStudentStatus
  } = useStudents();

  // Load courses when component mounts
  React.useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const handleAddStudent = async (data: StudentFormData & { profileImageUrl: string }) => {
    const course = courses.find(c => c.id === parseInt(data.courseId));
    
    const newStudent: Student = {
      id: Date.now().toString(),
      studentId: data.studentId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      courseId: parseInt(data.courseId),
      courseName: course?.name || '',
      profileImage: data.profileImageUrl,
      isActive: data.isActive,
      enrollmentDate: new Date().toISOString(),
    };

    addStudent(newStudent);
    
    // Switch to dashboard tab to show the newly added student
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 500);
  };

  const handleEditStudent = async (data: StudentFormData & { profileImageUrl: string }) => {
    if (!editingStudent) return;

    const course = courses.find(c => c.id === parseInt(data.courseId));
    
    const updatedStudent: Student = {
      ...editingStudent,
      studentId: data.studentId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      courseId: parseInt(data.courseId),
      courseName: course?.name || '',
      profileImage: data.profileImageUrl || editingStudent.profileImage,
      isActive: data.isActive,
    };

    updateStudent(updatedStudent);
    setEditingStudent(null);
    setActiveTab('dashboard');
  };

  const handleStartEdit = (student: Student) => {
    setEditingStudent(student);
    setActiveTab('add-student');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <StudentList
            students={allStudents}
            onEdit={handleStartEdit}
            onToggleStatus={toggleStudentStatus}
          />
        );
      
      case 'add-student':
        return (
          <div className="space-y-6">
            <StudentForm
              onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
              initialData={editingStudent || undefined}
              isEdit={!!editingStudent}
            />
            {editingStudent && (
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setActiveTab('dashboard');
                }}
                className="w-full max-w-2xl mx-auto block text-center py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
              >
                Cancel Editing
              </button>
            )}
            <MentoringGuide />
          </div>
        );
      
      case 'analytics':
        return <AnalyticsDashboard analytics={analytics} />;
      
      case 'courses':
        return (
          <CourseFilter
            allStudents={allStudents}
            selectedCourseId={selectedCourseId}
            onCourseSelect={setSelectedCourseId}
            onEditStudent={handleStartEdit}
            onToggleStatus={toggleStudentStatus}
          />
        );
      
      default:
        return <StudentList students={allStudents} onEdit={handleStartEdit} onToggleStatus={toggleStudentStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;