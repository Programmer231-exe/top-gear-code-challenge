import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import validator from "validator";
import { deleteProject, renameProject } from "../core/apicalls";
import {
  dialogueState,
  DialogueState,
  menuState,
  MenuState,
  ProjectGlobalState,
  projectGlobalState,
} from "../core/state";
import { StyledBox } from "../styled-components";

const ProjectMenuOption = () => {
  const [menuOptionState, setMenuOptionState] =
    useRecoilState<MenuState>(menuState);
  const [dialogueStatus, setDialogueState] =
    useRecoilState<DialogueState>(dialogueState);

  const handleClose = () => {
    setMenuOptionState({
      anchorEl: null,
      open: false,
    });
  };

  const onClick = (action: string) => {
    if (action === "rename") {
      setDialogueState({
        ...dialogueStatus,
        rename: true,
      });
    }

    if (action === "delete") {
      setDialogueState({
        ...dialogueStatus,
        delete: true,
      });
    }
    handleClose();
  };
  return (
    <Menu
      id="basic-menu"
      anchorEl={menuOptionState.anchorEl}
      open={menuOptionState.open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem>
        <Button
          onClick={() => onClick("rename")}
          name="delete_button"
          startIcon={<ModeEditOutlineIcon />}
        >
          <Typography
            fontSize={"13px"}
            fontStyle="normal"
            color="rgb(0,0,0,0.7)"
            variant="subtitle2"
            textTransform={"capitalize"}
          >
            rename project
          </Typography>
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          onClick={() => onClick("delete")}
          name="delete_button"
          startIcon={<DeleteIcon htmlColor="red" />}
        >
          <Typography
            fontSize={"12px"}
            fontStyle="normal"
            color="rgb(0,0,0,0.7)"
            textTransform={"capitalize"}
          >
            Delete Project
          </Typography>
        </Button>
      </MenuItem>
    </Menu>
  );
};

const DeleteConfirmationCheck = () => {
  const { selectedProject } =
    useRecoilValue<ProjectGlobalState>(projectGlobalState);
  const [dialogueStatus, setDialogueState] =
    useRecoilState<DialogueState>(dialogueState);
  const [data, setData] = useState({
    projectName: "",
    error: "",
  });

  const handleClose = () => {
    setData({
      projectName: "",
      error: "",
    });
    setDialogueState({
      ...dialogueStatus,
      delete: false,
    });
  };

  const onChange = ({
    target,
  }: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSubmit = () => {
    if (selectedProject === data.projectName) {
      deleteProject();
      handleClose();
    } else {
      setData({
        ...data,
        error: "Operation not valid",
      });
    }
  };
  return (
    <Dialog
      sx={{
        ":root": {
          width: "70%",
          maxWidth: "80%",
        },
      }}
      open={dialogueStatus.delete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle
        id="confirmation-dialog"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={"bold"} marginRight={"50%"}>
          Delete Confirmation
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <StyledBox>
          <Typography fontSize={"14px"}>
            This will delete project{" "}
            <Typography
              fontWeight={"bold"}
              display={"inline"}
              fontSize={"16px"}
            >
              "{selectedProject}"
            </Typography>{" "}
            from your library. To confirm deletion, type the project name in the
            input field
          </Typography>
        </StyledBox>
        <StyledBox>
          <FormControl fullWidth={true}>
            <TextField
              id="project-name"
              label="Type the project name here"
              name="projectName"
              value={data.projectName}
              error={!validator.isEmpty(data.error)}
              helperText={data.error}
              variant="standard"
              InputLabelProps={{
                shrink: true,
                color: "primary",
              }}
              onChange={onChange}
            />
          </FormControl>
        </StyledBox>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">
          <Typography
            fontWeight={"bold"}
            fontSize={"14px"}
            onClick={handleClose}
          >
            No, Cancel
          </Typography>
        </Button>
        <Button variant="contained" color="error">
          <Typography
            fontWeight={"bold"}
            fontSize={"14px"}
            onClick={handleSubmit}
          >
            Yes, Delete
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RenameConfirmationCheck = () => {
  const { selectedProject } =
    useRecoilValue<ProjectGlobalState>(projectGlobalState);
  const [dialogueStatus, setDialogueState] =
    useRecoilState<DialogueState>(dialogueState);
  const [data, setData] = useState({
    projectName: "",
    error: "",
  });

  const handleClose = () => {
    setDialogueState({
      ...dialogueStatus,
      rename: false,
    });
  };

  const onChange = ({
    target,
  }: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSubmit = () => {
    if (!validator.isEmpty(data.projectName)) {
      renameProject();
      handleClose();
    } else {
      setData({
        ...data,
        error: "Operation not valid",
      });
    }
  };
  return (
    <Dialog
      sx={{
        ":root": {
          width: "70%",
          maxWidth: "80%",
        },
      }}
      open={dialogueStatus.rename}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <DialogTitle
        id="confirmation-dialog"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={"bold"}>Rename "{selectedProject}"</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <StyledBox>
          <FormControl fullWidth={true}>
            <TextField
              id="project-name"
              label="Type the project name here"
              name="projectName"
              value={data.projectName}
              error={!validator.isEmpty(data.error)}
              helperText={data.error}
              variant="standard"
              InputLabelProps={{
                shrink: true,
                color: "primary",
              }}
              onChange={onChange}
            />
          </FormControl>
        </StyledBox>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">
          <Typography
            fontWeight={"bold"}
            fontSize={"14px"}
            onClick={handleClose}
          >
            No, Cancel
          </Typography>
        </Button>
        <Button variant="contained" color="error">
          <Typography
            fontWeight={"bold"}
            fontSize={"14px"}
            onClick={handleSubmit}
          >
            Yes, Rename
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default () => {
  return (
    <React.Fragment>
      <ProjectMenuOption />
      <DeleteConfirmationCheck />
      <RenameConfirmationCheck />
    </React.Fragment>
  );
};
