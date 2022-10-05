import styled from "@emotion/styled";
import MapIcon from "@mui/icons-material/Map";
import React, { useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useRecoilState, useRecoilValue } from "recoil";
import validator from "validator";
import { callMapAPI } from "../core/apicalls";
import { ProjectGlobalState, projectGlobalState } from "../core/state";
import NoDetailsComponent from "./NoDetailsComponent";

const MapWidget = () => {
  const globalState = useRecoilValue<ProjectGlobalState>(projectGlobalState);

  return (
    <React.Fragment>
      {globalState.loading ? (
        <MapPlaceHolder>New York</MapPlaceHolder>
      ) : !validator.isEmpty(globalState.selectedProject) ? (
        <MapComponent />
      ) : (
        <NoDetailsComponent paddingTop="25%" Icon={MapIcon} />
      )}
    </React.Fragment>
  );
};
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/north-america.json";

const MapComponent = () => {
  const [globalState, setGlobalState] =
    useRecoilState<ProjectGlobalState>(projectGlobalState);

  useEffect(() => {
    callMapAPI(globalState, setGlobalState);
  }, []);

  return (
    <StyledDiv>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {globalState?.mapData?.circleCoordinates?.map((e: any) => {
          console.log(e.coordinate, "seri");
          return (
            <Marker key={"key"} coordinates={[-74, 70]}>
              <circle r={"50"} fill="rgba(0,0,155,0.3)" />
            </Marker>
          );
        })}
        ;
      </ComposableMap>
    </StyledDiv>
  );
};

const MapPlaceHolder = styled("div")`
  text-align: center;
  padding-top: 20%;
`;

const StyledDiv = styled("div")`
  max-height: 55vh;
  overflow: hidden;
`;

const StyledCircle = styled("circle")`
  background: transparent;
  position: relative;
  z-index: 100;
`;

export default MapWidget;
