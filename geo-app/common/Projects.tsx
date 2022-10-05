import styled from "@emotion/styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LayersIcon from "@mui/icons-material/Layers";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { filterProjects, getProjects } from "../core/apicalls";
import { projectGlobalState, ProjectGlobalState } from "../core/state";
import { PlaceholderDiv, StyledIconButton } from "../styled-components";
import NoDetailsComponent from "./NoDetailsComponent";
import ProjectView from "./ProjectView";

const StyledContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 0 20px;
  vertical-align: center;
`;

const ScrollableWindow = styled("div")`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 83vh;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    border: 0;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: =2px 2px 2px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

interface ProjectState {
  view: string;
  search: string;
  condition: string;
}

const projectState = atom<ProjectState>({
  key: "ProjectState",
  default: {
    view: "list",
    search: "",
    condition: "newest",
  },
});

enum VIEWS {
  LIST = "list",
  GRID = "grid",
}

const ProjectsTab = () => {
  const [state, setState] = useRecoilState<ProjectState>(projectState);
  const [globalState, setGlobalState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);

  useEffect(() => {
    console.log("useEffect");
    console.log("this is working");
    getProjects("username", globalState, setGlobalState);
  }, []);

  const onSearch = () => {
    if (state.search) {
      filterProjects(state.search, globalState, setGlobalState);
    }
  };

  const sortProjects = () => {
    getProjects("username", globalState, setGlobalState);
  };

  const viewChange = (view: string): void => {
    setState({
      ...state,
      view: view,
    });
  };

  const onSearchChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }): void => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const onSelectChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }): void => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  return (
    <Box>
      <StyledContainer>
        <Typography fontWeight={"bold"} alignItems={"center"} variant="h6">
          My Projects
        </Typography>
        <span>
          <StyledIconButton
            __active_bgcolor="white"
            __selected={VIEWS.LIST === state.view}
            __active_color="default"
            __default_color="default"
            onClick={() => viewChange(VIEWS.LIST)}
          >
            <ViewListIcon fontSize="small" />
          </StyledIconButton>
          <StyledIconButton
            __active_bgcolor="white"
            __selected={VIEWS.GRID === state.view}
            __active_color="default"
            __default_color="default"
            onClick={() => viewChange(VIEWS.GRID)}
          >
            <DashboardIcon fontSize="small" />
          </StyledIconButton>
        </span>
      </StyledContainer>
      <StyledContainer>
        <TextField
          id="outlined-start-adornment"
          name="search"
          value={state.search}
          onChange={onSearchChange}
          placeholder="search by project name"
          sx={{
            width: "70%",
          }}
          inputProps={{
            style: {
              padding: "4px",
              backgroundColor: "white",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {state.search?.length > 1 && (
                  <IconButton
                    onClick={() => {
                      setState({
                        ...state,
                        search: "",
                      });
                    }}
                  >
                    <HighlightOffIcon fontSize="small" />
                  </IconButton>
                )}
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              fontSize: "12px",
            },
          }}
        />
        <Typography
          fontSize={"12px"}
          variant="subtitle2"
          fontWeight={"bold"}
          paddingTop="5px"
          paddingLeft="0"
        >
          Sort by:
        </Typography>
        <Select
          id="condition"
          name="condition"
          value={state.condition}
          onChange={onSelectChange}
          label="Age"
          sx={{
            padding: 0,
            fontSize: "11px",
            border: 0,
          }}
          inputProps={{
            style: {
              padding: 0,
              border: 0,
            },
          }}
          SelectDisplayProps={{
            style: {
              width: "100%",
              paddingTop: 0,
              paddingBottom: 0,
              border: 0,
            },
          }}
        >
          <MenuItem value={"newest"}>
            <Typography fontSize={"12px"} fontWeight={"bold"}>
              Newest
            </Typography>
          </MenuItem>
          <MenuItem value={"oldest"} sx={{ display: "flex" }}>
            <Typography fontSize={"12px"} fontWeight={"bold"}>
              Oldest
            </Typography>
          </MenuItem>
        </Select>
      </StyledContainer>
      <ScrollableWindow>
        {globalState.loading ? (
          <ProjectLoading />
        ) : globalState.projects.length > 0 ? (
          <ProjectView view={state.view} projects={globalState.projects} />
        ) : (
          <NoDetailsComponent paddingTop="50%" Icon={LayersIcon} />
        )}
      </ScrollableWindow>
    </Box>
  );
};

export default ProjectsTab;

const ProjectLoading = (): JSX.Element => {
  return (
    <React.Fragment>
      {[...Array(5)].map((e, i) => (
        <React.Fragment>
          <PlaceholderDiv className="ph-item">
            <PlaceholderDiv className="ph-col-4">
              <PlaceholderDiv className="ph-picture "></PlaceholderDiv>
            </PlaceholderDiv>
            <PlaceholderDiv className="ph-col-8">
              <PlaceholderDiv className="ph-row">
                <PlaceholderDiv className="ph-col-12 empty"></PlaceholderDiv>
                <PlaceholderDiv className="ph-col-6 big"></PlaceholderDiv>
                <PlaceholderDiv className="ph-col-12 empty"></PlaceholderDiv>
                <PlaceholderDiv className="ph-col-8 big"></PlaceholderDiv>
              </PlaceholderDiv>
            </PlaceholderDiv>
          </PlaceholderDiv>
          <Divider variant="fullWidth" component="span" />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
