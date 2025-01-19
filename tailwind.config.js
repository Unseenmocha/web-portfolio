/** @type {import('tailwindcss').Config} */
module.exports = {
    content: {
      relative: true,
      transform: (content) => content.replace(/taos:/g, ''),
      files: [
        "./src/**/*.{html,js}",
        "./imgs/**/*.{png,svg}"
      ]
    },
    theme: {
      colors: {
        'night': "#131315",
        'raisin': "#28282a",
        'jet': "#2E2E31",
        'flame': "#D55620",
        'gray': "#989898",
        'platinum': "#EAEDE8",
        "eerie": "#1C1C1E",
      },
      extend: {
        animation: {
          'cursorBlink': "blinking step-end 3 0.9s forwards",
          'waving': "waving 0.5s linear 3",
        },
        keyframes: {
          waving: {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '25%': {
              transform: 'rotate(-15deg) translate(-10px)',
            },
            '75%': {
              transform: 'rotate(15deg) translate(10px)',
            },
            '100%': {
              transform: 'rotate(0deg)',
            }
          },
          blinking: {
            '0%, 99%': {
              borderRight: '1',
            },
            '50%, 100%': {
              borderRight: '0',
            },
          },
        },
        fontFamily: {
          "funnel-display": ["Funnel Display",] //  "Light 300", "Regular 400", "Medium 500", "SemiBold 600", "Bold 700"
        }
      },
    },
    plugins: [
      require('tailwindcss-motion'),
    ]
  }