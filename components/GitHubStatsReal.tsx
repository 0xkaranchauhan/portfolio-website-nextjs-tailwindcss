"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Star,
  Users,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  getGitHubStats,
  getLanguageStats,
  getGitHubContributionGraphUrl,
} from "@/lib/github";
import ContributionGraph from "./ContributionGraph";

export default function GitHubStatsReal() {
  const [stats, setStats] = useState({
    totalStars: 0,
    totalRepos: 0,
    totalFollowers: 0,
  });
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // null means last 12 months
  const [contributionData, setContributionData] = useState<any>(null);
  const [contributionLoading, setContributionLoading] = useState(false);
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const [visibleStatsCount, setVisibleStatsCount] = useState(4);
  const sectionRef = useRef<HTMLElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - 1 - i); // 2025, 2024, 2023, 2022

  useEffect(() => {
    // Set initial count based on screen width for stat cards
    const updateVisibleCount = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setVisibleStatsCount(6); // Show all on tablet and desktop
      } else {
        setVisibleStatsCount(2); // Show only 4 on mobile
      }
    };

    // Initial call
    updateVisibleCount();

    // Add resize listener
    window.addEventListener("resize", updateVisibleCount);

    // Cleanup
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [githubStats, languageStats] = await Promise.all([
          getGitHubStats(),
          getLanguageStats(),
        ]);

        setStats({
          totalStars: githubStats.totalStars,
          totalRepos: githubStats.totalRepos,
          totalFollowers: githubStats.totalFollowers,
        });

        setLanguages(languageStats);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchContributions() {
      setContributionLoading(true);
      try {
        const timestamp = Date.now();
        const url = selectedYear
          ? `/api/github-contributions?year=${selectedYear}&t=${timestamp}`
          : `/api/github-contributions?t=${timestamp}`; // No year param = last 12 months

        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setContributionData(data);
        } else {
          console.error(
            "API response not OK:",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setContributionLoading(false);
      }
    }

    fetchContributions();
  }, [selectedYear]);

  const statCards = [
    {
      icon: GitBranch,
      label: "Contributions",
      value: contributionLoading
        ? "..."
        : contributionData?.totalContributions?.toString() || "0",
      color: "text-blue-600",
    },
    {
      icon: Star,
      label: "Current Streak",
      value: contributionLoading
        ? "..."
        : contributionData?.currentStreak?.toString() || "0",
      color: "text-orange-600",
    },
    {
      icon: Star,
      label: "Longest Streak",
      value: contributionLoading
        ? "..."
        : contributionData?.longestStreak?.toString() || "0",
      color: "text-red-600",
    },
    {
      icon: Users,
      label: "Followers",
      value: loading ? "..." : stats.totalFollowers.toString(),
      color: "text-purple-600",
    },
    {
      icon: GitBranch,
      label: "Repositories",
      value: loading ? "..." : stats.totalRepos.toString(),
      color: "text-green-600",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: loading ? "..." : stats.totalStars.toString(),
      color: "text-yellow-600",
    },
  ];

  const languageColors: { [key: string]: string } = {
    TypeScript: "bg-blue-600",
    JavaScript: "bg-yellow-500",
    Solidity: "bg-gray-600",
    Python: "bg-green-600",
    Rust: "bg-orange-600",
    Go: "bg-cyan-600",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="py-12 sm:py-16 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            GitHub Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time data from GitHub showing contributions and activity
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {(isStatsExpanded
            ? statCards
            : statCards.slice(0, visibleStatsCount)
          ).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="transition-all duration-300 border-primary/10 hover:border-primary/50 bg-card">
                <CardContent className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${
                        stat.color === "text-blue-600"
                          ? "from-blue-500/20 to-blue-600/20"
                          : stat.color === "text-orange-600"
                            ? "from-orange-500/20 to-orange-600/20"
                            : stat.color === "text-red-600"
                              ? "from-red-500/20 to-red-600/20"
                              : stat.color === "text-purple-600"
                                ? "from-purple-500/20 to-purple-600/20"
                                : stat.color === "text-green-600"
                                  ? "from-green-500/20 to-green-600/20"
                                  : "from-yellow-500/20 to-yellow-600/20"
                      }`}
                    >
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                      {stat.value === "..." ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        stat.value
                      )}
                    </span>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight font-medium">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {statCards.length > visibleStatsCount && (
          <div className="mt-2 mb-4 flex justify-center md:hidden">
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                if (isStatsExpanded) {
                  setIsStatsExpanded(false);
                  // Scroll back to section when clicking Show Less
                  sectionRef.current?.scrollIntoView({ behavior: "smooth" });
                } else {
                  setIsStatsExpanded(true);
                }
              }}
              className="group hover:bg-primary/10 cursor-pointer"
            >
              {isStatsExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                </>
              ) : (
                <>
                  Show More
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </>
              )}
            </Button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <Card className="transition-all duration-300 border-primary/10 hover:border-primary/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Language Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              {loading ? (
                <div className="flex items-center justify-center h-16">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(languages).map(([lang, percent]) => (
                    <div key={lang}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{lang}</span>
                        <span className="text-sm text-muted-foreground">
                          {percent}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`${languageColors[lang] || "bg-gray-500"} h-2 rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-primary/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <CardTitle className="text-lg font-semibold">
                  Contribution Graph
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={selectedYear === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(null)}
                    className="text-xs font-medium cursor-pointer"
                  >
                    Last Year
                  </Button>
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedYear(year)}
                      className="text-xs font-medium cursor-pointer"
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {contributionLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : contributionData ? (
                <ContributionGraph
                  weeks={contributionData.weeks}
                  totalContributions={contributionData.totalContributions}
                />
              ) : (
                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 overflow-x-auto">
                  <img
                    src={getGitHubContributionGraphUrl("0xkaranchauhan")}
                    alt="GitHub Contribution Graph"
                    className="w-full h-auto min-w-[280px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="transition-all duration-300 border-border/50 hover:border-primary/50 h-full bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-primary" />
                  Recent Commits
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                {contributionLoading ? (
                  <div className="flex items-center justify-center h-24">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : contributionData?.recentCommits?.length > 0 ? (
                  <div className="space-y-2.5">
                    {contributionData.recentCommits
                      .slice(0, 5)
                      .map((repo: any, idx: number) => (
                        <div
                          key={idx}
                          className="border-l-2 border-primary/20 pl-3"
                        >
                          <a
                            href={repo.repository.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                          >
                            {repo.repository.name}
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">
                            {repo.contributions.nodes[0]?.commitCount || 0}{" "}
                            commits
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No recent commits
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="transition-all duration-300 border-border/50 hover:border-primary/50 h-full bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  Top Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                {contributionLoading ? (
                  <div className="flex items-center justify-center h-24">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : contributionData?.topRepositories?.length > 0 ? (
                  <div className="space-y-2.5">
                    {contributionData.topRepositories
                      .slice(0, 5)
                      .map((repo: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2"
                        >
                          <div className="flex-1 min-w-0">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold hover:text-primary transition-colors truncate block hover:underline cursor-pointer"
                            >
                              {repo.name}
                            </a>
                            <p className="text-xs text-muted-foreground/80 truncate">
                              {repo.description || "No description"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {repo.stargazerCount}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No repositories found
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
