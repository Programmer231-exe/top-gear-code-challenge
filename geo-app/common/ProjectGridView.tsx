import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { Project } from "../core/geo_app_types";
import { projectGlobalState, ProjectGlobalState } from "../core/state";

const ProjectGridView = ({ projects }: { projects: [Project] }) => {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          width: "100%",
          maxWidth: "95%",
          margin: "3% 3%",
          marginRight: "3%",
        }}
        columnSpacing={2}
      >
        {projects?.map((p) => (
          <Grid item sm={6}>
            <ListElement project={p} key={p.name} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

const ListElement = ({ project }: { project: Project }) => {
  const [localProjectState, setProjectState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          setProjectState({
            ...localProjectState,
            selectedProject: project.name,
          });
        }}
        sx={{
          backgroundColor: `${
            project.name === localProjectState.selectedProject
              ? "rgb(0,0,0,0.2)"
              : "none"
          }`,
          borderRadius: `${
            project.name === localProjectState.selectedProject ? "5px" : 0
          }`,
          padding: "4px",
        }}
      >
        <CardMedia
          component="img"
          height="120"
          image={project.thumbnail}
          alt={project.name}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              margin: 0,
              padding: 0,
            }}
          >
            <Typography fontWeight={"bold"} fontSize={"14px"}>
              {project.name}
            </Typography>
            <Typography fontSize={"12px"} color="rgba(0,0,0,0.6)">
              Date created at:{project.created_at}
            </Typography>
          </Box>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ProjectGridView;
