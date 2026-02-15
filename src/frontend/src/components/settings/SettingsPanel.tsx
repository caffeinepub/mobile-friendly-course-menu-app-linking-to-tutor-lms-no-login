import { useState } from 'react';
import { AlertCircle, Database, Link as LinkIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { usePersistedSettings } from '@/features/settings/usePersistedSettings';
import { toast } from 'sonner';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const { settings, updateSettings } = usePersistedSettings();
  const [tempUrl, setTempUrl] = useState(settings.remoteFeedUrl);

  const handleModeChange = (useRemote: boolean) => {
    updateSettings({
      dataSourceMode: useRemote ? 'remote' : 'manual'
    });
    toast.success(
      useRemote 
        ? 'Switched to remote feed mode' 
        : 'Switched to manual course list'
    );
  };

  const handleUrlSave = () => {
    if (!tempUrl.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    try {
      new URL(tempUrl);
      updateSettings({ remoteFeedUrl: tempUrl });
      toast.success('Remote feed URL updated');
    } catch {
      toast.error('Invalid URL format');
    }
  };

  const handleResetToManual = () => {
    updateSettings({
      dataSourceMode: 'manual',
      remoteFeedUrl: ''
    });
    setTempUrl('');
    toast.success('Reset to manual course list');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your course data source
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Data Source Mode */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="remote-mode" className="text-base font-semibold">
                  Use Remote Feed
                </Label>
                <p className="text-sm text-muted-foreground">
                  Load courses from a JSON endpoint
                </p>
              </div>
              <Switch
                id="remote-mode"
                checked={settings.dataSourceMode === 'remote'}
                onCheckedChange={handleModeChange}
              />
            </div>

            <Separator />

            {settings.dataSourceMode === 'manual' ? (
              <Alert>
                <Database className="h-4 w-4" />
                <AlertTitle>Manual Mode Active</AlertTitle>
                <AlertDescription>
                  Using the built-in course list. Enable remote feed to load courses from an external source.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feed-url">Remote Feed URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="feed-url"
                      type="url"
                      placeholder="https://example.com/courses.json"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                    />
                    <Button onClick={handleUrlSave} size="sm">
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The endpoint should return a JSON array of course objects
                  </p>
                </div>

                <Alert>
                  <LinkIcon className="h-4 w-4" />
                  <AlertTitle>Remote Feed Format</AlertTitle>
                  <AlertDescription className="text-xs space-y-2">
                    <p>Expected JSON structure:</p>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`[
  {
    "id": "1",
    "title": "Course Title",
    "description": "Description",
    "courseUrl": "https://...",
    "thumbnailUrl": "https://..."
  }
]`}
                    </pre>
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Connection Issues?</AlertTitle>
                  <AlertDescription>
                    If the remote feed fails to load, you can switch back to the manual list.
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={handleResetToManual}
                    >
                      Reset to Manual List
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
