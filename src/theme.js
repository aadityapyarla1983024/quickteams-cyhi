// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3B82F6", // blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F97316", // orange
      contrastText: "#ffffff",
    },
    success: {
      main: "#22C55E", // green
    },
    warning: {
      main: "#FACC15", // yellow
    },
    error: {
      main: "#EF4444", // red
    },
    background: {
      default: "#0d0f27", // 🔥 dark navy (modern bg)
      paper: "#1E293B", // slightly lighter gray for cards
    },
    text: {
      primary: "#F1F5F9", // near-white
      secondary: "#94A3B8", // muted gray-blue
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontWeight: 700, fontSize: "2.25rem" },
    h2: { fontWeight: 600, fontSize: "1.75rem" },
    h3: { fontWeight: 600, fontSize: "1.5rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem", color: "#94A3B8" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 16, // smooth rounded corners
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "#1E293B", // match paper
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
        },
      },
    },
  },
});
// theme.components = {
//   MuiCssBaseline: {
//     styleOverrides: {
//       body: {
//         background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",

//         minHeight: "100vh",
//       },
//     },
//   },
// };

export default theme;
