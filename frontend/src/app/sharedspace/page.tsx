"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FileText,
  FileBox,
  Image as ImageIcon,
  Archive,
  BarChart2,
  Folder,
  Bell,
  MessageSquare,
  Search,
  Grid,
  File,
  Home,
  Plus,
  CalendarDays,
  User,
} from "lucide-react";
import type { SharedFileItem, SharedFileType } from "@/lib/sharedspace-data";
import { sharedFiles as initialSharedFiles, sharedFolders } from "@/lib/sharedspace-data";

type FilterType = "all" | SharedFileType;

const filterOptions: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "doc", label: "Docs" },
  { key: "pdf", label: "PDFs" },
  { key: "image", label: "Images" },
  { key: "zip", label: "ZIPs" },
  { key: "sheet", label: "Sheets" },
];

const typeStyles: Record<
  SharedFileType,
  { bg: string; text: string; icon: React.ReactNode; label: string }
> = {
  doc: { bg: "#F1F1F1", text: "#111111", icon: <FileText size={20} />, label: "Document" },
  pdf: { bg: "#F3F3F3", text: "#111111", icon: <FileBox size={20} />, label: "PDF" },
  zip: { bg: "#EFEFEF", text: "#111111", icon: <Archive size={20} />, label: "ZIP" },
  image: { bg: "#F5F5F5", text: "#111111", icon: <ImageIcon size={20} />, label: "Image" },
  sheet: { bg: "#F0F0F0", text: "#111111", icon: <BarChart2 size={20} />, label: "Sheet" },
  other: { bg: "#F4F4F4", text: "#111111", icon: <Folder size={20} />, label: "File" },
};

function getSectionHeading(filter: FilterType, folderName: string | null) {
  if (filter === "doc") return "Docs";
  if (filter === "pdf") return "PDFs";
  if (filter === "image") return "Images";
  if (filter === "zip") return "ZIP Files";
  if (filter === "sheet") return "Sheets";
  if (folderName) return folderName;
  return "All Files";
}

type CompactFileCardProps = {
  file: SharedFileItem;
  onRemove: (id: string) => void;
};

