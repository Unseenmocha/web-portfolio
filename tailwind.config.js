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
        'raisin': "#26262B",
        'jet': "#303036",
        'flame': "#D55620",
        'smoke': "#F5F5F5",
        'platinum': "#EAEDE8",
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
      require('taos/plugin')
    ],
    safelist: [
      '!duration-[0ms]',
      '!delay-[0ms]',
      'html.js :where([class*="taos:"]:not(.taos-init))'
    ]

  }