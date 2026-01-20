/**
 * 🎨 Out of This World Color System
 * Comprehensive color palette for dark and light modes
 */

export const colors = {
  // ===== Card Background Gradients (Subtle & Professional) =====
  gradients: {
    cosmic:
      "from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/15 dark:via-purple-400/15 dark:to-pink-400/15",
    aurora:
      "from-purple-500/10 via-cyan-500/10 to-green-500/10 dark:from-purple-400/15 dark:via-cyan-400/15 dark:to-green-400/15",
    sunset:
      "from-orange-500/10 via-pink-500/10 to-purple-500/10 dark:from-orange-400/15 dark:via-pink-400/15 dark:to-purple-400/15",
    ocean:
      "from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-blue-400/15 dark:via-cyan-400/15 dark:to-teal-400/15",
    forest:
      "from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-400/15 dark:via-emerald-400/15 dark:to-teal-400/15",
    fire: "from-red-500/10 via-orange-500/10 to-yellow-500/10 dark:from-red-400/15 dark:via-orange-400/15 dark:to-yellow-400/15",
    twilight:
      "from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-400/15 dark:via-purple-400/15 dark:to-pink-400/15",
    neon: "from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-400/15 dark:via-blue-400/15 dark:to-purple-400/15",
  },

  // ===== Text Gradients =====
  textGradients: {
    cosmic:
      "from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400",
    aurora:
      "from-purple-600 via-cyan-600 to-green-600 dark:from-purple-400 dark:via-cyan-400 dark:to-green-400",
    sunset:
      "from-orange-600 via-pink-600 to-purple-600 dark:from-orange-400 dark:via-pink-400 dark:to-purple-400",
    ocean:
      "from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400",
    primary:
      "from-blue-600 via-blue-500 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400",
    electric:
      "from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400",
  },

  // ===== Icon Colors (Theme-aware) =====
  icons: {
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    pink: "text-pink-600 dark:text-pink-400",
    green: "text-green-600 dark:text-green-400",
    orange: "text-orange-600 dark:text-orange-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
    red: "text-red-600 dark:text-red-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
    teal: "text-teal-600 dark:text-teal-400",
  },

  // ===== Border Colors with Glow =====
  borders: {
    primary: "border-blue-500/20 dark:border-cyan-500/30",
    accent: "border-purple-500/20 dark:border-purple-400/30",
    success: "border-green-500/20 dark:border-green-400/30",
    warning: "border-orange-500/20 dark:border-orange-400/30",
    error: "border-red-500/20 dark:border-red-400/30",
  },

  // ===== Glow Effects =====
  glows: {
    primary: "shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/30",
    purple: "shadow-lg shadow-purple-500/20 dark:shadow-purple-400/30",
    pink: "shadow-lg shadow-pink-500/20 dark:shadow-pink-400/30",
    cyan: "shadow-lg shadow-cyan-500/20 dark:shadow-cyan-400/30",
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
