"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card } from "~/components/ui/card"
import {
  Search,
  Upload,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  MoreVertical,
  Grid3X3,
  List,
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
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

interface FileItem {
  id: string
  name: string
  type: "folder" | "document" | "image" | "video" | "audio"
  size?: string
  modified: string
  starred?: boolean
  url?: string
}

const mockData: FileItem[] = [
  { id: "1", name: "Documents", type: "folder", modified: "2 days ago" },
  { id: "2", name: "Photos", type: "folder", modified: "1 week ago", starred: true },
  { id: "3", name: "Videos", type: "folder", modified: "3 days ago" },
  { id: "4", name: "Project Proposal.pdf", type: "document", size: "2.4 MB", modified: "1 hour ago", url: "#" },
  {
    id: "5",
    name: "Vacation Photo.jpg",
    type: "image",
    size: "5.2 MB",
    modified: "2 days ago",
    starred: true,
    url: "#",
  },
  { id: "6", name: "Meeting Recording.mp4", type: "video", size: "45.8 MB", modified: "1 day ago", url: "#" },
  { id: "7", name: "Presentation.pptx", type: "document", size: "8.1 MB", modified: "3 hours ago", url: "#" },
  { id: "8", name: "Background Music.mp3", type: "audio", size: "3.7 MB", modified: "5 days ago", url: "#" },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return <Folder className="w-8 h-8 text-primary" />
    case "document":
      return <FileText className="w-8 h-8 text-blue-400" />
    case "image":
      return <ImageIcon className="w-8 h-8 text-green-400" />
    case "video":
      return <Video className="w-8 h-8 text-red-400" />
    case "audio":
      return <Music className="w-8 h-8 text-purple-400" />
    default:
      return <FileText className="w-8 h-8 text-muted-foreground" />
  }
}

export default function DriveClone() {
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>(["My Drive"])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [files, setFiles] = useState(mockData)

  console.log("[v0] Current view mode:", viewMode)
  console.log("[v0] Files count:", files.length)

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleFolderClick = (folderName: string) => {
    if (folderName === "Documents") {
      setFiles([
        { id: "d1", name: "Resume.pdf", type: "document", size: "1.2 MB", modified: "1 week ago", url: "#" },
        { id: "d2", name: "Cover Letter.docx", type: "document", size: "0.8 MB", modified: "2 weeks ago", url: "#" },
        {
          id: "d3",
          name: "Budget Spreadsheet.xlsx",
          type: "document",
          size: "2.1 MB",
          modified: "3 days ago",
          url: "#",
        },
      ])
      setBreadcrumbPath(["My Drive", "Documents"])
    } else if (folderName === "Photos") {
      setFiles([
        { id: "p1", name: "Summer Trip.jpg", type: "image", size: "4.2 MB", modified: "1 month ago", url: "#" },
        { id: "p2", name: "Family Portrait.png", type: "image", size: "6.8 MB", modified: "2 weeks ago", url: "#" },
        {
          id: "p3",
          name: "Sunset.jpg",
          type: "image",
          size: "3.1 MB",
          modified: "1 week ago",
          starred: true,
          url: "#",
        },
      ])
      setBreadcrumbPath(["My Drive", "Photos"])
    } else if (folderName === "Videos") {
      setFiles([
        { id: "v1", name: "Tutorial.mp4", type: "video", size: "125 MB", modified: "1 week ago", url: "#" },
        {
          id: "v2",
          name: "Presentation Recording.mov",
          type: "video",
          size: "89 MB",
          modified: "3 days ago",
          url: "#",
        },
      ])
      setBreadcrumbPath(["My Drive", "Videos"])
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    const newPath = breadcrumbPath.slice(0, index + 1)
    setBreadcrumbPath(newPath)

    if (newPath.length === 1) {
      // Back to root
      setFiles(mockData)
    }
    // Could add more navigation logic here for deeper folder structures
  }

  const handleBackToRoot = () => {
    setFiles(mockData)
    setBreadcrumbPath(["My Drive"])
  }

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">Drive</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search in Drive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-96 bg-input border-border"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                console.log("[v0] Switching to grid view")
                setViewMode("grid")
              }}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                console.log("[v0] Switching to list view")
                setViewMode("list")
              }}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleBackToRoot}
            >
              <Home className="w-4 h-4 mr-3" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Users className="w-4 h-4 mr-3" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Clock className="w-4 h-4 mr-3" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Star className="w-4 h-4 mr-3" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Trash2 className="w-4 h-4 mr-3" />
              Trash
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              {breadcrumbPath.map((path, index) => (
                <div key={index} className="flex items-center">
                  <Button
                    variant="ghost"
                    className="text-xl font-semibold text-foreground hover:text-primary p-0 h-auto"
                    onClick={() => handleBreadcrumbClick(index)}
                  >
                    {path}
                  </Button>
                  {index < breadcrumbPath.length - 1 && <ChevronRight className="w-5 h-5 text-muted-foreground mx-2" />}
                </div>
              ))}
            </div>
            {breadcrumbPath.length > 1 && (
              <Button variant="ghost" onClick={handleBackToRoot} className="text-primary hover:text-primary/80">
                ← Back to My Drive
              </Button>
            )}
          </div>

          {/* File Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <Card
                  key={file.id}
                  className="p-4 hover:bg-accent/50 transition-colors cursor-pointer group bg-card border-border"
                  onClick={() =>
                    file.type === "folder" ? handleFolderClick(file.name) : file.url && window.open(file.url, "_blank")
                  }
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      {getFileIcon(file.type)}
                      {file.starred && (
                        <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-card-foreground truncate w-full" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {file.size && `${file.size} • `}
                        {file.modified}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {console.log("[v0] Rendering list view with", filteredFiles.length, "files")}

              {/* List header */}
              <div className="flex items-center px-6 py-3 text-sm font-medium text-muted-foreground border-b border-border bg-muted/30">
                <div className="flex-1">Name</div>
                <div className="w-32 text-center">Modified</div>
                <div className="w-24 text-center">Size</div>
                <div className="w-20"></div> {/* Space for actions */}
              </div>

              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center px-6 py-4 hover:bg-accent/30 transition-colors cursor-pointer group border-b border-border/50 last:border-b-0"
                  onClick={() =>
                    file.type === "folder" ? handleFolderClick(file.name) : file.url && window.open(file.url, "_blank")
                  }
                >
                  {/* Icon and Name column */}
                  <div className="flex-1 flex items-center space-x-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      {getFileIcon(file.type)}
                      {file.starred && (
                        <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <p className="font-medium text-foreground truncate" title={file.name}>
                      {file.name}
                    </p>
                  </div>

                  {/* Modified column */}
                  <div className="w-32 text-center">
                    <p className="text-sm text-muted-foreground">{file.modified}</p>
                  </div>

                  {/* Size column */}
                  <div className="w-24 text-center">
                    <p className="text-sm text-muted-foreground">{file.type === "folder" ? "—" : file.size || "—"}</p>
                  </div>

                  {/* Actions column */}
                  <div className="w-20 flex items-center justify-end space-x-1">
                    {/* Direct Download and Delete Icons for Files */}
                    {file.type !== "folder" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (file.url) {
                              const link = document.createElement("a")
                              link.href = file.url
                              link.download = file.name
                              link.click()
                            }
                          }}
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
                              setFiles(files.filter((f) => f.id !== file.id))
                            }
                          }}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}

                    {/* More actions menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
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
            <div className="text-center py-12">
              <p className="text-muted-foreground">No files found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
