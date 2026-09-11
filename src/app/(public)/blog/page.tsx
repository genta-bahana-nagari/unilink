"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FiCalendar, FiArrowRight, FiBookOpen, FiTag } from "react-icons/fi";
import { cn } from "@/lib/utils";

const POSTS = [
  {
    id: "1",
    title: "The Future of Research Recruitment",
    excerpt:
      "How AI and machine learning are transforming the way researchers find participants for their studies.",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Research",
    featured: true,
  },
  {
    id: "2",
    title: "Building Inclusive Research Communities",
    excerpt:
      "Strategies for creating diverse and representative participant pools in academic research.",
    author: "Marcus Johnson",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Community",
  },
  {
    id: "3",
    title: "Best Practices for Event Management",
    excerpt:
      "Tips for organizing successful academic and professional events with better engagement.",
    author: "Emily Rodriguez",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Events",
  },
  {
    id: "4",
    title: "The Psychology of Participant Engagement",
    excerpt:
      "Understanding what motivates people to participate in research studies and events.",
    author: "Dr. James Park",
    date: "2023-12-28",
    readTime: "6 min read",
    category: "Research",
  },
  {
    id: "5",
    title: "Streamlining Research Ethics Approval",
    excerpt:
      "Navigating the IRB process with better documentation and participant communication.",
    author: "Lisa Thompson",
    date: "2023-12-20",
    readTime: "8 min read",
    category: "Research",
  },
  {
    id: "6",
    title: "Event Platforms: Trends to Watch",
    excerpt:
      "Emerging technologies shaping the future of academic and professional events.",
    author: "David Kim",
    date: "2023-12-15",
    readTime: "5 min read",
    category: "Events",
  },
];

const CATEGORIES = ["All", "Research", "Events", "Community", "Guides"];

export default function BlogPage() {
  const featuredPost = POSTS.find((p) => p.featured);
  const regularPosts = POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            <FiBookOpen className="mr-1.5 h-4 w-4" />
            Fivo Blog
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Insights &amp; Stories
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore our latest articles on research, events, and community
            building.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant={cat === "All" ? "default" : "outline"}
                className="cursor-pointer"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-4 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto">
            <Card
              className={cn(
                "overflow-hidden",
                "border-border bg-card",
                "hover:shadow-lg transition-all duration-300",
                "group cursor-pointer",
              )}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-[16/9] md:aspect-auto bg-muted flex items-center justify-center p-6 md:min-h-[240px]">
                  <div className="text-center">
                    <FiBookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <Badge>{featuredPost.category}</Badge>
                  </div>
                </div>
                <div className="p-5 sm:p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Featured
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-1 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-3">
                      <Avatar
                        fallback={featuredPost.author.charAt(0)}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {featuredPost.author}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3" />
                            {new Date(featuredPost.date).toLocaleDateString()}
                          </span>
                          <span className="hidden sm:inline">
                            {featuredPost.readTime}
                          </span>
                        </p>
                      </div>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="px-4 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className={cn(
                  "overflow-hidden",
                  "border-border bg-card",
                  "hover:shadow-lg transition-all duration-300",
                  "hover:border-primary/50 dark:hover:border-primary/50",
                  "group cursor-pointer",
                  "flex flex-col",
                )}
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <FiBookOpen className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar
                        fallback={post.author.charAt(0)}
                        size="sm"
                        className="w-6 h-6"
                      />
                      <span className="text-xs text-muted-foreground">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FiCalendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Load More
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 py-12 sm:py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <FiTag className="w-8 h-8 mx-auto text-primary mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
            Subscribe to our newsletter for the latest insights, updates, and
            stories from the research community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 px-4 rounded-md border border-border bg-background text-sm"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
