import { Search, Grid3X3, List, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function Header({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  handleUpload,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  handleUpload: () => void;
}) {
  return (
    <header className="border-border bg-card border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-foreground text-2xl font-bold">Drive</h1>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search in Drive"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input border-border w-96 pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              console.log("[v0] Switching to grid view");
              setViewMode("grid");
            }}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              console.log("[v0] Switching to list view");
              setViewMode("list");
            }}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleUpload}
            className="bg-primary hover:bg-primary/90"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>
    </header>
  );
}
