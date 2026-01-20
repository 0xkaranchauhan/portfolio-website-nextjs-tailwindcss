"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, GitCommit, Star, Users } from "lucide-react";

export default function GitHubStats() {
  const stats = [
    {
      icon: GitCommit,
      label: "Total Commits",
      value: "2,500+",
      color: "text-blue-600",
    },
    {
      icon: Star,
      label: "Stars Earned",
      value: "450+",
      color: "text-yellow-600",
    },
    {
      icon: GitBranch,
      label: "Repositories",
      value: "80+",
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Contributors",
      value: "30+",
      color: "text-purple-600",
    },
  ];

  return (
    <section id="github" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Active contributor to open-source projects and blockchain ecosystems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Contribution Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-lg flex items-center justify-center">
                <img
                  src="https://ghchart.rshah.org/kchizz"
                  alt="GitHub Contribution Graph"
                  className="w-full h-auto opacity-90"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<p class="text-muted-foreground">Connect your GitHub to display contribution graph</p>';
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { lang: "TypeScript", percent: 40, color: "bg-blue-600" },
                  { lang: "Solidity", percent: 25, color: "bg-gray-600" },
                  { lang: "Rust", percent: 20, color: "bg-orange-600" },
                  { lang: "Go", percent: 15, color: "bg-cyan-600" },
                ].map((item) => (
                  <div key={item.lang}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{item.lang}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.percent}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`${item.color} h-2 rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
