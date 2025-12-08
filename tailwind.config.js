module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: '#ffffff',
                text: '#ffffff',
                primary: '#1144AA',
                underlayForPrimary: '#0537aa',
                secondary: '#969fae',
                underlaySecondary: '#858a98',
                info: '#31ccec',
                accent: '#4575D4',
                positive: '#21ba45',
                negative: '#c10015',
                warning: '#f2c037',
                activeTab: '#4575D4',
                closeBtn: '#999aa1',
                deleteBtn: '#f44336',
                underlayForDeleteBtn: '#c11a12',
                listElement: '#5b86e5',
                underlayForListElement: '#4371d666',
                darkModalBackground: '#302f2f'
            }
        },
    },
    plugins: [],
}

