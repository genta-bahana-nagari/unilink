"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { api } from "@/lib/mock-api";
import { User } from "@/types/user";

export default function AdminOrganizersPage() {
  const [organizers, setOrganizers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getUsers().then((users) => {
      setOrganizers(users.filter((u) => u.role === "ORGANIZER"));
      setIsLoading(false);
    });
  }, []);

  const filtered = organizers.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusUpdate = async (id: string, status: "ACTIVE" | "INACTIVE") => {
    const updated = await api.updateUser(id, { status });
    if (updated) {
      setOrganizers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    }
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Organizers</h1>
        <p className="text-muted-foreground mt-1">Manage organizer accounts</p>
      </div>

      <div className="relative max-w-md">
        <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search organizers..."
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
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3">User</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3 hidden sm:table-cell">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 sm:px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-muted">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar fallback={user.name} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <Badge variant={user.status === "ACTIVE" ? "success" : "warning"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {user.status !== "ACTIVE" && (
                        <Button variant="ghost" size="sm" onClick={() => handleStatusUpdate(user.id, "ACTIVE")}>
                          <FiCheckCircle size={14} className="text-success" />
                        </Button>
                      )}
                      {user.status === "ACTIVE" && (
                        <Button variant="ghost" size="sm" onClick={() => handleStatusUpdate(user.id, "INACTIVE")}>
                          <FiXCircle size={14} className="text-danger" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                    No organizers found
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