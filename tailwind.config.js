/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "space-4": "var(--space-4px)",    // 0.25rem
        "space-8": "var(--space-8px)",    // 0.5rem
        "space-12": "var(--space-12px)",  // 0.75rem
        "space-16": "var(--space-16px)",  // 1rem
        "space-20": "var(--space-20px)",  // 1.25rem
        "space-24": "var(--space-24px)",  // 1.5rem
        "space-28": "var(--space-28px)",  // 1.75rem
        "space-32": "var(--space-32px)",  // 2rem
        "space-36": "var(--space-36px)",  // 2.25rem
        "space-40": "var(--space-40px)",  // 2.5rem
        "space-44": "var(--space-44px)",  // 2.75rem
        "space-48": "var(--space-48px)",  // 3rem
        "space-52": "var(--space-52px)",  // 3.25rem
        "space-56": "var(--space-56px)",  // 3.5rem
        "space-60": "var(--space-60px)",  // 3.75rem
        "space-64": "var(--space-64px)",  // 4rem
        "space-68": "var(--space-68px)",  // 4.25rem
        "space-72": "var(--space-72px)",  // 4.5rem
        "space-76": "var(--space-76px)",  // 4.75rem
        "space-80": "var(--space-80px)",  // 5rem
        "space-84": "var(--space-84px)",  // 5.25rem
        "space-88": "var(--space-88px)",  // 5.5rem
        "space-92": "var(--space-92px)",  // 5.75rem
        "space-96": "var(--space-96px)",  // 6rem
        "space-100": "var(--space-100px)", // 6.25rem
        "space-104": "var(--space-104px)", // 6.5rem
        "space-108": "var(--space-108px)", // 6.75rem
        "space-112": "var(--space-112px)", // 7rem
        "space-116": "var(--space-116px)", // 7.25rem
        "space-120": "var(--space-120px)", // 7.5rem
        "space-124": "var(--space-124px)", // 7.75rem
        "space-128": "var(--space-128px)", // 8rem
        "space-297": "var(--space-297px)", // 18.5625rem
        "space-312": "var(--space-312px)", // 19.5rem
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserratSans: ["Montserrat", "sans-serif"],
        montserratMono: ["Montserrat Subrayada", "sans-serif"],
        montserratAlternates: ["Montserrat Alternates", "sans-serif"],
      },
      fontWeight: {
        regular: "var(--font-w-regular)",
        medium: "var(--font-w-medium)",
        semibold: "var(--font-w-semibold)",
        bold: "var(--font-w-bold)",
      },
      colors: {
        primary: {
          1: "var(--primary-1)",
          2: "var(--primary-2)",
          3: "var(--primary-3)",
          4: "var(--primary-4)",
        },
        secondary: {
          1: "var(--secondary-1)",
          2: "var(--secondary-2)",
          3: "var(--secondary-3)",
          4: "var(--secondary-4)",
        },
        neutral: {
          1: "var(--neutral-1)",
          2: "var(--neutral-2)",
          3: "var(--neutral-3)",
          4: "var(--neutral-4)",
          5: "var(--neutral-5)",
          6: "var(--neutral-6)",
          light: "var(--neutral-light)",
          dark: "var(--neutral-dark)",
          danger: "var(--neutral-danger)",
          white: "var(--neutral-white)",
        },
        success: "var(--success)",
        error: "var(--error)",
        warning: "var(--warning)",
        black: "var(--black)",
        white: "var(--white)",
        background: {
          background: "var(--background-primary)",
          light: "var(--background-color-light)",
          green: "var(--background-color-green)",
          blue_light: "var(--background-color-blue-light)",
          blue: "var(--background-color-blue)",
        },
      }
    },
  },
  plugins: [],
};
