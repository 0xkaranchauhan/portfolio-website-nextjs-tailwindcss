"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Warlands NFT",
      description:
        "A unique metaverse that combines MOBA and Battle Royale mechanics in a competitive format, where users strategically survive and conquer zones of the battlefield in 5v5 teams.",
      tags: ["Solidity", "Node.js", "NFT", "Battle Royale", "Gaming"],
      github: "https://github.com",
      demo: "https://warlands.io",
      stats: { type: "NFT", chain: "Ethereum", mode: "5v5" },
    },
    {
      title: "Undergroundwaifus TCG (Trading Card Game)",
      description:
        "This TCG is focused on a competitive side, with an easy player-driven economy: PVP (player vs. player) battles, and the player who wins takes it all.",
      tags: ["Solidity", "Binance", "NFT", "TCG", "PVP"],
      github: "https://github.com",
      demo: "https://undergroundwaifus.com",
      stats: { type: "TCG", chain: "Binance", mode: "PVP" },
    },
    {
      title: "Nakashi (THE NFT MANGA REVOLUTION)",
      description:
        "Nakashi is the first manga born 100% on the Ethereum blockchain that combines the digital and physical collectible world. Each Nakashi NFT represents a fully limited print edition of the manga, registered and certified through an ERC-721 token.",
      tags: ["Solidity", "Node.js", "Ethereum", "NFT", "ERC-721"],
      github: "https://github.com",
      demo: "https://nakashi.world",
      stats: { type: "Phygital", chain: "Ethereum", standard: "ERC-721" },
    },
    {
      title: "Undergroundwaifus (NFT Marketplace)",
      description:
        "Trade playing hard to get top cards with high levels or rarities that other users achieved playing hard in some seconds. Build and improve your deck with the help of the community ecosystem!",
      tags: ["Solidity", "Node.js", "NFT", "Marketplace", "Trading"],
      github: "https://github.com",
      demo: "https://marketplace.undergroundwaifus.com",
      stats: { type: "Marketplace", feature: "Trading", community: "Active" },
    },
    {
      title: "Hulu Clone",
      description:
        "Live API fetching with lazy loading. Built this project following along to learn React & Next.js fundamentals and best practices.",
      tags: ["React", "Next.js", "API", "Lazy Loading"],
      github: "https://github.com",
      demo: "https://hulu-clone-nextjs-tailwind-iota.vercel.app/",
      stats: { type: "Learning", tech: "React", framework: "Next.js" },
    },
  ];

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Innovative blockchain solutions and decentralized applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col transition-all duration-300 border-border/50 hover:border-primary/50 bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-sm">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 cursor-pointer" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
