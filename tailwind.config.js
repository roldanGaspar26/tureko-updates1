/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './views/**/*.ejs',
        './public/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                // Primary Design System – globally interconnected across every button & component
                green: {
                    DEFAULT: '#10b981', // Emerald 500
                    light: '#34d399', // Emerald 400
                    pale: '#d1fae5', // Emerald 100
                    dark: '#047857', // Emerald 700
                },
                forest: '#064e3b',
                earth: '#022c22',
                sage: '#6ee7b7',
                mint: '#a7f3d0',
                // Neutrals
                surface: '#fafafa',
                card: '#ffffff',
                border: '#e0e0e0',
                muted: '#757575',
                // Dark palette
                dark: {
                    bg: '#020604', // Very deep subtle green-tinted black
                    surface: '#06110a', // Slightly lighter 
                    card: '#08170e', // Card background 
                    border: '#153221', // subtle border
                },
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                mono: ['ui-monospace', 'monospace'],
            },
            fontSize: {
                'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
                'h1': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'h2': ['clamp(1.6rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '120': '30rem',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            animation: {
                'marquee': 'marquee 28s linear infinite',
                'fadeInUp': 'fadeInUp 0.7s ease forwards',
                'scaleIn': 'scaleIn 0.5s ease forwards',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'card': '0 4px 20px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)',
                'card-hover': '0 12px 40px rgba(0,0,0,0.25)',
                'nav': '0 4px 30px rgba(0,0,0,0.4)',
                'glow': '0 0 40px rgba(16,185,129,0.15)',
                'btn': '0 6px 16px rgba(4,120,87,0.3)',
                'btn-primary-hover': '0 8px 24px rgba(16,185,129,0.35)',
                'btn-outline-hover': '0 8px 24px rgba(255,255,255,0.05)',
                'btn-white-hover': '0 8px 24px rgba(255,255,255,0.15)',
            },
        },
    },
    plugins: [],
};