function CompactFileCard({ file, onRemove }: CompactFileCardProps) {
  const typeStyle = typeStyles[file.type];

  return (
    <div className="rounded-[22px] border border-[#E7E7E7] bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-lg"
            style={{ backgroundColor: typeStyle.bg }}
          >
            {typeStyle.icon}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-[#111111] sm:text-[15px]">
              {file.name}
            </p>
            <p className="mt-1 text-[11px] text-[#6F6F6F] sm:text-[12px]">
              {file.extension} • {file.size} • {file.folder}
            </p>
          </div>
        </div>

        {file.pinned ? (
          <span className="shrink-0 rounded-full bg-[#F1F1F1] px-2.5 py-1 text-[10px] font-semibold text-[#111111] sm:text-[11px]">
            Pinned
          </span>
        ) : null}
      </div>

      <p className="mt-3 line-clamp-2 text-[12px] leading-6 text-[#5F5F5F] sm:text-[13px]">
        {file.description}
      </p>

      <div className="mt-3 flex items-center justify-between text-[11px] text-[#777777] sm:text-[12px]">
        <span>{file.sharedBy}</span>
        <span>{file.sharedAt}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/sharedspace/${file.id}`}
          className="flex-1 rounded-full bg-[#111111] px-4 py-3 text-center text-[14px] font-semibold text-white"
        >
          Open
        </Link>
        <button
          onClick={() => onRemove(file.id)}
          className="rounded-full border border-[#DFDFDF] bg-white px-4 py-3 text-[14px] font-semibold text-[#111111] sm:min-w-[120px]"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

type FolderRowProps = {
  name: string;
  count: number;
  updatedAt: string;
  color: string;
  active: boolean;
  onClick: () => void;
};

function FolderRow({
  name,
  count,
  updatedAt,
  color,
  active,
  onClick,
}: FolderRowProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[20px] border px-4 py-4 text-left shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition sm:rounded-[22px] ${active ? "border-[#111111] bg-[#F6F6F6]" : "border-[#E7E7E7] bg-white"
        }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] text-base sm:h-11 sm:w-11 sm:rounded-[18px] sm:text-lg"
          style={{ backgroundColor: color }}
        >
          <Folder size={20} className="text-[#111111]" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-[#111111] sm:text-[15px]">
            {name}
          </p>
          <p className="mt-1 text-[11px] text-[#707070] sm:text-[12px]">
            {count} files • {updatedAt}
          </p>
        </div>
      </div>

      <div className="shrink-0 rounded-full bg-[#F3F3F3] px-3 py-1 text-[11px] font-semibold text-[#111111] sm:text-[12px]">
        Open
      </div>
    </button>
  );
}

export default function SharedSpacePage() {
  const [files, setFiles] = useState(initialSharedFiles);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchText, setSearchText] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [foldersExpanded, setFoldersExpanded] = useState(true);
  const [pinnedExpanded, setPinnedExpanded] = useState(true);

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    if (filter !== "all") {
      setSelectedFolderId(null);
    }
  };

  const filteredFiles = useMemo(() => {
    let data = [...files];

    if (activeFilter !== "all") {
      data = data.filter((file) => file.type === activeFilter);
    } else if (selectedFolderId) {
      data = data.filter((file) => file.folderId === selectedFolderId);
    }

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      data = data.filter((file) => {
        return (
          file.name.toLowerCase().includes(q) ||
          file.sharedBy.toLowerCase().includes(q) ||
          file.folder.toLowerCase().includes(q) ||
          file.project.toLowerCase().includes(q) ||
          file.extension.toLowerCase().includes(q)
        );
      });
    }

    return data;
  }, [files, activeFilter, searchText, selectedFolderId]);

  const pinnedFiles = files.filter((file) => file.pinned).slice(0, 2);
  const activeFolderName =
    sharedFolders.find((folder) => folder.id === selectedFolderId)?.name ?? null;

  const sectionHeading = getSectionHeading(activeFilter, activeFolderName);

  return (
    <div className="relative h-full overflow-hidden bg-[#FAFAFA]">
      <div className="mx-auto h-full w-full max-w-[480px] overflow-y-auto px-4 pt-4 pb-[180px]">
        <header>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 pr-2">
              <h1 className="text-[32px] font-bold leading-[1.5] tracking-[-0.04em] text-[#111111] sm:text-[32px]">
                Shared Space
              </h1>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                className="flex h-11 w-11 items-center justify-center rounded-[17px] border border-[#E7E7E7] bg-white text-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] sm:h-12 sm:w-12 sm:rounded-[18px] sm:text-lg"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-[#111111]" />
              </button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-[17px] border border-[#E7E7E7] bg-white text-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] sm:h-12 sm:w-12 sm:rounded-[18px] sm:text-lg"
                aria-label="Quick scan"
              >
                <Grid size={20} className="text-[#111111]" />
              </button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-[17px] border border-[#E7E7E7] bg-white text-base shadow-[0_4px_16px_rgba(0,0,0,0.04)] sm:h-12 sm:w-12 sm:rounded-[18px] sm:text-lg"
                aria-label="Messages"
              >
                <MessageSquare size={20} className="text-[#111111]" />
              </button>
            </div>
          </div>

          <p
            className="mt-4 text-[14px] leading-7 text-[#666666] sm:text-[15px] sm:leading-8"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            View, organize and open all shared docs, PDFs, images, ZIPs and sheets from
            your collaboration workspace.
          </p>
        </header>

        <div className="mt-4 rounded-[24px] border border-[#E6EAF2] bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:mt-5 sm:rounded-[28px] sm:py-4">
          <div className="flex items-center gap-3">
            <div className="text-lg text-[#111111] sm:text-xl"><Search size={20} /></div>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search files, folders, people..."
              className="w-full bg-transparent text-[15px] text-[#111111] outline-none placeholder:text-[#9A9A9A] sm:text-[16px]"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filterOptions.map((item) => {
            const active = activeFilter === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleFilterClick(item.key)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-[14px] font-semibold transition ${active
                    ? "bg-[#111111] text-white"
                    : "border border-[#E1E1E1] bg-white text-[#4A4A4A]"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-8">
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setFoldersExpanded((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <h2 className="text-[24px] font-bold tracking-[-0.04em] text-[#111111] sm:text-[28px]">
                    Folders
                  </h2>
                  <span className="text-[18px] text-[#111111]">
                    {foldersExpanded ? "▾" : "▸"}
                  </span>
                </button>

                {selectedFolderId && activeFilter === "all" ? (
                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className="text-[14px] font-semibold text-[#111111] sm:text-[15px]"
                  >
                    Clear folder
                  </button>
                ) : (
                  <span className="text-[12px] text-[#8A8A8A] sm:text-[13px]">
                    {sharedFolders.length} folders
                  </span>
                )}
              </div>

              {foldersExpanded ? (
                <div className="mt-4 space-y-3">
                  {sharedFolders.map((folder) => {
                    const liveCount = files.filter(
                      (file) => file.folderId === folder.id
                    ).length;

                    return (
                      <FolderRow
                        key={folder.id}
                        name={folder.name}
                        count={liveCount}
                        updatedAt={folder.updatedAt}
                        color={folder.color}
                        active={activeFilter === "all" && selectedFolderId === folder.id}
                        onClick={() => {
                          setSelectedFolderId(folder.id);
                          setActiveFilter("all");
                        }}
                      />
                    );
                  })}
                </div>
              ) : null}
            </section>

            <section>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPinnedExpanded((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <h2 className="text-[24px] font-bold tracking-[-0.04em] text-[#111111] sm:text-[28px]">
                    Pinned
                  </h2>
                  <span className="text-[18px] text-[#111111]">
                    {pinnedExpanded ? "▾" : "▸"}
                  </span>
                </button>

                <button className="text-[14px] font-semibold text-[#111111] sm:text-[15px]">
                  Manage
                </button>
              </div>

              {pinnedExpanded ? (
                <div className="mt-4 space-y-3">
                  {pinnedFiles.map((file) => (
                    <CompactFileCard
                      key={file.id}
                      file={file}
                      onRemove={handleRemoveFile}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          </div>

          <section className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-[24px] font-bold tracking-[-0.04em] text-[#111111] sm:text-[28px]">
                  {sectionHeading}
                </h2>
                <p className="mt-1 text-[12px] text-[#777777] sm:text-[13px]">
                  {activeFilter !== "all"
                    ? `Showing ${sectionHeading.toLowerCase()}`
                    : selectedFolderId
                      ? "Showing files inside this folder"
                      : "Showing all shared files"}
                </p>
              </div>

              <button
                onClick={() => {
                  setSearchText("");
                  setActiveFilter("all");
                  setSelectedFolderId(null);
                }}
                className="shrink-0 text-[14px] font-semibold text-[#111111] sm:text-[15px]"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {filteredFiles.map((file) => (
                <CompactFileCard
                  key={file.id}
                  file={file}
                  onRemove={handleRemoveFile}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-[104px] right-6 z-50 rounded-full bg-[#111111] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
      >
        Upload
      </button>

      <nav className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[480px] -translate-x-1/2 items-center justify-around border-t border-[#E7E7E7] bg-white px-3 py-3 shadow-[0_-4px_18px_rgba(0,0,0,0.03)]">
        <Link href="/home" className="flex flex-col items-center gap-1 text-[#6C6C6C]">
          <Home size={20} />
          <span className="text-[12px]">Home</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center gap-1 text-[#6C6C6C]">
          <Search size={20} />
          <span className="text-[12px]">Explore</span>
        </Link>
        <Link href="/create" className="flex flex-col items-center gap-1 text-[#6C6C6C]">
          <Plus size={20} />
          <span className="text-[12px]">Create</span>
        </Link>
        <Link href="/events" className="flex flex-col items-center gap-1 text-[#111111]">
          <CalendarDays size={20} />
          <span className="text-[12px] font-semibold">Events</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[#6C6C6C]">
          <User size={20} />
          <span className="text-[12px]">Profile</span>
        </Link>
      </nav>

      {showUploadModal ? (
        <div className="fixed inset-0 z-50 bg-black/30 px-4">
          <div className="mx-auto flex min-h-screen w-full max-w-[480px] items-end pb-4">
            <div className="mb-6 w-full rounded-[28px] border border-[#E7E7E7] bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.12)] sm:rounded-[30px] sm:p-6">
              <div className="mx-auto h-1.5 w-14 rounded-full bg-[#D7D7D7]" />

              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[22px] font-bold text-[#111111] sm:text-[24px]">
                    Upload files
                  </h3>
                  <p className="mt-1 text-[14px] leading-6 text-[#666666]">
                    Share docs, PDFs, ZIP files, images and sheets with your
                    collaborators.
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-full border border-[#E1E1E1] px-3 py-1.5 text-[13px] font-semibold text-[#111111]"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button className="rounded-[22px] border border-[#E7E7E7] bg-[#F7F7F7] p-4 text-left">
                  <div className="text-2xl"><File size={24} className="text-[#111111]" /></div>
                  <p className="mt-3 text-[15px] font-semibold text-[#111111]">
                    Choose files
                  </p>
                  <p className="mt-1 text-[12px] text-[#737373]">
                    DOC, PDF, ZIP, PNG, XLSX
                  </p>
                </button>

                <button className="rounded-[22px] border border-[#E7E7E7] bg-[#F7F7F7] p-4 text-left">
                  <div className="text-2xl"><Folder size={24} className="text-[#111111]" /></div>
                  <p className="mt-3 text-[15px] font-semibold text-[#111111]">
                    Select folder
                  </p>
                  <p className="mt-1 text-[12px] text-[#737373]">
                    Organize shared items
                  </p>
                </button>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="mt-5 w-full rounded-full bg-[#111111] px-5 py-4 text-[15px] font-semibold text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}