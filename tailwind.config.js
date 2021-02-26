module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'cq-charcoal': '#264653',
                'cq-slate': '#276868',
                'cq-green': '#2A9D8F',
                'cq-yellow': '#E9C46A',
                'cq-brown': '#F4A261',
                'cq-red': '#E76F51',
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        }
    },
    plugins: [],
}
