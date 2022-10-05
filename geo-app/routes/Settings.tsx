import { Button, Grid, Typography } from "@mui/material";
import SettingsForm from "../common/SettingsForm";

const Settings = (): JSX.Element => {
  return (
    <Grid
      container
      sx={{
        padding: "10% 15%",
        paddingRight: "10%",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
      columnSpacing={"5"}
      rowSpacing={"20"}
    >
      <Grid item sm={12}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          Settings
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Grid
          container
          columnSpacing={"30"}
          sx={{
            paddingLeft: "2.5%",
            borderRadius: "10%",
          }}
        >
          <Grid
            item
            sm={"6"}
            sx={{
              backgroundColor: "white",
              padding: 0,
              margin: 0,
              borderRadius: "10px",
            }}
          >
            <SettingsForm />
          </Grid>
          <Grid item sm="5">
            <Grid
              container
              sx={{
                backgroundColor: "white",
                padding: "5%",
                borderRadius: "10px",
              }}
            >
              <Grid item sm={12}>
                <Typography fontWeight={"bold"}>Change Password</Typography>
              </Grid>
              <Grid
                item
                sm={12}
                sx={{
                  padding: "2%",
                  paddingTop: "10%",
                }}
              >
                <Button color="primary" variant="contained" fullWidth={true}>
                  <Typography fontWeight={"bold"} fontSize={"12px"}>
                    Change Password
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Settings;
