import { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import CourseList from './components/courses/CourseList';
import CourseDetail from './components/courses/CourseDetail';
import CourseSearchBar from './components/courses/CourseSearchBar';
import ViewToggle from './components/courses/ViewToggle';
import SettingsPanel from './components/settings/SettingsPanel';
import { useCourses } from './hooks/useQueries';
import type { Course } from './features/courses/types';

const queryClient = new QueryClient();

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const { courses, isLoading, error } = useCourses();

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    if (!searchQuery.trim()) return courses;
    
    const query = searchQuery.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  return (
    <AppShell 
      onSettingsClick={() => setShowSettings(true)}
      showBackButton={!!selectedCourse}
      onBackClick={handleBackToList}
    >
      {selectedCourse ? (
        <CourseDetail course={selectedCourse} />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CourseSearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full sm:max-w-md"
            />
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>

          <CourseList
            courses={filteredCourses}
            viewMode={viewMode}
            isLoading={isLoading}
            error={error}
            onCourseSelect={handleCourseSelect}
          />
        </div>
      )}

      <SettingsPanel 
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </AppShell>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
