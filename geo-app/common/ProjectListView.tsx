import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { Project } from "../core/geo_app_types";
import {
  menuState,
  MenuState,
  projectGlobalState,
  ProjectGlobalState,
} from "../core/state";

const ProjectListView = ({ projects }: { projects: [Project] }) => {
  return (
    <React.Fragment>
      <List
        sx={{
          width: "100%",
          maxWidth: "95%",
          margin: "3% 3%",
          marginRight: "3%",
          position: "relative",
          height: "100%",
        }}
      >
        {projects?.map((p) => (
          <ListElement project={p} key={p.name} />
        ))}
      </List>
    </React.Fragment>
  );
};

const ListElement = ({ project }: { project: Project }) => {
  const [localProjectState, setProjectState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);
  const [menuOptionState, setMenuOptionState] =
    useRecoilState<MenuState>(menuState);

  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOptionState({
      ...menuOptionState,
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
    });
  };
  return (
    <React.Fragment>
      <ListItem
        onClick={() => {
          setProjectState({
            ...localProjectState,
            selectedProject: project.name,
          });
        }}
        sx={{
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          backgroundColor: `${
            project.name === localProjectState.selectedProject
              ? "rgb(0,0,0,0.2)"
              : "none"
          }`,
          borderRadius: `${
            project.name === localProjectState.selectedProject ? "5px" : 0
          }`,
        }}
      >
        <ListItemAvatar>
          <img alt="thumbnail" src={project.thumbnail} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              sx={{
                marginTop: "5%",
                marginLeft: "3%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography fontWeight={"bold"} fontSize={"14px"}>
                  {project.name}
                </Typography>
                <Typography fontSize={"12px"} color="rgba(0,0,0,0.6)">
                  Date created at:{project.created_at}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Box>
              <IconButton onClick={handleOptionClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        />
      </ListItem>
      <Divider
        variant="fullWidth"
        component="li"
        sx={{
          margin: "2%",
        }}
      />
    </React.Fragment>
  );
};

export default ProjectListView;
