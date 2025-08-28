"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  MoreVertical,
  Star,
  Trash2,
  Share2,
  Download,
  Eye,
  Home,
  Clock,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { GridView } from "./grid-view";
import { ListView } from "./list-view";
import { getFileIcon } from "./get-file-icon";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "document" | "image" | "video" | "audio";
  size?: string;
  modified: string;
  starred?: boolean;
  url?: string;
}

const mockData: FileItem[] = [
  { id: "1", name: "Documents", type: "folder", modified: "2 days ago" },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    starred: true,
  },
  { id: "3", name: "Videos", type: "folder", modified: "3 days ago" },
  {
    id: "4",
    name: "Project Proposal.pdf",
    type: "document",
    size: "2.4 MB",
    modified: "1 hour ago",
    url: "#",
  },
  {
    id: "5",
    name: "Vacation Photo.jpg",
    type: "image",
    size: "5.2 MB",
    modified: "2 days ago",
    starred: true,
    url: "#",
  },
  {
    id: "6",
    name: "Meeting Recording.mp4",
    type: "video",
    size: "45.8 MB",
    modified: "1 day ago",
    url: "#",
  },
  {
    id: "7",
    name: "Presentation.pptx",
    type: "document",
    size: "8.1 MB",
    modified: "3 hours ago",
    url: "#",
  },
  {
    id: "8",
    name: "Background Music.mp3",
    type: "audio",
    size: "3.7 MB",
    modified: "5 days ago",
    url: "#",
  },
];

export default function DriveClone() {
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>(["My Drive"]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState(mockData);

  console.log("[v0] Current view mode:", viewMode);
  console.log("[v0] Files count:", files.length);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleFolderClick = (folderName: string) => {
    if (folderName === "Documents") {
      setFiles([
        {
          id: "d1",
          name: "Resume.pdf",
          type: "document",
          size: "1.2 MB",
          modified: "1 week ago",
          url: "#",
        },
        {
          id: "d2",
          name: "Cover Letter.docx",
          type: "document",
          size: "0.8 MB",
          modified: "2 weeks ago",
          url: "#",
        },
        {
          id: "d3",
          name: "Budget Spreadsheet.xlsx",
          type: "document",
          size: "2.1 MB",
          modified: "3 days ago",
          url: "#",
        },
      ]);
      setBreadcrumbPath(["My Drive", "Documents"]);
    } else if (folderName === "Photos") {
      setFiles([
        {
          id: "p1",
          name: "Summer Trip.jpg",
          type: "image",
          size: "4.2 MB",
          modified: "1 month ago",
          url: "#",
        },
        {
          id: "p2",
          name: "Family Portrait.png",
          type: "image",
          size: "6.8 MB",
          modified: "2 weeks ago",
          url: "#",
        },
        {
          id: "p3",
          name: "Sunset.jpg",
          type: "image",
          size: "3.1 MB",
          modified: "1 week ago",
          starred: true,
          url: "#",
        },
      ]);
      setBreadcrumbPath(["My Drive", "Photos"]);
    } else if (folderName === "Videos") {
      setFiles([
        {
          id: "v1",
          name: "Tutorial.mp4",
          type: "video",
          size: "125 MB",
          modified: "1 week ago",
          url: "#",
        },
        {
          id: "v2",
          name: "Presentation Recording.mov",
          type: "video",
          size: "89 MB",
          modified: "3 days ago",
          url: "#",
        },
      ]);
      setBreadcrumbPath(["My Drive", "Videos"]);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = breadcrumbPath.slice(0, index + 1);
    setBreadcrumbPath(newPath);

    if (newPath.length === 1) {
      // Back to root
      setFiles(mockData);
    }
    // Could add more navigation logic here for deeper folder structures
  };

  const handleBackToRoot = () => {
    setFiles(mockData);
    setBreadcrumbPath(["My Drive"]);
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!");
  };

  // Add a handler for deleting files
  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter((f) => f.id !== fileId));
  };

  return (
    <div className="bg-background min-h-screen">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        handleUpload={handleUpload}
      />
      <div className="flex min-h-screen w-full">
        <Sidebar onBackToRoot={handleBackToRoot} />
        <main className="flex-1 p-6 h-screen">
          <div className="mb-6">
            <div className="mb-2 flex items-center space-x-2">
              {breadcrumbPath.map((path, index) => (
                <div key={index} className="flex items-center">
                  <Button
                    variant="ghost"
                    className="text-foreground hover:text-primary h-auto p-0 text-xl font-semibold"
                    onClick={() => handleBreadcrumbClick(index)}
                  >
                    {path}
                  </Button>
                  {index < breadcrumbPath.length - 1 && (
                    <ChevronRight className="text-muted-foreground mx-2 h-5 w-5" />
                  )}
                </div>
              ))}
            </div>
            {breadcrumbPath.length > 1 && (
              <Button
                variant="ghost"
                onClick={handleBackToRoot}
                className="text-primary hover:text-primary/80"
              >
                ← Back to My Drive
              </Button>
            )}
          </div>

          {/* File Grid/List */}
          {viewMode === "grid" ? (
            <GridView
              files={filteredFiles}
              getFileIcon={getFileIcon}
              onFolderClick={handleFolderClick}
            />
          ) : (
            <ListView
              files={filteredFiles}
              getFileIcon={getFileIcon}
              onFolderClick={handleFolderClick}
              onDeleteFile={handleDeleteFile}
            />
          )}

          {filteredFiles.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No files found matching your search.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}