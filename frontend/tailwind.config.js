/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "rgb(var(--bg) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                "surface-border": "rgb(var(--surface-border) / <alpha-value>)",
                primary: "rgb(var(--primary) / <alpha-value>)",
                "primary-glow": "rgb(var(--primary-glow) / 0.5)", // Fixed opacity for glow
                accent: "rgb(var(--accent) / <alpha-value>)",
                success: "rgb(var(--success) / <alpha-value>)",
                danger: "rgb(var(--danger) / <alpha-value>)",
                warning: "rgb(var(--warning) / <alpha-value>)",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            boxShadow: {
                'soft-indigo': '0 4px 20px -4px rgba(99, 102, 241, 0.1)',
                'soft-indigo-hover': '0 8px 30px -4px rgba(99, 102, 241, 0.2)',
            }
        },
    },
    plugins: [],
}
