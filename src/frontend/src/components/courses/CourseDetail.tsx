import { ExternalLink, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Course } from '@/features/courses/types';

interface CourseDetailProps {
  course: Course;
}

export default function CourseDetail({ course }: CourseDetailProps) {
  const handleOpenCourse = () => {
    window.open(course.courseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="overflow-hidden">
        {course.thumbnailUrl && (
          <div className="w-full h-64 md:h-96 overflow-hidden bg-muted">
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
        
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-3xl md:text-4xl">{course.title}</CardTitle>
            <CardDescription className="text-base">{course.description}</CardDescription>
          </div>
          
          <Button 
            size="lg"
            onClick={handleOpenCourse}
            className="w-full sm:w-auto gap-2 text-lg py-6"
          >
            <BookOpen className="h-5 w-5" />
            Open Course
            <ExternalLink className="h-5 w-5" />
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">About This Course</h3>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold">Course Details</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Video-based learning</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Self-paced</span>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              variant="outline"
              size="lg"
              onClick={handleOpenCourse}
              className="w-full gap-2"
            >
              Start Learning Now
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
