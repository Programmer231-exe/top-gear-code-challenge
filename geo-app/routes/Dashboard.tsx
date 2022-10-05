import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import MapWidget from "../common/MapWidget";
import ProjectDetails from "../common/ProjectDetails";
import ProjectTab from "../common/Projects";
import QuotaWidget from "../common/QuotaWidget";
interface ContainerProps {
  height: string;
}
const Container = styled("div")<ContainerProps>`
  width: 100%;
  background-color: #f6f7fb;
  margin-top: 0.9vh;
  border-radius: 10px;
  margin-left: 5px;
  height: ${(props) => props.height};
`;
export default function Dashboard(): JSX.Element {
  return (
    <Grid container columnSpacing={2}>
      <Grid item sm={5}>
        <Container height="98vh">
          <ProjectTab />
        </Container>
      </Grid>
      <Grid item sm={6.8}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid item sm={12}>
            <Grid container columnSpacing={2}>
              <Grid item sm={6}>
                <Container height="40vh">
                  <ProjectDetails />
                </Container>
              </Grid>
              <Grid item sm={6}>
                <Container height="40vh">
                  <QuotaWidget />
                </Container>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Container height="56vh">
              <MapWidget />
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
