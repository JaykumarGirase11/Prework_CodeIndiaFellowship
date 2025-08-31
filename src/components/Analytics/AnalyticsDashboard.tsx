import React from 'react';
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';

interface AnalyticsProps {
  analytics: {
    totalStudents: number;
    activeStudents: number;
    inactiveStudents: number;
    courseStats: Record<string, number>;
  };
}

const AnalyticsDashboard: React.FC<AnalyticsProps> = ({ analytics }) => {
  const { totalStudents, activeStudents, inactiveStudents, courseStats } = analytics;
  
  const activePercentage = totalStudents > 0 ? (activeStudents / totalStudents) * 100 : 0;
  const inactivePercentage = totalStudents > 0 ? (inactiveStudents / totalStudents) * 100 : 0;

  const maxCourseEnrollment = Math.max(...Object.values(courseStats), 1);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
          <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Rate</p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {activePercentage.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
              <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{activeStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
              <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inactive Students</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{inactiveStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Status Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Active Students</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{activeStudents} ({activePercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${activePercentage}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-600 dark:text-red-400">Inactive Students</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{inactiveStudents} ({inactivePercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${inactivePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Enrollment Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Enrollment</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(courseStats).map(([courseName, count]) => {
            const percentage = (count / maxCourseEnrollment) * 100;
            
            return (
              <div key={courseName}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{courseName}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{count} students</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;