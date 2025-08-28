import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  MoreVertical,
  Star,
  Download,
  Trash2,
  Eye,
  Share2,
} from "lucide-react";
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

interface ListViewProps {
  files: FileItem[];
  getFileIcon: (type: string) => React.ReactNode;
  onFolderClick: (folderName: string) => void;
  onDeleteFile: (fileId: string) => void;
}

export function ListView({
  files,
  getFileIcon,
  onFolderClick,
  onDeleteFile,
}: ListViewProps) {
  return (
    <div className="bg-card border-border overflow-hidden rounded-lg border">
      {/* List header */}
      <div className="text-muted-foreground border-border bg-muted/30 flex items-center border-b px-6 py-3 text-sm font-medium">
        <div className="flex-1">Name</div>
        <div className="w-32 text-center">Modified</div>
        <div className="w-24 text-center">Size</div>
        <div className="w-20"></div>
      </div>

      {files.map((file) => (
        <div
          key={file.id}
          className="hover:bg-accent/30 group border-border/50 flex cursor-pointer items-center border-b px-6 py-4 transition-colors last:border-b-0"
          onClick={() =>
            file.type === "folder"
              ? onFolderClick(file.name)
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
            <p className="text-muted-foreground text-sm">{file.modified}</p>
          </div>

          {/* Size column */}
          <div className="w-24 text-center">
            <p className="text-muted-foreground text-sm">
              {file.type === "folder" ? "—" : file.size ?? "—"}
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
                      onDeleteFile(file.id);
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
  );
}
