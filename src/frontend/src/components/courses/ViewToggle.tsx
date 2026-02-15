import { LayoutGrid, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ViewToggleProps {
  value: 'grid' | 'list';
  onChange: (value: 'grid' | 'list') => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <ToggleGroup 
      type="single" 
      value={value} 
      onValueChange={(val) => val && onChange(val as 'grid' | 'list')}
      className="border rounded-lg"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view" className="gap-2">
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view" className="gap-2">
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
