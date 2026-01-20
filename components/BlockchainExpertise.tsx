"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Blocks,
  Wallet,
  Shield,
  Zap,
  Network,
  Code,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function BlockchainExpertise() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const expertise = [
    {
      icon: Blocks,
      title: "Smart Contract Development",
      description:
        "Expert in Solidity, Rust, and Move for building secure and efficient smart contracts",
      tags: ["Solidity", "Rust", "Move", "Vyper"],
      proficiency: 95,
      projects: 12,
    },
    {
      icon: Network,
      title: "DeFi Protocols",
      description:
        "Designed and deployed DeFi protocols including DEXs, lending platforms, and yield farms",
      tags: ["Uniswap", "Aave", "Compound", "AMM"],
      proficiency: 90,
      projects: 8,
    },
    {
      icon: Wallet,
      title: "Web3 Integration",
      description:
        "Building seamless Web3 experiences with wallet connections and blockchain interactions",
      tags: ["ethers.js", "web3.js", "wagmi", "RainbowKit"],
      proficiency: 92,
      projects: 15,
    },
    {
      icon: Shield,
      title: "Security & Auditing",
      description:
        "Conducting smart contract audits and implementing best security practices",
      tags: ["OpenZeppelin", "Slither", "Mythril", "Hardhat"],
      proficiency: 88,
      projects: 10,
    },
    {
      icon: Zap,
      title: "Layer 2 Solutions",
      description: "Experience with scaling solutions and rollup technologies",
      tags: ["Polygon", "Arbitrum", "Optimism", "zkSync"],
      proficiency: 85,
      projects: 6,
    },
    {
      icon: Code,
      title: "NFT & Token Standards",
      description:
        "Implementing ERC standards and creating innovative token mechanisms",
      tags: ["ERC-20", "ERC-721", "ERC-1155", "ERC-4626"],
      proficiency: 93,
      projects: 11,
    },
  ];

  return (
    <section
      id="blockchain"
      className="py-6 sm:py-8 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
            Blockchain Expertise
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            Deep expertise in blockchain technologies and decentralized systems
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/50 hover:bg-primary/5 overflow-hidden relative group bg-card">
                <CardHeader className="pb-1.5 sm:pb-2 pt-3 sm:pt-4 px-3 sm:px-4 relative z-10">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-muted-foreground">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="font-semibold">{item.projects}</span>
                      <span className="hidden sm:inline">projects</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-base md:text-lg leading-tight">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-2.5 sm:pb-3 px-3 sm:px-4 relative z-10">
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Proficiency bar */}
                  <div className="mb-2 sm:mb-3 w-full">
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground">
                        Proficiency
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-primary">
                        {item.proficiency}%
                      </span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden w-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full will-change-[width]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0 sm:py-0.5 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
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
