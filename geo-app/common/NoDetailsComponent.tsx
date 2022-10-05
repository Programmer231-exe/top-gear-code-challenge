import { Box, Typography } from "@mui/material";

const NoDetailsComponent = ({
  Icon,
  paddingTop,
}: {
  Icon: JSX.Element;
  paddingTop: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAligh: "center",
        alignItems: "center",
        verticalAlign: "center",
        paddingTop: `${paddingTop}`,
      }}
    >
      <Icon fontSize={"large"} />
      <Typography fontWeight={"bold"}>You have no projects</Typography>
      <Typography fontSize={"12px"}>
        When you have, you will see them here
      </Typography>
    </Box>
  );
};

export default NoDetailsComponent;
