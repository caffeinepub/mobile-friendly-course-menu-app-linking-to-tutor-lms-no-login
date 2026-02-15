export interface Course {
  id: string;
  title: string;
  description: string;
  courseUrl: string;
  thumbnailUrl?: string;
}

export type DataSourceMode = 'manual' | 'remote';

export interface CourseSettings {
  dataSourceMode: DataSourceMode;
  remoteFeedUrl: string;
}
