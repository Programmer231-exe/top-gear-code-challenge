import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import ForgotPasswordForm from "../common/ForgotPasswordForm";
import LoginBanner from "../common/LoginBanner";
import LoginForm from "../common/LoginForm";
import { NavigationProps } from "../core/geo_app_types";
import { GeosIcon } from "../icons/GeosIcon";

const TitleHolder = styled("div")`
  margin-top: 15%;
  text-align: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const Login = ({
  navigation,
}: {
  navigation: NavigationProps;
}): JSX.Element => {
  const { location } = navigation;
  console.log("Login page");

  return (
    <Grid container>
      <Grid item xs={12} sm={5.5}>
        <LoginBanner />
      </Grid>
      <Grid item xs={12} sm={6.5}>
        <Grid container justifyContent={"space-between"}>
          <Grid item sm={12}>
            <TitleHolder>
              <GeosIcon />
              <Typography
                paddingLeft={"10px"}
                fontWeight="bold"
                fontSize={"18px"}
              >
                GEOSPATIAL
              </Typography>
            </TitleHolder>
          </Grid>
          <Grid item sm={12}>
            {(location.pathname === "/" || location.pathname === "/login") && (
              <LoginForm navigation={navigation} />
            )}
            {location.pathname === "/forgot-password" && (
              <ForgotPasswordForm navigation={navigation} />
            )}
          </Grid>
          <Grid
            sx={{
              textAlign: "center",
              position: "fixed",
              bottom: 10,
              right: "16%",
            }}
            item
            sm={12}
          >
            <Typography variant="subtitle2" textAlign={"center"}>
              ©️ Geospatial Corporation. All rights reserved
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
