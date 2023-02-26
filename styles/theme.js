import { Cairo } from '@next/font/google'
import { createTheme } from '@mui/material/styles';

const cairoFont = Cairo({
  weight: '400',
  subsets: ['latin'],
},
  {
    weight: '500',
    subsets: ['latin']
  },
  {
    weight: '700',
    subsets: ['latin']
  },
  {
    weight: '800',
    subsets: ['latin']
  })

const colors = {
  background: {
    default: '#191919',
  },
  primary: {
    main: '#FFFFFF'
  },
  lightGray: {
    main: '#787878'
  },
  gray: {
    main: '#A3A3A3'
  },
  darkGray: {
    main: '#111111'
  },
  black: {
    main: '#000000'
  },
  purple: {
    light: '#E89951',
    main: '#FF8C68',
    dark: '#8449E4',
  },
}

const {background, primary, lightGray, gray, darkGray, black, purple} = colors

const customGradient = `linear-gradient(269.52deg, ${purple.light} 1.95%, ${purple.main} 1.96%, ${purple.dark} 83.59%)`

export const puzzleTheme = createTheme({
  palette: {
    background,
    primary,
    lightGray,
    gray,
    darkGray,
    black,
    purple,
    customGradient
  },
  
  typography: {
    fontFamily: [
      cairoFont.style.fontFamily,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: '700',
      fontSize: '46px',
      color: primary.main,
      textTransform: 'uppercase'
    },
    h2: {
      fontWeight: '700',
      fontSize: '40px',
      color: primary.main
    },
    h3: {
      fontWeight: '700',
      fontSize: '30px',
      color: black.main
    },
    h4: {
      fontWeight: '400',
      fontSize: '23px',
      color: primary.main
    },
    h5: {
      fontWeight: '700',
      fontSize: '19px',
      color: gray.main
    },
    h6: {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '24px',
      color: primary.main
    },
    navLink: {
      fontWeight: '600',
      fontSize: '16px',
      color: lightGray.main,
      textDecoration: 'none',
      transition: 'all',
      '&:hover': {
        color: primary.main
      }
    },
    footerLink: {
      fontWeight: '500',
      fontSize: '16px',
      color: primary.main,
      textDecoration: 'none',
      transition: 'all',
      '&:hover': {
        color: lightGray.main
      }
    }, 
    mainText: {
      fontWeight: '400',
      fontSize: '19px',
      color: lightGray.main
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: 1808,
        },
        maxWidthLg: {
          maxWidth: 1720,
        }
      }
    },
    MuiButton: {
      variants: [
        {
        props: { variant: 'primaryButton' },
        style: {
          width: '191px',
          height: '52px',
          borderRadius: '8px',
          background: customGradient,
          textTransform: 'none',
          fontWeight: '700',
          fontSize: '30px',
          color: black.main
        }
        },
        {
          props: { variant: 'secondaryButton' },
          style: {
            width: '322px',
            height: '36px',
            borderRadius: '63px',
            background: customGradient,
            textTransform: 'none',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '24px',
            color: black.main
          }
        },
        {
          props: { variant: 'cardButton' },
          style: {
            borderRadius: '12px',
            background: customGradient,
            textTransform: 'none',
            width: '100%',
            fontWeight: '700',
            fontSize: '22px',
            lineHeight:'34px',
            color: primary.main
          }
        },
        {
          props: { variant: 'glassButton' },
          style: {
            background: '#ffffff24',
            border: '2px solid #ffffff0f',
            color: primary.main,
            width: '191px',
            height: '52px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: '700',
            fontSize: '30px',
          }
        }
      ]
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            border: `0.5px solid ${lightGray.main}`,
            borderRadius: '2px',
            padding: '0',
            paddingLeft: '32px',
            color: lightGray.main,
            width: '290px',
            height: '48px',
          },
          "& .MuiInputBase-input:focus + fieldset": {
             border: `0.5px solid ${lightGray.main}`,
          }
        }
      }
    },
  }
  })