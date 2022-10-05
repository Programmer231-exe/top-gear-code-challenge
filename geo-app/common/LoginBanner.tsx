import styled from "@emotion/styled";
import { Card, CardHeader, CardMedia } from "@mui/material";
import * as React from "react";
import Carousel from "react-material-ui-carousel";

const Container = styled("div")`
  background-image: url("/background_login.png");
  background-size: cover;
  text-align: center;
  vertical-align: middle;
  height: 100vh;
`;

const StyledCarousel = styled(Carousel)`
  padding-top: 25%;
  width: 50%;
  margin: auto;
  background-color: black;
  color: white;
`;

const StyledCardHeader = styled(CardHeader)`
  background-color: black;
  color: white;
`;

let items = [
  {
    title: "Intuitive Dashboard #1",
    description:
      "Redefining the geospatial experience to make it easy to use for all levels of users, including non-technical ones.",
    url: "/carousel.png",
  },
  {
    title: "Intuitive Dashboard #2",
    description:
      "Redefining the geospatial experience to make it easy to use for all levels of users, including non-technical ones.",
    url: "/carousel.png",
  },
  {
    title: "Intuitive Dashboard #3",
    description:
      "Redefining the geospatial experience to make it easy to use for all levels of users, including non-technical ones.",
    url: "/carousel.png",
  },
];

const LoginCarousel = (): JSX.Element => {
  return (
    <Container>
      <StyledCarousel
        animation="slide"
        duration={500}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#4472c4",
          },
        }}
      >
        {items.map((item, i) => (
          <Card key={i}>
            <CardMedia component="img" image={item.url} />
            <StyledCardHeader title={item.title} subheader={item.description} />
          </Card>
        ))}
      </StyledCarousel>
    </Container>
  );
};

export default LoginCarousel;
