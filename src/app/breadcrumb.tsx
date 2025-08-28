import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BreadcrumbProps {
  path: string[];
  onClick: (index: number) => void;
  onBackToRoot?: () => void;
}

export function Breadcrumb({ path, onClick, onBackToRoot }: BreadcrumbProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center space-x-2">
        {path.map((segment, index) => (
          <div key={index} className="flex items-center">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary h-auto p-0 text-xl font-semibold"
              onClick={() => onClick(index)}
            >
              {segment}
            </Button>
            {index < path.length - 1 && (
              <ChevronRight className="text-muted-foreground mx-2 h-5 w-5" />
            )}
          </div>
        ))}
      </div>
      {path.length > 1 && onBackToRoot && (
        <Button
          variant="ghost"
          onClick={onBackToRoot}
          className="text-primary hover:text-primary/80"
        >
          ← Back to My Drive
        </Button>
      )}
    </div>
  );
}
