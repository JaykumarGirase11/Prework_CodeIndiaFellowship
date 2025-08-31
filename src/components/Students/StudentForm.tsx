import React, { useState, useEffect } from 'react';
import { Upload, User, Mail, Phone, BookOpen, Hash, Camera, UserPlus } from 'lucide-react';
import { StudentFormData, Course } from '../../types/Student';
import { fetchCourses, uploadProfileImage } from '../../services/mockApi';

interface StudentFormProps {
  onSubmit: (data: StudentFormData & { profileImageUrl: string }) => void;
  initialData?: Partial<StudentFormData>;
  isEdit?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, initialData, isEdit = false }) => {
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: initialData?.studentId || '',
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    courseId: initialData?.courseId || '',
    profileImage: null,
    isActive: initialData?.isActive ?? true,
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setCoursesLoading(true);
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setCoursesLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d\s\-\(\)]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course';
    }

    if (!formData.profileImage && !isEdit) {
      newErrors.profileImage = 'Profile picture is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, profileImage: 'File size must be less than 5MB' }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profileImage: 'Please select an image file' }));
        return;
      }

      setFormData(prev => ({ ...prev, profileImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      let profileImageUrl = '';
      if (formData.profileImage) {
        profileImageUrl = await uploadProfileImage(formData.profileImage);
      }

      await onSubmit({
        ...formData,
        profileImageUrl
      });

      // Reset form after successful submission
      if (!isEdit) {
        setFormData({
          studentId: '',
          name: '',
          email: '',
          phone: '',
          courseId: '',
          profileImage: null,
          isActive: true,
        });
        setPreviewUrl(null);
        setErrors({});
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
          <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEdit ? 'Edit Student' : 'Add New Student'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-4 border-gray-200 dark:border-gray-600">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">
                {previewUrl ? 'Change Photo' : 'Upload Photo'}
              </span>
            </div>
          </label>
          
          {errors.profileImage && (
            <p className="text-red-500 text-sm">{errors.profileImage}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Hash className="inline h-4 w-4 mr-1" />
              Student ID
            </label>
            <input
              type="text"
              value={formData.studentId}
              onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.studentId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., STU001"
            />
            {errors.studentId && (
              <p className="mt-1 text-red-500 text-sm">{errors.studentId}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="student@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Course Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <BookOpen className="inline h-4 w-4 mr-1" />
            Select Course
          </label>
          {coursesLoading ? (
            <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Loading courses...</span>
            </div>
          ) : (
            <select
              value={formData.courseId}
              onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.courseId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
          {errors.courseId && (
            <p className="mt-1 text-red-500 text-sm">{errors.courseId}</p>
          )}
        </div>

        {/* Status Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Student Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.isActive ? 'Student is currently active' : 'Student is currently inactive'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              formData.isActive ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                formData.isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || coursesLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>Processing...</span>
            </>
          ) : (
            <span>{isEdit ? 'Update Student' : 'Add Student'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;