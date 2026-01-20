"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Skills() {
  const skillCategories = {
    blockchain: [
      { name: "Solidity", level: 95 },
      { name: "Python", level: 85 },
      { name: "Ethers.js", level: 92 },
      { name: "web3.js", level: 90 },
      { name: "Chainlink", level: 88 },
      { name: "ERC20/ERC721/ERC1155", level: 93 },
    ],
    frontend: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 93 },
      { name: "Vue.js", level: 85 },
      { name: "TailwindCSS", level: 92 },
      { name: "HTML/CSS", level: 90 },
      { name: "Bootstrap/SCSS", level: 88 },
    ],
    backend: [
      { name: "Node.js", level: 95 },
      { name: "Express.js", level: 93 },
      { name: "MongoDB", level: 88 },
      { name: "Firebase", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "REST APIs", level: 92 },
    ],
    devops: [
      { name: "AWS (EC2, IAM, S3)", level: 85 },
      { name: "CodeDeploy", level: 82 },
      { name: "CodePipeline", level: 82 },
      { name: "Secrets Manager", level: 80 },
      { name: "Load Balancing", level: 78 },
      { name: "GitHub", level: 90 },
    ],
  };

  const tools = [
    "Postman",
    "VS Code",
    "GitHub",
    "Hardhat",
    "Foundry",
    "Metamask",
    "Truffle",
    "Remix",
    "Git",
    "AWS",
    "MongoDB",
    "Firebase",
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technical expertise across the full stack and
            blockchain ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="blockchain" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto">
              <TabsTrigger value="blockchain" className="text-xs sm:text-sm">
                Blockchain
              </TabsTrigger>
              <TabsTrigger value="frontend" className="text-xs sm:text-sm">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" className="text-xs sm:text-sm">
                Backend
              </TabsTrigger>
              <TabsTrigger value="devops" className="text-xs sm:text-sm">
                DevOps
              </TabsTrigger>
            </TabsList>

            {Object.entries(skillCategories).map(([category, skills]) => (
              <TabsContent key={category} value={category}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {skills.map((skill, index) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="bg-primary h-2 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="border-border/50 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:bg-primary/5">
            <CardHeader>
              <CardTitle>Tools & Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
