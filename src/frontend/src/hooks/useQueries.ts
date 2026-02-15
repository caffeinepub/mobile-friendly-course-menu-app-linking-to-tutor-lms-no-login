import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '@/features/courses/courseDataSource';
import { usePersistedSettings } from '@/features/settings/usePersistedSettings';

export function useCourses() {
  const { settings } = usePersistedSettings();

  const query = useQuery({
    queryKey: ['courses', settings.dataSourceMode, settings.remoteFeedUrl],
    queryFn: async () => {
      const result = await fetchCourses(
        settings.dataSourceMode,
        settings.remoteFeedUrl
      );
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    courses: query.data?.courses || [],
    isLoading: query.isLoading,
    error: query.data?.error || (query.error ? String(query.error) : null),
    refetch: query.refetch,
  };
}
