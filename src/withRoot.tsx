import * as React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { purple, green } from "@material-ui/core/colors";

const borderColor = "#e9e9e9";
const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h5: {
        fontWeight: 800
      }
    },
    MuiChip: {
      root: {
        height: 25,
        borderRadius: 0
      }
    },
    MuiAppBar: {
      root: {
        backgroundColor: "#FFF",
        boxShadow: "none",
        borderBottom: `1px solid ${borderColor}`
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0
      }
    },
    MuiCard: {
      root: {
        borderRadius: 0
      }
    }
  },
  typography: {
    fontFamily: ["Apercu"].join(",")
  },
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: purple[500]
    },
    background: {
      default: "#FFF"
    }
  }
});

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
