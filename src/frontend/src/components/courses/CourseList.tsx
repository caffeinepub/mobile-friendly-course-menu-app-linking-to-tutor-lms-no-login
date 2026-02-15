import { Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CourseCard from './CourseCard';
import type { Course } from '@/features/courses/types';

interface CourseListProps {
  courses: Course[];
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  error: string | null;
  onCourseSelect: (course: Course) => void;
}

export default function CourseList({ 
  courses, 
  viewMode, 
  isLoading, 
  error,
  onCourseSelect 
}: CourseListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading courses</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or check your settings.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      }
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onClick={() => onCourseSelect(course)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
