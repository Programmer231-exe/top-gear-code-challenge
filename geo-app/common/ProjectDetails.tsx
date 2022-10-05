import styled from "@emotion/styled";
import DevicesIcon from "@mui/icons-material/Devices";
import LaunchIcon from "@mui/icons-material/Launch";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import validator from "validator";
import { getProjectDetails } from "../core/apicalls";
import { ProjectGlobalState, projectGlobalState } from "../core/state";
import { PlaceholderDiv } from "../styled-components";
import NoDetailsComponent from "./NoDetailsComponent";
const ProjectDetails = () => {
  const [globalState, setGlobalState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);

  if (
    validator.isEmpty(globalState?.selectedProject) &&
    globalState.projects?.length > 0
  ) {
    setGlobalState({
      ...globalState,
      selectedProject: globalState.projects[0].name,
    });
  }

  return (
    <React.Fragment>
      {globalState.loading ? (
        <DetailsPlaceholder />
      ) : !validator.isEmpty(globalState.selectedProject) ? (
        <DetailsComponent />
      ) : (
        <NoDetailsComponent paddingTop="25%" Icon={ListAltIcon} />
      )}
    </React.Fragment>
  );
};

const DetailsComponent = () => {
  const [globalState, setGlobalState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);
  useEffect(() => {
    getProjectDetails(globalState, setGlobalState);
  }, []);
  return (
    <Grid container>
      <Grid item sm={12} sx={{ margin: "5px" }}>
        <Grid
          container
          flexDirection="row"
          justifyContent="space-between"
          sx={{ marginLeft: "5px" }}
        >
          <Grid item>
            <Typography fontSize={"11px"}>Project Details</Typography>
            <Typography fontWeight={"bold"}>
              {globalState.selectedProject}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <LaunchIcon fontSize={"medium"} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <Grid
          container
          flexDirection="row"
          justifyContent="space-between"
          columnSpacing={2}
          sx={{
            padding: "10px",
          }}
        >
          <Grid item sm={6}>
            <Wrapper>
              <DevicesIcon />
              <Typography fontSize={"12px"} fontWeight={"bold"}>
                {globalState.projectDetails.devices} Devices
              </Typography>
            </Wrapper>
          </Grid>
          <Grid item sm={6}>
            <Wrapper>
              <SignalCellularAltIcon />
              <Typography fontSize={"12px"} fontWeight={"bold"}>
                {globalState.projectDetails.events} Events
              </Typography>
            </Wrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <Grid
          container
          columnSpacing={"2"}
          sx={{
            marginLeft: "10px",
          }}
        >
          <Grid item sm={6}>
            <Typography fontWeight={"bold"} fontSize={"14px"}>
              Last Updated on
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography fontSize={"12px"}>
              {globalState.projectDetails.last_updated_on}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <Divider
          fullWidth={true}
          sx={{
            margin: "5px",
          }}
        />
      </Grid>

      <Grid item sm={12}>
        <Grid
          container
          columnSpacing={"2"}
          rowSpacing={"10"}
          sx={{
            marginLeft: "10px",
          }}
        >
          <Grid item sm={6}>
            <Typography fontWeight={"bold"} fontSize={"14px"}>
              Created At
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography fontSize={"12px"}>
              {globalState.projectDetails.project.created_at}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <Divider
          fullWidth={true}
          sx={{
            margin: "5px",
          }}
        />
      </Grid>

      <Grid item sm={12}>
        <Grid container>
          <Grid item sm={12}>
            <Grid
              container
              columnSpacing={"2"}
              rowSpacing={"10"}
              sx={{
                marginLeft: "10px",
              }}
            >
              <Grid item sm={12}>
                <Typography fontWeight={"bold"} fontSize={"14px"}>
                  Description
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography fontSize={"12px"}>
                  {globalState.projectDetails.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const DetailsPlaceholder = () => {
  return (
    <PlaceholderContainer className="ph-item">
      <PlaceholderContainer className="ph-col-12">
        <PlaceholderDiv className="ph-row">
          <PlaceholderDiv className="ph-col-12 big"></PlaceholderDiv>
        </PlaceholderDiv>
      </PlaceholderContainer>
      <PlaceholderDiv className="ph-col-6">
        <ImgPHContainer className="ph-picture"></ImgPHContainer>
      </PlaceholderDiv>
      <PlaceholderDiv className="ph-col-6">
        <ImgPHContainer className="ph-picture"></ImgPHContainer>
      </PlaceholderDiv>
      <Divider className="ph-col-12" variant="fullWidth" component="span" />
      <PlaceholderContainer className="ph-col-12">
        <PlaceholderDiv className="ph-row">
          <PlaceholderDiv className="ph-col-12 big"></PlaceholderDiv>
          <Divider className="ph-col-12" variant="fullWidth" component="span" />
          <PlaceholderDiv className="ph-col-12 big"></PlaceholderDiv>
          <Divider className="ph-col-12" variant="fullWidth" component="span" />
          <PlaceholderDiv className="ph-col-6 big"></PlaceholderDiv>
          <PlaceholderDiv className="ph-col-10 big"></PlaceholderDiv>
        </PlaceholderDiv>
      </PlaceholderContainer>
    </PlaceholderContainer>
  );
};

const PlaceholderContainer = styled("span")`
  margin: 0,
  padding: 0,
  border-radius: "5px";
  width: 100%
  max-height: 10vh

`;

const ImgPHContainer = styled("div")`
  border-radius: "10px";
  margin: 0;
  padding: 0;
  max-height: 10vh;
`;

const Wrapper = styled("div")`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  background-color: white;
  padding: 15px;
  text-align: center;
  align-items: center;
`;

export default ProjectDetails;
