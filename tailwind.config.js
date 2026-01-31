/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#050507",
                surface: "#0f0f16",
                "surface-border": "#1f1f2e",
                primary: "#3b82f6", // Blue 500
                "primary-glow": "rgba(59, 130, 246, 0.5)",
                accent: "#8b5cf6", // Violet 500
                success: "#10b981",
                danger: "#ef4444",
                warning: "#f59e0b",
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
            }
        },
    },
    plugins: [],
}
