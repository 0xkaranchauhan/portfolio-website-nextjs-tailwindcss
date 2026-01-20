"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tech Lead Portfolio. All rights
            reserved.
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>using Next.js & shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
