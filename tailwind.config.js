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
                    DEFAULT: '#005F02', // Deep forest green
                    light: '#427A43', // Soft muted green
                    pale: '#F2E3BB', // Cream/Sand
                    dark: '#004001', // Even deeper green for active states
                },
                forest: '#003301',
                earth: '#427A43',
                sage: '#C0B87A',
                mint: '#F2E3BB',
                // Neutrals
                surface: '#fafafa',
                card: '#ffffff',
                border: '#e0e0e0',
                muted: '#757575',
                // Dark palette
                dark: {
                    bg: '#040b06', // Very deep green-tinted black
                    surface: '#09150d', // Elevated dark surface
                    card: '#0c1a11', // Card background
                    border: '#213a29', // subtle border matching new theme
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
                'card': '0 4px 30px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)',
                'card-hover': '0 12px 60px rgba(0,0,0,0.4)',
                'nav': '0 4px 40px rgba(0,0,0,0.6)',
                'glow': '0 0 50px rgba(0, 95, 2, 0.2)', // using #005F02
                'btn': '0 6px 20px rgba(0, 64, 1, 0.4)', // using green.dark
                'btn-primary-hover': '0 8px 30px rgba(0, 95, 2, 0.4)',
                'btn-outline-hover': '0 8px 30px rgba(255,255,255,0.1)',
                'btn-white-hover': '0 8px 30px rgba(255,255,255,0.2)',
            },
        },
    },
    plugins: [],
};
