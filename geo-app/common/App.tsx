import { Global } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../core/theme";
import { Home, Login } from "../routes";
import ErrorPage from "./ErrorPage";

export function App(): JSX.Element {
  const geoTheme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ThemeProvider theme={geoTheme}>
      <Global
        styles={{
          ":root": {
            fontFamily: "Montserrat",
          },
          body: {
            margin: 0,
          },
        }}
      />
      <Routes>
        <Route
          index
          element={
            <React.Suspense
              children={<Home navigation={{ navigate, location }} />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <React.Suspense
              children={<Login navigation={{ navigate, location }} />}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <React.Suspense
              children={<Login navigation={{ navigate, location }} />}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <React.Suspense
              children={<Home navigation={{ navigate, location }} />}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <React.Suspense
              children={<Home navigation={{ navigate, location }} />}
            />
          }
        />
        <Route
          path="/search"
          element={
            <React.Suspense
              children={<Home navigation={{ navigate, location }} />}
            />
          }
        />
        <Route path="*" element={<React.Suspense children={<ErrorPage />} />} />
      </Routes>
    </ThemeProvider>
  );
}
