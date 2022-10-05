import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

interface ButtonProps {
  __selected: boolean;
  __active_bgcolor: string;
  __active_color: string;
  __default_color: string;
}
const StyledIconButton = styled(IconButton)<ButtonProps>`
  border-radius: 0;
  background-color: ${(props) =>
    props.__selected ? props.__active_bgcolor : "parent"};
  color: ${(props) =>
    props.__selected ? props.__active_color : props.__default_color};
`;

export default StyledIconButton;
