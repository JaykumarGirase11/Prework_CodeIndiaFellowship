import { Course } from '../types/Student';

// Mock API delay to simulate real API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCourses = async (): Promise<Course[]> => {
  await delay(800); // Simulate network delay
  
  // Mock the specified courses
  return [
    { id: 1, name: "HTML Basics" },
    { id: 2, name: "CSS Mastery" },
    { id: 3, name: "JavaScript Pro" },
    { id: 4, name: "React In Depth" }
  ];
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  await delay(1000); // Simulate upload delay
  
  // In a real app, this would upload to a service like AWS S3 or Cloudinary
  // For this demo, we'll create a blob URL
  return URL.createObjectURL(file);
};