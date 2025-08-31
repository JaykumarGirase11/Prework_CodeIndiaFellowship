# Student Management Dashboard

A modern, responsive web application built with React, TypeScript, and Tailwind CSS for managing student information, courses, and analytics.

## 🌟 Features

### Core Functionality
- **Student Management**: Add, edit, view, and manage student records
- **Course Management**: Organize students by courses (HTML Basics, CSS Mastery, JavaScript Pro, React In Depth)
- **Real-time Analytics**: Visual dashboard with student statistics and enrollment data
- **Profile Image Upload**: Upload and manage student profile pictures
- **Status Management**: Toggle student active/inactive status
- **Dark Mode Support**: Built-in theme switching capability

### User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Tab Navigation**: Easy switching between Dashboard, Add Student, Analytics, and Courses
- **Form Validation**: Comprehensive input validation with error handling
- **Loading States**: Visual feedback during data operations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Build Tool**: Vite 5.4.2
- **Icons**: Lucide React 0.344.0
- **Code Quality**: ESLint with TypeScript support

## 📦 Project Structure

```
src/
├── components/
│   ├── Analytics/
│   │   └── AnalyticsDashboard.tsx    # Analytics and statistics view
│   ├── Courses/
│   │   └── CourseFilter.tsx          # Course-based student filtering
│   ├── Guide/
│   │   └── MentoringGuide.tsx        # Student mentoring guidance
│   ├── Layout/
│   │   ├── Header.tsx                # Application header
│   │   └── Footer.tsx                # Application footer
│   ├── Navigation/
│   │   └── TabNavigation.tsx         # Main navigation tabs
│   └── Students/
│       ├── StudentCard.tsx           # Individual student card
│       ├── StudentForm.tsx           # Add/Edit student form
│       └── StudentList.tsx           # Student listing and management
├── context/
│   └── ThemeContext.tsx              # Dark/Light theme management
├── hooks/
│   └── useStudents.ts                # Student data management hook
├── services/
│   └── mockApi.ts                    # Mock API for courses and image upload
├── types/
│   └── Student.ts                    # TypeScript type definitions
├── App.tsx                           # Main application component
├── main.tsx                          # Application entry point
└── index.css                         # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Student Management Dashboard"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📖 Usage Guide

### Adding a New Student

1. Navigate to the **Add Student** tab
2. Fill in all required fields:
   - Student ID (unique identifier)
   - Full Name
   - Email Address
   - Phone Number
   - Course Selection
   - Profile Picture Upload
3. Set the student status (Active/Inactive)
4. Click **Add Student** to save

### Managing Students

- **View All Students**: Use the Dashboard tab to see all registered students
- **Edit Student**: Click the edit button on any student card
- **Toggle Status**: Use the toggle switch to activate/deactivate students
- **Filter by Course**: Use the Courses tab to view students by specific courses

### Analytics Dashboard

The Analytics section provides:
- Total student count
- Active/Inactive student ratios
- Student status distribution charts
- Course enrollment statistics
- Visual progress bars for data representation

### Course Management

- View students enrolled in specific courses
- Filter and manage students by course
- Available courses:
  - HTML Basics
  - CSS Mastery
  - JavaScript Pro
  - React In Depth

## 🔧 Configuration

### Theme Customization
The application supports both light and dark themes. The theme context is located in `src/context/ThemeContext.tsx`.

### Course Configuration
To modify available courses, update the mock data in `src/services/mockApi.ts`:

```typescript
return [
  { id: 1, name: "HTML Basics" },
  { id: 2, name: "CSS Mastery" },
  { id: 3, name: "JavaScript Pro" },
  { id: 4, name: "React In Depth" }
];
```

### Validation Rules
Form validation rules can be customized in `src/components/Students/StudentForm.tsx`:
- Email format validation
- Phone number format validation
- Required field validation
- File size limits (5MB for profile images)

## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Responsive design breakpoints
- Dark mode support
- Custom color schemes
- Smooth transitions and animations
- Consistent spacing and typography

### Color Scheme
- **Primary**: Blue variants for main actions
- **Success**: Emerald/Green for positive states
- **Warning**: Red for inactive states and errors
- **Info**: Purple for analytics and informational content

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with side-by-side layouts
- **Tablet**: Adapted layouts with stacked elements
- **Mobile**: Touch-friendly interface with simplified navigation

## 🔒 Data Management

Currently uses mock data for demonstration. Key features:
- Local state management with React hooks
- Persistent student data during session
- Mock API simulation with loading states
- Form state management with validation

### Future Enhancements
- Backend API integration
- Database persistence
- User authentication
- Real file upload service
- Export/Import functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting with ESLint
- Write descriptive component and function names
- Use meaningful commit messages
- Test responsive design on multiple devices

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Vite for the fast build tool

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**