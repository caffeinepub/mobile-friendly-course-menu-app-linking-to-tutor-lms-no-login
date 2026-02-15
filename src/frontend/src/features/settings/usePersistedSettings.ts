import { useState, useEffect, useCallback } from 'react';
import type { CourseSettings } from '../courses/types';
import { loadSettings, saveSettings } from './storage';

export function usePersistedSettings() {
  const [settings, setSettings] = useState<CourseSettings>(() => loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<CourseSettings>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates };
      return newSettings;
    });
  }, []);

  return {
    settings,
    updateSettings,
  };
}
