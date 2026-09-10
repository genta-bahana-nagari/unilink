"use client";

import { useResearch } from "@/hooks/use-research";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FiUser, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ResearchPage() {
  const { research, isLoading, error } = useResearch();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-background">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Research Opportunities</h1>
          <p className="text-muted-foreground">
            Join research studies that align with your expertise
          </p>
        </div>

        <div className="mb-6 flex gap-4 max-w-md">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search research..." 
              className={cn(
                "h-9",
                "w-32 lg:w-40",
                "pl-8 pr-3",
                "rounded-full",
                "text-sm",
                "text-foreground",
                "placeholder:text-neutral-400",

                "bg-neutral-100/80",
                "dark:bg-neutral-900/80",

                "border border-transparent",
                "focus:border-neutral-300",
                "dark:focus:border-neutral-700",

                "focus:bg-white",
                "dark:focus:bg-neutral-900",

                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-black/5",
                "dark:focus:ring-white/10",

                "transition-all duration-200",

                "focus:w-40 lg:focus:w-52",
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {research.map((r) => (
            <Card 
              key={r.id} 
              hover 
              className={cn(
                "overflow-hidden",
                "border-border",
                "dark:border-border",
                "bg-card",
                "dark:bg-card",
                "transition-all duration-300",
                "hover:shadow-lg",
                "hover:border-primary/50",
                "dark:hover:border-primary/50"
              )}
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar fallback={r.title.charAt(0)} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{r.title}</h3>
                    <Badge
                      variant={
                        r.status === "PUBLISHED" ? "success" : 
                        r.status === "PENDING" ? "warning" : "default"
                      }
                    >
                      {r.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {r.description.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <FiUser size={14} /> {r.researcher}
                  </span>
                  <span>
                    {r.currentParticipants}/{r.requiredParticipants}
                    participants
                  </span>
                </div>
                <Link href={`/research/${r.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        {research.length === 0 && (
          <div className="text-center py-12">
            <FiUser size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No research opportunities found
            </h3>
            <p className="text-muted-foreground">Check back later for new studies</p>
          </div>
        )}
      </div>
    </div>
  );
}
