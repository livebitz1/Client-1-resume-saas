
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SortableSectionProps {
  id: string;
  name: string;
  onRename: (id: string, newName: string) => void;
}

const SortableSection: React.FC<SortableSectionProps> = ({ id, name, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRename = () => {
    onRename(id, newName);
    setIsEditing(false);
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="flex items-center p-3 mb-2 bg-white border rounded-md shadow-sm"
    >
      <div className="cursor-move mr-2 text-gray-400" {...attributes} {...listeners}>
        <GripVertical size={20} />
      </div>
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button size="sm" onClick={handleRename}>
            <Check size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-between">
          <span>{name}</span>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            Rename
          </Button>
        </div>
      )}
    </div>
  );
};

export default SortableSection;
