module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)", card: "var(--card)", line: "var(--line)", ink: "var(--ink)",
        mute: "var(--mute)", soft: "var(--soft)", t1: "var(--t1)", t2: "var(--t2)",
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
    },
  },
};
