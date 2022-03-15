import React, {Fragment, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import MetaData from "../MetaData";
import { Room } from "@material-ui/icons";

function Location() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 33.9889699,
    longitude: -5.0009745,
    zoom: 17,
  });


  return (
    <Fragment>
       <MetaData title="Location" />

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoieGVub3M5NjgiLCJhIjoiY2t6NW4wZ24yMGhiOTJ4cGs3N205Y2xhbSJ9.jYtDlQ5nCL3vk5wkqLohLA"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
        <Marker
          latitude={33.988904}
          longitude={-5.002143}
          offsetLeft={-20}
          offsetTop={-10}
          anchor="bottom"
        >
          <Room style={{ fontSize: viewport.zoom * 4, color: "tomato" }} />
        </Marker>
        <NavigationControl />
      </ReactMapGL>
    </Fragment>
  );
}

export default Location;
