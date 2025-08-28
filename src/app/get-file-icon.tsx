import {
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  ChevronRight,
} from "lucide-react";

export const getFileIcon = (type: string) => {
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
