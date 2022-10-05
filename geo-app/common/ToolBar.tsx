import styled from "@emotion/styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { NavigationProps, PATH_NAMES } from "../core/geo_app_types";
import { ProjectGlobalState, projectGlobalState } from "../core/state.js";
import { StyledIconButton } from "../styled-components";

const ToolBarWindow = styled("div")`
  background-color: #333333;
  height: 83vh;
  margin: 5px 0;
  border-radius: 0 10px 10px 0;
  display: flex;
  flex: inline-block;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 15vh;
`;

const ToolBar = ({ navigation }: { navigation: NavigationProps }) => {
  const { location, navigate } = navigation;
  const [globalState, setGlobalState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);

  const navAction = (path: string) => {
    console.log(path);
    navigate(path);
  };

  const signingOut = () => {
    let confirmation = confirm("You are about to sign out 😢");
    if (confirmation) {
      setGlobalState({
        ...globalState,
        loading: true,
      });
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <ToolBarWindow>
      <StyledIconButton
        name="dashboard-button"
        __active_bgcolor="black"
        __active_color="white"
        __default_color="grey"
        __selected={
          PATH_NAMES.DASHBOARD === location.pathname ||
          PATH_NAMES.DEFAULT === location.pathname
        }
        onClick={() => navAction(PATH_NAMES.DASHBOARD)}
      >
        <DashboardIcon fontSize="large" />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => navAction(PATH_NAMES.SEARCH)}
        __active_bgcolor="black"
        __active_color="white"
        __default_color="grey"
        __selected={PATH_NAMES.SEARCH === location.pathname}
      >
        <SearchIcon fontSize="large" />
      </StyledIconButton>
      <StyledIconButton
        __active_bgcolor="black"
        __active_color="white"
        __default_color="grey"
        onClick={() => navAction(PATH_NAMES.SETTINGS)}
        __selected={PATH_NAMES.SETTINGS === location.pathname}
      >
        <SettingsIcon fontSize="large" />
      </StyledIconButton>
      <StyledIconButton
        __active_bgcolor="black"
        __active_color="white"
        __default_color="grey"
        sx={{
          marginTop: "20vh",
        }}
        __selected={false}
        onClick={signingOut}
      >
        <LogoutIcon fontSize="medium" />
      </StyledIconButton>
    </ToolBarWindow>
  );
};

export default ToolBar;
