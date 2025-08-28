import { Button } from "~/components/ui/button";
import { Home, Users, Clock, Star, Trash2, Settings } from "lucide-react";

interface SidebarProps {
  onBackToRoot: () => void;
}

export function Sidebar({ onBackToRoot }: SidebarProps) {
  return (
    <aside className="bg-sidebar border-sidebar-border w-20 border-r h-screen flex flex-col items-center p-4">
      <nav className="space-y-4 flex flex-col items-center">
        <Button
          variant="ghost"
          className="text-sidebar-foreground hover:bg-sidebar-accent w-12 h-12 flex items-center justify-center"
          onClick={onBackToRoot}
        >
          <Home className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          className="text-sidebar-foreground hover:bg-sidebar-accent w-12 h-12 flex items-center justify-center"
        >
          <Users className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          className="text-sidebar-foreground hover:bg-sidebar-accent w-12 h-12 flex items-center justify-center"
        >
          <Clock className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          className="text-sidebar-foreground hover:bg-sidebar-accent w-12 h-12 flex items-center justify-center"
        >
          <Star className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          className="text-sidebar-foreground hover:bg-sidebar-accent w-12 h-12 flex items-center justify-center"
        >
          <Trash2 className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          className="text-sidebar-foreground hover:bg-sidebar-accent w-12 h-12 flex items-center justify-center"
        >
          <Settings className="h-8 w-8" />
        </Button>
      </nav>
    </aside>
  );
}