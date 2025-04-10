/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        // 영양소 색상
        protein: "var(--protein)",
        "protein-light": "var(--protein-light)",
        "protein-dark": "var(--protein-dark)",
        "protein-foreground": "var(--protein-foreground)",
        carbs: "var(--carbs)",
        "carbs-light": "var(--carbs-light)",
        "carbs-dark": "var(--carbs-dark)",
        "carbs-foreground": "var(--carbs-foreground)",
        fat: "var(--fat)",
        "fat-light": "var(--fat-light)",
        "fat-dark": "var(--fat-dark)",
        "fat-foreground": "var(--fat-foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

