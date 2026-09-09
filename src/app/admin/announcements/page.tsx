"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FiSearch, FiPlus, FiEdit3, FiTrash2, FiEye } from "react-icons/fi";
import Link from "next/link";
import { api } from "@/lib/mock-api";
import { Announcement } from "@/types/announcement";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getAnnouncements().then((data) => {
      setAnnouncements(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    await api.deleteAnnouncement(id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">Manage platform announcements</p>
        </div>
        <Link href="/admin/announcements/create">
          <Button>
            <FiPlus size={16} className="mr-2" /> Create
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3">Title</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3 hidden sm:table-cell">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3 hidden md:table-cell">Created</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted">
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">{item.type}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <Badge variant={item.type === "IMPORTANT" ? "danger" : item.type === "UPDATE" ? "info" : "default"}>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <FiEye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FiEdit3 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                        <FiTrash2 size={14} className="text-danger" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No announcements found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}