
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface BulletPoint {
  id: string;
  text: string;
  selected: boolean;
}

interface AiBulletPointSelectorProps {
  title: string;
  originalContent: string;
  onContentUpdate: (newContent: string) => void;
  placeholder?: string;
}

const AiBulletPointSelector: React.FC<AiBulletPointSelectorProps> = ({
  title,
  originalContent,
  onContentUpdate,
  placeholder = "Enter content to enhance..."
}) => {
  const [bulletPoints, setBulletPoints] = useState<BulletPoint[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customBullet, setCustomBullet] = useState('');

  const generateBulletPoints = async () => {
    if (!originalContent.trim()) {
      toast.error("Please enter some content first");
      return;
    }

    setIsGenerating(true);
    try {
      // Mock AI enhancement - replace with Eden AI integration
      setTimeout(() => {
        const mockBullets: BulletPoint[] = [
          { id: '1', text: `Enhanced version of "${originalContent.substring(0, 30)}..."`, selected: true },
          { id: '2', text: `Professional summary highlighting key achievements`, selected: true },
          { id: '3', text: `Quantified results and measurable outcomes`, selected: false },
          { id: '4', text: `Industry-specific keywords and terminology`, selected: false },
          { id: '5', text: `Action-oriented language and strong verbs`, selected: true },
        ];
        setBulletPoints(mockBullets);
        setIsGenerating(false);
        toast.success("AI suggestions generated!");
      }, 2000);
    } catch (error) {
      setIsGenerating(false);
      toast.error("Failed to generate suggestions");
    }
  };

  const toggleBulletPoint = (id: string) => {
    setBulletPoints(prev => 
      prev.map(bullet => 
        bullet.id === id ? { ...bullet, selected: !bullet.selected } : bullet
      )
    );
  };

  const addCustomBullet = () => {
    if (customBullet.trim()) {
      const newBullet: BulletPoint = {
        id: Date.now().toString(),
        text: customBullet.trim(),
        selected: true
      };
      setBulletPoints(prev => [...prev, newBullet]);
      setCustomBullet('');
      toast.success("Custom bullet point added!");
    }
  };

  const applySelectedBullets = () => {
    const selectedBullets = bulletPoints
      .filter(bullet => bullet.selected)
      .map(bullet => `• ${bullet.text}`)
      .join('\n');
    
    onContentUpdate(selectedBullets);
    toast.success("Content updated with selected bullet points!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI {title} Enhancement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={originalContent}
          onChange={(e) => onContentUpdate(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px]"
        />
        
        <Button 
          onClick={generateBulletPoints}
          disabled={isGenerating || !originalContent.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating AI Suggestions...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate AI Bullet Points
            </>
          )}
        </Button>

        {bulletPoints.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Select bullet points to include:</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {bulletPoints.map((bullet) => (
                <div key={bullet.id} className="flex items-start space-x-2 p-2 border rounded">
                  <Checkbox
                    checked={bullet.selected}
                    onCheckedChange={() => toggleBulletPoint(bullet.id)}
                    className="mt-1"
                  />
                  <span className="text-sm flex-1">{bullet.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={customBullet}
                onChange={(e) => setCustomBullet(e.target.value)}
                placeholder="Add your own bullet point..."
                className="flex-1"
                rows={2}
              />
              <Button 
                onClick={addCustomBullet}
                disabled={!customBullet.trim()}
                size="sm"
                className="self-end"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              onClick={applySelectedBullets}
              className="w-full"
              variant="default"
            >
              Apply Selected Bullet Points ({bulletPoints.filter(b => b.selected).length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiBulletPointSelector;
