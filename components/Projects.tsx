"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Projects() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial count based on screen width - only show first row
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3); // Desktop: 3 cards (one row)
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2); // Tablet: 2 cards (one row)
      } else {
        setVisibleCount(1); // Mobile: 1 card (one row)
      }
    };

    // Initial call
    updateVisibleCount();

    // Add resize listener
    window.addEventListener("resize", updateVisibleCount);

    // Cleanup
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);
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
    <section ref={sectionRef} id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 sm:mb-6 text-center sm:text-left"
        >
          <div className="max-w-2xl mx-auto sm:mx-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Innovative blockchain solutions and decentralized applications
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(isExpanded ? projects : projects.slice(0, visibleCount)).map(
              (project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col transition-all duration-300 border-border/50 hover:border-primary/50 bg-card">
                    <CardHeader className="pb-1 sm:pb-3 pt-3 sm:pt-5 px-4 sm:px-6">
                      <CardTitle className="text-base sm:text-xl leading-tight">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col px-4 pb-3 sm:px-6 sm:py-5">
                      <p className="text-muted-foreground mb-3 sm:mb-4 flex-1 text-sm sm:text-base leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-3 sm:mb-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-bold text-xs sm:text-sm">
                              {value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[11px] sm:text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2 sm:pt-3">
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
                        <Button
                          size="sm"
                          className="flex-1 cursor-pointer"
                          asChild
                        >
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
              ),
            )}
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex justify-center">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              if (isExpanded) {
                setIsExpanded(false);
                // Scroll back to section when clicking Show Less
                sectionRef.current?.scrollIntoView({ behavior: "smooth" });
              } else {
                setIsExpanded(true);
              }
            }}
            className="group hover:bg-primary/10 cursor-pointer"
          >
            {isExpanded ? (
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
      </div>
    </section>
  );
}
