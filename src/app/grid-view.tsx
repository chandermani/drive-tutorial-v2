import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  MoreVertical,
  Star,
  Eye,
  Share2,
  Download,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import React from "react";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "document" | "image" | "video" | "audio";
  size?: string;
  modified: string;
  starred?: boolean;
  url?: string;
}

interface GridViewProps {
  files: FileItem[];
  getFileIcon: (type: string) => React.ReactNode;
  onFolderClick: (folderName: string) => void;
}

export function GridView({ files, getFileIcon, onFolderClick }: GridViewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {files.map((file) => (
        <Card
          key={file.id}
          className="hover:bg-accent/50 group bg-card border-border cursor-pointer p-4 transition-colors"
          onClick={() =>
            file.type === "folder"
              ? onFolderClick(file.name)
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
  );
}
