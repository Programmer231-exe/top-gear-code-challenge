import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import validator from "validator";
import { usePageEffect } from "../core/page";
import {
  projectGlobalState,
  ProjectGlobalState,
  UserData,
} from "../core/state";
import { StyledBox } from "../styled-components";

interface FormStatus {
  error: string;
  loading: boolean;
}

const settingsFormStatus = atom<FormStatus>({
  key: "settingsFormStatus",
  default: { error: "", loading: false },
});

const settingsFormData = atom<UserData>({
  key: "settingsFormState",
  default: {
    first_name: "",
    last_name: "",
    user_id: "",
    email_address: "",
  },
});

export default function SettingsForm(): JSX.Element {
  usePageEffect({ title: "Login" });

  const { user } = useRecoilValue<ProjectGlobalState>(projectGlobalState);
  const [formData, setFormData] = useRecoilState<UserData>(settingsFormData);
  const [status, setStatus] = useRecoilState<FormStatus>(settingsFormStatus);

  useEffect(() => {
    if (user) {
      console.log(user);
      setFormData({
        ...user,
      });
    }
  }, []);

  const discardChanges = () => {
    setFormData({
      ...user,
    });
  };

  onsubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      validator.isEmpty(formData.user_id) ||
      validator.isEmpty(formData.email_address) ||
      validator.isEmpty(formData.first_name) ||
      validator.isEmpty(formData.last_name)
    ) {
      setStatus({
        error: "Fields cannot be empty",
        loading: false,
      });
    } else if (
      formData.user_id === user.user_id &&
      formData.email_address === user.email_address &&
      formData.first_name === user.first_name &&
      formData.last_name === user.last_name
    ) {
      alert("You forgot to make changes 🤔 ?");
    } else {
      setStatus({
        error: "",
        loading: true,
      });
      setTimeout(() => {
        alert("Changes saved successfully");
        setStatus({
          error: "",
          loading: false,
        });
      }, 3000);
    }
  };

  const onChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    console.log(target as unknown as string);
    setStatus({
      ...status,
      error: "",
    });
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  return (
    <Grid container component="form" rowSpacing={"30"} columnSpacing={"10"}>
      <Grid
        item
        sm={12}
        sx={{
          marginTop: "25px",
        }}
      >
        <Typography fontWeight={"bold"} fontSize={"16px"}>
          Account Information
        </Typography>
      </Grid>
      <Grid item sm={12}>
        {!validator.isEmpty(status.error) && (
          <StyledBox>
            <Typography fontSize="13px" fontWeight={"bold"} color="error">
              {status.error}
            </Typography>
          </StyledBox>
        )}
      </Grid>
      <Grid item sm={12}>
        <Grid container columnSpacing={"40"}>
          <Grid item sm={5.5}>
            <FormControl fullWidth={true}>
              <TextField
                sx={{
                  fontWeight: "bold",
                }}
                id="first_name"
                label="First Name"
                name="first_name"
                variant="standard"
                error={!validator.isEmpty(status.error)}
                value={formData.first_name}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item sm={5.5}>
            <FormControl fullWidth={true}>
              <TextField
                sx={{
                  fontWeight: "bold",
                }}
                id="last_name"
                label="Last Name"
                name="last_name"
                variant="standard"
                error={!validator.isEmpty(status.error)}
                value={formData.last_name}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          sm={11}
          sx={{
            marginTop: "20px",
          }}
        >
          <FormControl fullWidth={true}>
            <TextField
              sx={{
                fontWeight: "bold",
              }}
              id="user_id"
              label="Username"
              name="user_id"
              variant="standard"
              error={!validator.isEmpty(status.error)}
              value={formData.user_id}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          sm={11}
          sx={{
            marginTop: "20px",
          }}
        >
          <FormControl fullWidth={true}>
            <TextField
              sx={{
                fontWeight: "bold",
              }}
              id="user_id"
              label="Email Address"
              name="email_address"
              variant="standard"
              error={!validator.isEmpty(status.error)}
              value={formData.email_address}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item sm={4}>
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
            {status.loading ? "SAVING..." : "SAVE CHANGES"}
          </Typography>
        </LoadingButton>
      </Grid>
      <Grid item sm={4}>
        <Button
          sx={{
            margin: "10px 0px",
            ":disabled": {
              color: "primary",
            },
          }}
          color="secondary"
          variant="contained"
          fullWidth={true}
          onClick={discardChanges}
        >
          <Typography
            sx={{ margin: "5px" }}
            fontWeight={"bold"}
            fontSize="12px"
          >
            DISCARD CHANGES
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
