/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pink-1': 'var(--pink-1)',
                'pink-2': 'var(--pink-2)',
                'accent': 'var(--accent)',
                'accent-2': 'var(--accent-2)',
                'card-bg': 'var(--card-bg)',
                'glass': 'var(--glass)',
            },
            fontFamily: {
                'sans': ['Poppins', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            },
            borderRadius: {
                'lg': 'var(--radius)',
            }
        },
    },
    plugins: [],
}
