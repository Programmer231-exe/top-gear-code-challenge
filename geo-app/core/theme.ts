import { createTheme } from '@mui/material/styles';

export const useTheme = () => {
  return createTheme({
    typography: {
      fontFamily: "montserrat"
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            margin: 0
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontSize: "14px",
            fontWeight: "bold"
          },
          subheader: {
            marginTop: "10px",
            fontSize: "10px",
            color: "white"
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          shrink: {
            fontSize: '18px',
            fontWeight: "bold"
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: '16px',
          },
        }
      }
    }
  })
}
