import LoadingButton from "@mui/lab/LoadingButton";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import validator from "validator";
import { signIn, UserCredentials } from "../core/auth";
import { NavigationProps } from "../core/geo_app_types";
import { usePageEffect } from "../core/page";
import { ProjectGlobalState, projectGlobalState } from "../core/state.js";
import { StyledBox } from "../styled-components";

interface LoginStatus {
  error: string;
  loading: boolean;
}

const credentials = atom<UserCredentials>({
  key: "credentialsState",
  default: { username: "", password: "" },
});

const loginStatus = atom<LoginStatus>({
  key: "statusState",
  default: {
    error: "",
    loading: false,
  },
});

export default function LoginForm({
  navigation,
}: {
  navigation: NavigationProps;
}): JSX.Element {
  usePageEffect({ title: "Login" });
  const { navigate } = navigation;
  const authentication = localStorage.getItem("authentication");
  const [globalState, setGlobalState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);

  console.log("authentication:", authentication);
  const onForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  useEffect(() => {
    console.log("effect bloc");
    if (authentication && authentication === "true") {
      setGlobalState({
        ...globalState,
        loading: true,
      });
      console.log("use effect being called");
      navigate("/dashboard");
    }
  }, [authentication]);
  const [formData, setFormData] = useRecoilState<UserCredentials>(credentials);
  const [status, setStatus] = useRecoilState<LoginStatus>(loginStatus);

  onsubmit = (e) => {
    e.preventDefault();
    console.log("form is submitted", validator.isEmpty(formData.username));
    if (
      validator.isEmpty(formData.username) ||
      validator.isEmpty(formData.password)
    ) {
      console.log("This is error block");
      setStatus({
        error: "Username or Password cannot be empty",
        loading: false,
      });
    } else {
      setStatus({
        error: "",
        loading: true,
      });
      signIn(formData, setStatus, navigate);
    }
  };

  const onChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    console.log(target as unknown as string);
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  return (
    <Box
      component="form"
      sx={{
        margin: "25%",
        marginTop: "5%",
        marginBottom: "20%",
      }}
    >
      <StyledBox textalignment="center"></StyledBox>
      <StyledBox>
        <Typography fontWeight={"bold"}>Login</Typography>
      </StyledBox>
      {!validator.isEmpty(status.error) && (
        <StyledBox>
          <Typography fontSize="13px" fontWeight={"bold"} color="error">
            {status.error}
          </Typography>
        </StyledBox>
      )}
      <StyledBox>
        <FormControl fullWidth={true}>
          <TextField
            id="username"
            label="Username"
            name="username"
            error={!validator.isEmpty(status.error)}
            value={formData.username}
            variant="standard"
            InputLabelProps={{
              shrink: true,
              color: "primary",
            }}
            onChange={onChange}
          />
        </FormControl>
      </StyledBox>
      <StyledBox>
        <FormControl fullWidth={true}>
          <TextField
            sx={{
              fontWeight: "bold",
            }}
            id="password"
            label="Password"
            name="password"
            variant="standard"
            error={!validator.isEmpty(status.error)}
            value={formData.password}
            inputProps={{
              type: "password",
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </FormControl>
      </StyledBox>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                fontSize: "10px",
              }}
            />
          }
          label={<Typography fontSize="12px">Remember Me</Typography>}
        />
      </Box>
      <StyledBox>
        <LoadingButton
          sx={{
            margin: "10px 0px",
            ":disabled": {
              color: "primary",
            },
          }}
          color="primary"
          type="submit"
          loading={status.loading}
          loadingPosition="start"
          startIcon={<React.Fragment />}
          variant="contained"
          fullWidth={true}
        >
          <Typography
            sx={{ margin: "5px" }}
            fontWeight={"bold"}
            fontSize="12px"
          >
            {status.loading ? "LOGGING IN..." : "LOG IN"}
          </Typography>
        </LoadingButton>
      </StyledBox>
      <StyledBox textalignment="center">
        <Typography
          component={"a"}
          onClick={onForgotPasswordClick}
          fontWeight="bold"
          color="rgba(0,0,0,0.7)"
          fontSize="14px"
        >
          Forgot Password
        </Typography>
      </StyledBox>
    </Box>
  );
}
