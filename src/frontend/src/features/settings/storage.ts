import type { CourseSettings } from '../courses/types';

const STORAGE_KEY = 'course-app-settings';

const DEFAULT_SETTINGS: CourseSettings = {
  dataSourceMode: 'manual',
  remoteFeedUrl: '',
};

export function loadSettings(): CourseSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(stored);
    
    return {
      dataSourceMode: parsed.dataSourceMode === 'remote' ? 'remote' : 'manual',
      remoteFeedUrl: typeof parsed.remoteFeedUrl === 'string' ? parsed.remoteFeedUrl : '',
    };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: CourseSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}
