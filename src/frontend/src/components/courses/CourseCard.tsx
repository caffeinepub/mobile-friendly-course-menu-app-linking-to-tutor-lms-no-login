import { ExternalLink, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Course } from '@/features/courses/types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  viewMode?: 'grid' | 'list';
}

export default function CourseCard({ course, onClick, viewMode = 'grid' }: CourseCardProps) {
  const handleOpenCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(course.courseUrl, '_blank', 'noopener,noreferrer');
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
        onClick={onClick}
      >
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {course.thumbnailUrl && (
            <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <img 
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <Button 
                size="sm"
                onClick={handleOpenCourse}
                className="gap-2"
              >
                Open Course
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50 hover:-translate-y-1 flex flex-col h-full"
      onClick={onClick}
    >
      {course.thumbnailUrl && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg bg-muted">
          <img 
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="line-clamp-3">{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button 
          className="w-full gap-2"
          onClick={handleOpenCourse}
        >
          Open Course
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
