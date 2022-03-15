import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from "react-router-dom";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Achraf Bouisk & Mohammed Dergham</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is our project made by @Achraf Bouisk & Mohammed Dergham.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Get Location</Typography>
            <Link to="/location">
              <LocationOnIcon className="locationSvgIcon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
