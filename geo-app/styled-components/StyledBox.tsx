import styled from "@emotion/styled";
import { Box } from "@mui/material";

interface Props {
  textalignment?: string;
}
const StyledBox = styled(Box)<Props>`
  & + & {
    margin: 20px 0;
  }
  &:last {
    font-weight: bold;
  }
  text-align: ${(props: Props) => props.textalignment || "left"};
`;

export default StyledBox;
