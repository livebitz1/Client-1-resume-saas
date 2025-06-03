
import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortableSection from "./SortableSection";

interface SectionsTabContentProps {
  sections: string[];
  setSections: React.Dispatch<React.SetStateAction<string[]>>;
  sectionNames: Record<string, string>;
  handleSectionRename: (sectionId: string, newName: string) => void;
}

const SectionsTabContent: React.FC<SectionsTabContentProps> = ({ 
  sections, 
  setSections, 
  sectionNames,
  handleSectionRename
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Drag to reorder sections or customize section names to match your preferences.
      </p>
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext 
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {sections.map((section) => (
              <SortableSection 
                key={section}
                id={section}
                name={sectionNames[section] || section}
                onRename={handleSectionRename}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SectionsTabContent;
