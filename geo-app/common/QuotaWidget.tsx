import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import validator from "validator";
import { ProjectGlobalState, projectGlobalState } from "../core/state";
import { PlaceholderDiv } from "../styled-components";
const QuoteWidget = () => {
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
      {globalState.loading ? <DetailsPlaceholder /> : <QuotaComponent />}
    </React.Fragment>
  );
};

const QuotaComponent = () => {
  const { quote } = useRecoilValue<ProjectGlobalState>(projectGlobalState);

  return (
    <Grid container>
      <Grid item sm={12} sx={{ margin: "5px" }}>
        <Typography fontWeight={"bold"}>Search Quote</Typography>
      </Grid>
      <Grid
        item
        sm={12}
        sx={{
          padding: "10px",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress
            color={quote.searchCount > 0 ? "success" : "grey"}
            thickness={8}
            variant="determinate"
            size={150}
            value={quote.searchCount > 0 ? quote.searchCount * 4 : 100}
          />
          <Typography
            position="absolute"
            textAlign="center"
            fontWeight="bold"
            fontSize={"24px"}
          >
            {`${quote.searchCount}/25`}
            <Typography
              textAlign="center"
              fontWeight="lighter"
              fontSize={"12px"}
            >
              searches
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={12}>
        <Typography fontSize={"14px"} fontWeight={"bold"} textAlign={"center"}>
          You have {25 - quote.searchCount} more searches left.
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Button
          startIcon={<AddIcon />}
          sx={{
            marginLeft: "20px",
            marginRight: "5px",
            marginTop: "10px",
            width: "90%",
          }}
          variant="contained"
        >
          <Typography textAlign="center" fontSize={"10px"} fontWeight={"bold"}>
            Search
          </Typography>
        </Button>
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
      <PlaceholderDiv className="ph-col-2 empty"></PlaceholderDiv>
      <PlaceholderDiv className="ph-col-6">
        <ImgPHContainer className="ph-avatar"></ImgPHContainer>
      </PlaceholderDiv>
      <PlaceholderContainer className="ph-col-12">
        <PlaceholderDiv className="ph-row">
          <PlaceholderDiv className="ph-col-12 big"></PlaceholderDiv>
          <PlaceholderDiv className="ph-col-12 big"></PlaceholderDiv>
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
  border-radius: "100%";
  background-color: "green";
  margin: 0;
  padding: 0;
  max-height: 20vh;
  color: white;
`;

export default QuoteWidget;
