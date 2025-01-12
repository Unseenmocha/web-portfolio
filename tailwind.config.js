/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      colors: {
        'night': "#131315",
        'raisin': "#26262B",
        'jet': "#303036",
        'flame': "#D55620",
        'smoke': "#F5F5F5",
        'platinum': "#EAEDE8",
        'cornflower': '#5C95FF',
      },
      extend: {
        animation: {
          // 'typewriter1': 'typing 2s steps(20) 0.5s forwards, blinking step-end 5 1s forwards',
          // 'typewriter2': "2s typing 2.5s steps(40) forwards, blinking step-end 10 0.9s forwards",
          'cursorBlink': "blinking step-end 2 0.9s forwards",
          'waving': "waving 0.5s linear 3",
          'grow': "grow 0.5s ease-in-out forwards",
          'shrink': "shrink 0.5s ease-in-out forwards"
        },
        keyframes: {
          // typing: {
          //   '0%': {
          //     width: '3%',
          //     opacity: '100%'
          //   },
          //   '100%': {
          //     width: '100%',
          //     opacity: '100%'
          //   }
          // },
          grow: {
            '100%': {
              transform: 'scale(1.5)'
            }
          },
          shrink: {
            '100%': {
              transform: 'scale(0.5)'
            }
          },
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
    plugins: [require('tailwindcss-motion')], 

  }