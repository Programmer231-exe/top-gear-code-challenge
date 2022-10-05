import { Grid } from "@mui/material";
import React from "react";
import { Dashboard, Search, Settings } from ".";
import ToolBar from "../common/ToolBar";
import UtilComponents from "../common/UtilComponents";
import { NavigationProps, PATH_NAMES } from "../core/geo_app_types";
const Home = ({ navigation }: { navigation: NavigationProps }) => {
  const { navigate, location } = navigation;
  let pathname: string = location.pathname;

  console.log(pathname);

  if (!(localStorage.getItem("authentication") === "true")) {
    navigate("/login");
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={0.5}>
          <ToolBar navigation={navigation} />
        </Grid>
        <Grid item sm={11.5}>
          {(pathname === PATH_NAMES.DASHBOARD || pathname === "/") && (
            <Dashboard />
          )}
          {pathname === PATH_NAMES.SETTINGS && <Settings />}
          {pathname === PATH_NAMES.SEARCH && <Search />}
        </Grid>
        <Grid sm={12}>
          <UtilComponents />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
