"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { fadeInUp, fadeInLeft, staggerContainer } from "@/lib/animations";
import { getTextGradient } from "@/lib/colors";
import siteContent from "@/data/site-content.json";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial count based on screen width - only show first row
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(2); // Desktop: 2 cards (one row)
      } else if (window.innerWidth >= 640) {
        setVisibleCount(1); // Tablet: 1 card (one row)
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
  const experiences = [
    {
      title: "Tech Lead (Fullstack Blockchain)",
      company: "SwordField Technologies Pvt Ltd",
      period: "August 2025 - Present",
      description:
        "Spearheading the development of an advanced DeFi protocol featuring autonomous Uniswap V3 position management, enabling users to deposit USDC and earn optimized yields without manual liquidity provisioning. Orchestrating full-stack architecture spanning smart contracts, backend infrastructure, and modern web interfaces.",
      achievements: [
        "Promoted to technical leadership role, directing cross-functional team in building production-grade DeFi infrastructure",
        "Engineered automated position rebalancing system achieving 40% higher capital efficiency through dynamic fee tier optimization",
        "Architected scalable microservices architecture integrating Solidity smart contracts, Node.js backend, and Next.js frontend",
        "Established comprehensive CI/CD pipeline with 95% test coverage, reducing deployment time by 60%",
      ],
      tags: [
        "Solidity",
        "Node.js",
        "Next.js",
        "DeFi",
        "Uniswap V3",
        "Team Leadership",
      ],
    },
    {
      title: "Fullstack Blockchain Developer",
      company: "SwordField Technologies Pvt Ltd",
      period: "January 2023 - July 2025",
      description:
        "Architected and deployed multiple blockchain-based entertainment platforms, including Nakashi—a pioneering phygital comic ecosystem on Ethereum. Engineered robust smart contract infrastructure with enterprise-grade backend systems for secure digital asset ownership and distribution across multiple blockchain networks.",
      achievements: [
        "Launched Nakashi platform processing 10,000+ NFT transactions, implementing ERC-721 contracts with royalty mechanisms and Node.js microservices",
        "Developed Warlands NFT battle royale featuring on-chain randomness and dynamic pack minting, generating $500K+ in primary sales",
        "Built Underground Waifus free-to-play TCG on Binance Smart Chain, integrating Chainlink VRF for provably fair card distribution",
        "Delivered full-stack solutions with 99.9% uptime, handling 50,000+ daily active users across multiple blockchain games",
      ],
      tags: [
        "Solidity",
        "Node.js",
        "Ethereum",
        "NFT",
        "Chainlink VRF",
        "Binance",
      ],
    },
    {
      title: "Junior Blockchain Developer",
      company: "Digitlance Pvt Ltd",
      period: "January 2022 - December 2022",
      description:
        "Executed smart contract deployment and validation across diverse EVM-compatible blockchain networks. Developed proficiency in multi-chain development practices, security auditing, and comprehensive testing methodologies for production-ready decentralized applications.",
      achievements: [
        "Successfully deployed and audited 25+ smart contracts across Ethereum, Polygon, BSC, and Avalanche networks",
        "Implemented automated testing suites using Hardhat and Foundry, achieving 90%+ code coverage on critical contracts",
        "Conducted security assessments identifying and resolving 15+ vulnerabilities before mainnet deployment",
        "Collaborated on cross-chain bridge integration, facilitating seamless asset transfers between multiple blockchain ecosystems",
      ],
      tags: ["Solidity", "EVM", "Smart Contracts", "Testing"],
    },
    {
      title: "Junior Blockchain Engineer",
      company: "Nextazy Solutions Pvt Ltd",
      period: "August 2021 - December 2021",
      description:
        "Conducted comprehensive research and development for Cosmos SDK-based blockchain implementation. Engineered full-stack decentralized applications leveraging MERN stack architecture with scalable backend infrastructure. Represented company at international blockchain conferences, gaining exposure to cutting-edge Web3 innovations.",
      achievements: [
        "Researched and prototyped custom blockchain solution on Cosmos SDK, evaluating consensus mechanisms and validator economics",
        "Developed production-ready dApps using React.js, Node.js/Express.js, and MongoDB, serving 5,000+ concurrent users",
        "Built RESTful APIs and WebSocket services for real-time blockchain data synchronization with 99.5% uptime",
        "Attended Dubai Blockchain Expo 2021, networking with 100+ industry leaders and analyzing emerging DeFi protocols",
      ],
      tags: ["Cosmos Chain", "React.js", "Node.js", "Express.js", "MongoDB"],
    },
    {
      title: "Blockchain Research Intern",
      company: "Nextazy Solutions Pvt Ltd",
      period: "April 2021 - July 2021",
      description:
        "Conducted in-depth analysis of blockchain protocols, consensus mechanisms, and real-world enterprise use cases. Contributed to technical documentation and strategic research initiatives, establishing foundational expertise in distributed ledger technologies and cryptographic systems.",
      achievements: [
        "Analyzed 20+ blockchain protocols including Ethereum, Polkadot, and Solana, evaluating scalability, security, and decentralization trade-offs",
        "Co-authored technical whitepapers and research reports on DeFi protocols, contributing to client proposals worth $200K+",
        "Researched Layer 2 scaling solutions and zero-knowledge proof systems, presenting findings to senior engineering team",
        "Developed comprehensive technical documentation and protocol comparison matrices used across multiple client engagements",
      ],
      tags: ["Blockchain Research", "Technical Writing", "Protocol Analysis"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-12 sm:py-16 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4`}>
            {siteContent.experience.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            {siteContent.experience.subtitle}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3 max-w-6xl mx-auto">
          {(isExpanded ? experiences : experiences.slice(0, visibleCount)).map(
            (exp, index) => {
              return (
                <div key={exp.title}>
                  <Card className="group transition-all duration-300 border-border/50 hover:border-primary/50 bg-card">
                    <CardContent className="pt-2 sm:pt-3 pb-2 sm:pb-3 px-3 sm:px-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-bold mb-1">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="line-clamp-1">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-0 sm:ml-4">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="mb-1.5 sm:mb-2.5">
                        <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">
                          Key Achievements:
                        </h4>
                        <ul className="list-disc list-inside space-y-0.5 text-xs sm:text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {exp.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[11px] sm:text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            },
          )}
        </div>

        <div className="mt-3 sm:mt-6 flex justify-center">
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
