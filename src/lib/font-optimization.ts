/**
 * Font Loading Optimization
 * Implements font preloading, fallback strategies, and performance optimizations
 * Requirements: 6.4
 */

// Font preload configuration
export const fontPreloadConfig = {
  // Inter font with variable weight support
  inter: {
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    preload: [
      {
        href: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  },

  // JetBrains Mono for code
  jetbrainsMono: {
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    preload: [
      {
        href: "https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  },
};

// System font fallback stack
export const systemFontStack = [
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
].join(", ");

export const monoFontStack = [
  "JetBrains Mono",
  "Fira Code",
  "Consolas",
  "Monaco",
  "Courier New",
  "monospace",
].join(", ");

// Font loading optimization functions
export const preloadFonts = () => {
  const head = document.head;

  // Add preconnect links
  fontPreloadConfig.inter.preconnect.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    if (url.includes("gstatic")) {
      link.crossOrigin = "anonymous";
    }
    head.appendChild(link);
  });

  // Add font preload links
  fontPreloadConfig.inter.preload.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = font.href;
    link.as = "font";
    link.type = font.type;
    link.crossOrigin = font.crossOrigin;
    head.appendChild(link);
  });

  // Add font stylesheet with font-display: swap
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = fontPreloadConfig.inter.href;
  head.appendChild(fontLink);
};

// Font loading detection
export const detectFontLoading = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!("fonts" in document)) {
      // Fallback for browsers without Font Loading API
      setTimeout(resolve, 100);
      return;
    }

    // Use Font Loading API to detect when fonts are ready
    document.fonts.ready.then(() => {
      resolve();
    });

    // Fallback timeout
    setTimeout(resolve, 3000);
  });
};

// Font loading optimization with fallback
export const optimizeFontLoading = () => {
  // Add critical font CSS inline to prevent FOUT (Flash of Unstyled Text)
  const criticalFontCSS = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 300 800;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    
    /* Ensure system fonts are used as fallback */
    body {
      font-family: ${systemFontStack};
    }
    
    /* Optimize text rendering */
    * {
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;

  const style = document.createElement("style");
  style.textContent = criticalFontCSS;
  document.head.appendChild(style);

  // Preload fonts asynchronously
  preloadFonts();
};

// Font loading performance monitoring
export const monitorFontPerformance = () => {
  if (!("fonts" in document) || !("performance" in window)) {
    return;
  }

  const startTime = performance.now();

  document.fonts.ready.then(() => {
    const loadTime = performance.now() - startTime;

    // Log font loading performance (can be sent to analytics)
    console.log(`Fonts loaded in ${loadTime.toFixed(2)}ms`);

    // Mark fonts as loaded for CSS
    document.documentElement.classList.add("fonts-loaded");
  });
};

// Font loading error handling
export const handleFontLoadingErrors = () => {
  if (!("fonts" in document)) {
    return;
  }

  // Check if fonts failed to load after a timeout
  setTimeout(() => {
    const interFont = document.fonts.check("16px Inter");

    if (!interFont) {
      console.warn("Inter font failed to load, using system fonts");
      document.documentElement.classList.add("fonts-fallback");
    }
  }, 5000);
};

// Main font optimization function
export const initializeFontOptimization = () => {
  // Optimize font loading
  optimizeFontLoading();

  // Monitor performance
  monitorFontPerformance();

  // Handle errors
  handleFontLoadingErrors();

  // Detect when fonts are ready
  detectFontLoading().then(() => {
    document.documentElement.classList.add("fonts-ready");
  });
};

// All utilities are already exported above
