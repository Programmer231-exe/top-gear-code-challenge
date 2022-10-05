import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, IconButton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { atom, useRecoilState } from "recoil";
import validator from "validator";
import { NavigationProps } from "../core/geo_app_types";
import { usePageEffect } from "../core/page";
import { StyledBox } from "../styled-components";

interface PasswordChangeStatus {
  error: string;
  loading: boolean;
}

interface PasswordChangeData {
  email: string;
}

const fpData = atom<PasswordChangeData>({
  key: "passwordChangeState",
  default: { email: "" },
});

const fpStatus = atom<PasswordChangeStatus>({
  key: "fpStatusState",
  default: {
    error: "",
    loading: false,
  },
});

export default function ForgotPasswordForm({
  navigation,
}: {
  navigation: NavigationProps;
}): JSX.Element {
  usePageEffect({ title: "Forgot Password 🔐" });

  const { navigate } = navigation;

  const goBack = () => {
    navigate("/login");
  };

  const [formData, setFormData] = useRecoilState<PasswordChangeData>(fpData);
  const [status, setStatus] = useRecoilState<PasswordChangeStatus>(fpStatus);

  onsubmit = (e) => {
    e.preventDefault();
    console.log("form is submitted", validator.isEmpty(formData.email));
    if (
      validator.isEmpty(formData.email) ||
      !validator.isEmail(formData.email)
    ) {
      setStatus({
        error: "Please enter the valid email address",
        loading: false,
      });
    } else {
      setStatus({
        error: "",
        loading: true,
      });
      setTimeout(() => {
        setStatus({
          error: "",
          loading: false,
        });
        navigate("/login");
      }, 2000);
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
      <StyledBox>
        <IconButton aria-label="go-back" onClick={goBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography display={"inline"} fontWeight={"bold"}>
          Forgot Password
        </Typography>
      </StyledBox>
      <StyledBox>
        <Typography
          fontWeight={"bold"}
          fontSize={"14px"}
          color={"rgba(0,0,0,0.6)"}
        >
          please enter your email address. You will receive a link to create a
          new password via email.
        </Typography>
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
            id="email"
            label="Email Address"
            name="email"
            error={!validator.isEmpty(status.error)}
            value={formData.email}
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
            {status.loading ? "SENDING AN EMAIL...." : "RESET PASSWORD"}
          </Typography>
        </LoadingButton>
      </StyledBox>
    </Box>
  );
}
