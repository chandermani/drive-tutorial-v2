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

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return <Folder className="text-primary h-8 w-8" />;
    case "document":
      return <FileText className="h-8 w-8 text-blue-400" />;
    case "image":
      return <ImageIcon className="h-8 w-8 text-green-400" />;
    case "video":
      return <Video className="h-8 w-8 text-red-400" />;
    case "audio":
      return <Music className="h-8 w-8 text-purple-400" />;
    default:
      return <FileText className="text-muted-foreground h-8 w-8" />;
  }
};

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

  return (
    <div className="bg-background min-h-screen">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        handleUpload={handleUpload}
      />

      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-sidebar border-sidebar-border w-64 border-r p-4">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
              onClick={handleBackToRoot}
            >
              <Home className="mr-3 h-4 w-4" />
              My Drive
            </Button>
            <Button
              variant="ghost"
              className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
            >
              <Users className="mr-3 h-4 w-4" />
              Shared with me
            </Button>
            <Button
              variant="ghost"
              className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
            >
              <Clock className="mr-3 h-4 w-4" />
              Recent
            </Button>
            <Button
              variant="ghost"
              className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
            >
              <Star className="mr-3 h-4 w-4" />
              Starred
            </Button>
            <Button
              variant="ghost"
              className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
            >
              <Trash2 className="mr-3 h-4 w-4" />
              Trash
            </Button>
            <Button
              variant="ghost"
              className="text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  className="hover:bg-accent/50 group bg-card border-border cursor-pointer p-4 transition-colors"
                  onClick={() =>
                    file.type === "folder"
                      ? handleFolderClick(file.name)
                      : file.url && window.open(file.url, "_blank")
                  }
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      {getFileIcon(file.type)}
                      {file.starred && (
                        <Star className="absolute -top-1 -right-1 h-3 w-3 fill-current text-yellow-400" />
                      )}
                    </div>
                    <div className="text-center">
                      <p
                        className="text-card-foreground w-full truncate text-sm font-medium"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {file.size && `${file.size} • `}
                        {file.modified}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-card border-border overflow-hidden rounded-lg border">
              {/* List header */}
              <div className="text-muted-foreground border-border bg-muted/30 flex items-center border-b px-6 py-3 text-sm font-medium">
                <div className="flex-1">Name</div>
                <div className="w-32 text-center">Modified</div>
                <div className="w-24 text-center">Size</div>
                <div className="w-20"></div> {/* Space for actions */}
              </div>

              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="hover:bg-accent/30 group border-border/50 flex cursor-pointer items-center border-b px-6 py-4 transition-colors last:border-b-0"
                  onClick={() =>
                    file.type === "folder"
                      ? handleFolderClick(file.name)
                      : file.url && window.open(file.url, "_blank")
                  }
                >
                  {/* Icon and Name column */}
                  <div className="flex min-w-0 flex-1 items-center space-x-3">
                    <div className="relative flex-shrink-0">
                      {getFileIcon(file.type)}
                      {file.starred && (
                        <Star className="absolute -top-1 -right-1 h-3 w-3 fill-current text-yellow-400" />
                      )}
                    </div>
                    <p
                      className="text-foreground truncate font-medium"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                  </div>

                  {/* Modified column */}
                  <div className="w-32 text-center">
                    <p className="text-muted-foreground text-sm">
                      {file.modified}
                    </p>
                  </div>

                  {/* Size column */}
                  <div className="w-24 text-center">
                    <p className="text-muted-foreground text-sm">
                      {file.type === "folder" ? "—" : file.size || "—"}
                    </p>
                  </div>

                  {/* Actions column */}
                  <div className="flex w-20 items-center justify-end space-x-1">
                    {/* Direct Download and Delete Icons for Files */}
                    {file.type !== "folder" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-accent h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (file.url) {
                              const link = document.createElement("a");
                              link.href = file.url;
                              link.download = file.name;
                              link.click();
                            }
                          }}
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                `Are you sure you want to delete "${file.name}"?`,
                              )
                            ) {
                              setFiles(files.filter((f) => f.id !== file.id));
                            }
                          }}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* More actions menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
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
