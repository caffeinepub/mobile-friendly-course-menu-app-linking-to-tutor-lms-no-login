import type { Course } from './types';
import { manualCourses } from './manualCourses';

export async function fetchCourses(
  mode: 'manual' | 'remote',
  remoteFeedUrl?: string
): Promise<{ courses: Course[]; error: string | null }> {
  if (mode === 'manual') {
    return { courses: manualCourses, error: null };
  }

  if (!remoteFeedUrl || !remoteFeedUrl.trim()) {
    return { 
      courses: manualCourses, 
      error: 'No remote feed URL configured. Using manual list.' 
    };
  }

  try {
    const response = await fetch(remoteFeedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: expected an array');
    }

    const courses: Course[] = data.map((item: any, index: number) => {
      if (!item.id || !item.title || !item.description || !item.courseUrl) {
        throw new Error(`Invalid course data at index ${index}: missing required fields`);
      }

      return {
        id: String(item.id),
        title: String(item.title),
        description: String(item.description),
        courseUrl: String(item.courseUrl),
        thumbnailUrl: item.thumbnailUrl ? String(item.thumbnailUrl) : undefined,
      };
    });

    return { courses, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch remote courses';
    
    console.error('Course fetch error:', error);
    
    return { 
      courses: manualCourses, 
      error: `Remote feed error: ${errorMessage}. Using manual list.` 
    };
  }
}
