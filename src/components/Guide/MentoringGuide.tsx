import React from 'react';
import { BookOpen, Code, Lightbulb, Target } from 'lucide-react';

const MentoringGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-lg">
          <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Student Management Dashboard - Learning Guide
        </h1>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Project Overview</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This Student Management Dashboard demonstrates modern React development patterns, async JavaScript concepts, 
            and professional UI/UX design. It showcases real-world application development skills including state management, 
            form validation, API integration, and responsive design.
          </p>
        </section>

        {/* Key Concepts */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Code className="h-5 w-5 text-green-600" />
            <span>Key Technical Concepts Demonstrated</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Async/Await */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Async/Await Pattern</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Mock API calls with simulated network delays</li>
                <li>• Proper error handling in async operations</li>
                <li>• Loading states during async operations</li>
                <li>• File upload simulation with progress feedback</li>
              </ul>
              <div className="mt-3 bg-blue-50 dark:bg-blue-900/30 p-3 rounded text-xs text-blue-800 dark:text-blue-200">
                <strong>Location:</strong> src/services/mockApi.ts, StudentForm component
              </div>
            </div>

            {/* Event Loop */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Event Loop Understanding</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• setTimeout for simulating network delays</li>
                <li>• Non-blocking UI during async operations</li>
                <li>• Proper sequencing of async operations</li>
                <li>• Event handling with state updates</li>
              </ul>
              <div className="mt-3 bg-green-50 dark:bg-green-900/30 p-3 rounded text-xs text-green-800 dark:text-green-200">
                <strong>Location:</strong> Form submission, API calls, theme transitions
              </div>
            </div>

            {/* React Hooks */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. React Hooks Mastery</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• useState for complex form and app state</li>
                <li>• useEffect for side effects and cleanup</li>
                <li>• useMemo for expensive calculations</li>
                <li>• Custom hooks for reusable logic</li>
                <li>• useContext for global theme management</li>
              </ul>
              <div className="mt-3 bg-purple-50 dark:bg-purple-900/30 p-3 rounded text-xs text-purple-800 dark:text-purple-200">
                <strong>Location:</strong> useStudents hook, ThemeContext, all components
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Performance Optimization</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Memoized calculations for analytics</li>
                <li>• Efficient filtering and search</li>
                <li>• Controlled components to prevent re-renders</li>
                <li>• Proper key props for list rendering</li>
              </ul>
              <div className="mt-3 bg-orange-50 dark:bg-orange-900/30 p-3 rounded text-xs text-orange-800 dark:text-orange-200">
                <strong>Location:</strong> useMemo in useStudents, React.memo usage
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <span>Development Best Practices</span>
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Code Organization</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Modular component architecture</li>
                  <li>• Separation of concerns (UI, logic, data)</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Custom hooks for reusable logic</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">UI/UX Excellence</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Responsive design for all devices</li>
                  <li>• Accessible color contrast ratios</li>
                  <li>• Smooth transitions and micro-interactions</li>
                  <li>• Professional color palette and typography</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
            Learning Outcomes Achieved
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Technical Skills</h4>
              <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                <li>✓ Advanced React patterns and hooks</li>
                <li>✓ Async JavaScript and Promise handling</li>
                <li>✓ Form validation and user input handling</li>
                <li>✓ State management and data flow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Professional Skills</h4>
              <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                <li>✓ Clean, maintainable code structure</li>
                <li>✓ Professional UI/UX design principles</li>
                <li>✓ Accessibility and responsive design</li>
                <li>✓ Production-ready development practices</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MentoringGuide;