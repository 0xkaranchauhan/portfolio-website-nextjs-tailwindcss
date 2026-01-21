/**
 * 🎨 Out of This World Color System
 * Comprehensive color palette for dark and light modes
 */

export const colors = {
  // ===== Card Background Gradients (Subtle & Smooth) =====
  gradients: {
    cosmic:
      "from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10",
    aurora:
      "from-purple-500/10 via-cyan-500/10 to-green-500/10 dark:from-purple-400/10 dark:via-cyan-400/10 dark:to-green-400/10",
    sunset:
      "from-orange-500/10 via-pink-500/10 to-purple-500/10 dark:from-orange-400/10 dark:via-pink-400/10 dark:to-purple-400/10",
    ocean:
      "from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-400/10 dark:via-cyan-400/10 dark:to-teal-400/10",
    forest:
      "from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-400/10 dark:via-emerald-400/10 dark:to-teal-400/10",
    fire: "from-red-500/10 via-orange-500/10 to-yellow-500/10 dark:from-red-400/10 dark:via-orange-400/10 dark:to-yellow-400/10",
    twilight:
      "from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-pink-400/10",
    neon: "from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-400/10 dark:via-blue-400/10 dark:to-purple-400/10",
  },

  // ===== Text Gradients (Vibrant & Readable) =====
  textGradients: {
    cosmic:
      "from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400",
    aurora:
      "from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-400 dark:via-emerald-400 dark:to-cyan-400",
    sunset:
      "from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400",
    ocean:
      "from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400",
    primary:
      "from-primary via-purple-600 to-primary dark:from-primary dark:via-purple-400 dark:to-primary",
    electric:
      "from-cyan-600 via-blue-600 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400",
  },

  // ===== Icon Colors (Theme-aware & Soft) =====
  icons: {
    blue: "text-blue-600/90 dark:text-blue-400/90",
    purple: "text-purple-600/90 dark:text-purple-400/90",
    pink: "text-pink-600/90 dark:text-pink-400/90",
    green: "text-emerald-600/90 dark:text-emerald-400/90",
    orange: "text-orange-600/90 dark:text-orange-400/90",
    cyan: "text-cyan-600/90 dark:text-cyan-400/90",
    red: "text-rose-600/90 dark:text-rose-400/90",
    yellow: "text-amber-600/90 dark:text-amber-400/90",
    indigo: "text-indigo-600/90 dark:text-indigo-400/90",
    teal: "text-teal-600/90 dark:text-teal-400/90",
  },

  // ===== Border Colors (Subtle) =====
  borders: {
    primary: "border-primary/10 dark:border-primary/20",
    accent: "border-purple-500/10 dark:border-purple-400/20",
    success: "border-emerald-500/10 dark:border-emerald-400/20",
    warning: "border-amber-500/10 dark:border-amber-400/20",
    error: "border-rose-500/10 dark:border-rose-400/20",
  },

  // ===== Glow Effects (Soft Diffusion) =====
  glows: {
    primary: "shadow-lg shadow-primary/5 dark:shadow-primary/10",
    purple: "shadow-lg shadow-purple-500/5 dark:shadow-purple-500/10",
    pink: "shadow-lg shadow-pink-500/5 dark:shadow-pink-500/10",
    cyan: "shadow-lg shadow-cyan-500/5 dark:shadow-cyan-500/10",
  },
};

// ===== Helper Functions =====

/**
 * Get card background gradient
 * @param name - Gradient name
 * @returns Tailwind gradient classes
 */
export const getGradient = (name: keyof typeof colors.gradients) => {
  return `bg-gradient-to-br ${colors.gradients[name]}`;
};

/**
 * Get text gradient with theme support
 * @param name - Gradient name
 * @returns Tailwind gradient classes for text
 */
export const getTextGradient = (name: keyof typeof colors.textGradients) => {
  return `bg-gradient-to-r ${colors.textGradients[name]} bg-clip-text text-transparent`;
};

/**
 * Get icon color with theme support
 * @param name - Color name
 * @returns Tailwind color class
 */
export const getIconColor = (name: keyof typeof colors.icons) => {
  return colors.icons[name];
};

/**
 * Get border with glow effect
 * @param name - Border type
 * @returns Tailwind border classes
 */
export const getBorder = (name: keyof typeof colors.borders) => {
  return colors.borders[name];
};

/**
 * Get glow effect
 * @param name - Glow type
 * @returns Tailwind shadow classes
 */
export const getGlow = (name: keyof typeof colors.glows) => {
  return colors.glows[name];
};

// ===== Preset Combinations =====
export const presets = {
  heroCard: `${getGradient("cosmic")} ${getBorder("primary")} ${getGlow("primary")}`,
  featureCard: `${getGradient("aurora")} ${getBorder("accent")} ${getGlow("purple")}`,
  statsCard: `${getGradient("ocean")} ${getBorder("primary")} ${getGlow("cyan")}`,
};
