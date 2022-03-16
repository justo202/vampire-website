
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";

import {
  IconButton,
  Typography,
  Popover,
  Grid,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {getFunctions, httpsCallable} from "firebase/functions";
import {app} from "../firebase";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { Marker, Popup } from "!react-map-gl";

const functions = getFunctions(app, "europe-west2");
const get_token = httpsCallable(functions, "get_token")
const LOCATION_INFO = [
  {
    latitude: 55.953252,
    longitude: 3.188267,
    description: "This is Edinburgh",
    organisation: "Edinburgh",
    city: "Edinburgh",
    id: 0,
  },
  {
    latitude: 56.46127,
    longitude: -2.9676,
    description: "This is Dundee",
    organisation: "Dundee",
    city: "Dundee",
    id: 1,
  },
  {
    latitude: 55.864237,
    longitude: -4.251806,
    description: "This is Glasgow",
    organisation: "Glasgow",
    city: "Glasgow",
    id: 2,
  },
  {
    latitude: 51.507351,
    longitude: -0.127758,
    description:
      "This is London awet waiut aituh aiwehut pae pawiu aiwu hiuwah touawo awoiu awja isa j",
    organisation: "London",
    city: "London",
    id: 3,
  },
];

const RenderButtonGrid = (props) => {
  const { organisations, mapRef } = props;

  const buttonGrid = organisations.map((org) => {
    return (
      <Button
        key={org.id}
        color="accent"
        sx={{ mb: 1, display: { xs: "none", sm: "block" } }}
        fullWidth
        variant="outlined"
        onClick={() =>
          mapRef.current.flyTo({
            center: [org.longitude, org.latitude],
            zoom: 8,
          })
        }
      >
        {org.organisation}
      </Button>
    );
  });
  return buttonGrid;
};
const RenderMobileBar = (props) => {
  const { organisations, mapRef } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "accent.main",
        display: { xs: "block", sm: "none" },
      }}
    >
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {organisations.map((org) => {
          return (
            <MenuItem
              key={org.id}
              color="accent"
              onClick={() => {
                mapRef.current.flyTo({
                  center: [org.longitude, org.latitude],
                  zoom: 8,
                });
                handleClose();
              }}
            >
              {org.organisation}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

function InteractiveMap(props) {

  const [key, setKey] = useState(null)
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverText, setpopoverText] = useState(null);

  const handlePopoverOpen = (event, text) => {
    setAnchorEl(event.currentTarget);
    setpopoverText(text);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const mapRef = React.createRef();
  const [viewport, setViewPort] = useState({
    longitude: -3.954546,
    latitude: 55.537981,
    zoom: 5,
    attributionControl: false,
  });
  const [selected, setSelected] = useState(null);
 
  useEffect(() => get_token({name: 'REACT_APP_MAPBOX_TOKEN'}).then(result =>  setKey(result.data.result)))

   if(key != null)
   {
return (
    
    <Grid container columnSpacing={1}>
      <Grid item xs={12} sm={3}>
        <RenderButtonGrid
          organisations={LOCATION_INFO}
          mapRef={mapRef}
          setViewPort={() => setViewPort()}
        />
        <RenderMobileBar
          organisations={LOCATION_INFO}
          mapRef={mapRef}
          setViewPort={() => setViewPort()}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Map
          ref={mapRef}
          initialViewState={viewport}
          style={{ width: "100%", height: 600 }}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={(move) => setViewPort(move)}
          mapboxAccessToken={key}
         
         
          
        >
          {LOCATION_INFO.map((colaborator) => (
            <Marker
              color="#FF8040"
              key={colaborator.id}
              latitude={colaborator.latitude}
              longitude={colaborator.longitude}
            >
              <IconButton
                onClick={() => {
                  setSelected(colaborator);
                }}
                color="accent"
                size="large"
                aria-haspopup="true"
                onMouseEnter={(e) =>
                  handlePopoverOpen(e, colaborator.organisation)
                }
                onMouseLeave={handlePopoverClose}
              >
                <LocationOnIcon fontSize="inerit" />
              </IconButton>
            </Marker>
          ))}
          {selected ? (
            <Popup
              closeOnClick={false}
              onClose={() => setSelected(null)}
              latitude={selected.latitude}
              longitude={selected.longitude}
            >
              <Typography variant="h4" align="center">
                {selected.organisation}
              </Typography>
              <Typography
                sx={{ fontStyle: "italic" }}
                color="text.secondary"
                align="center"
                variant="caption"
                gutterBottom
              >
                Organisation located in {selected.city}
              </Typography>
              <Typography variant="body2" color="text.primary" align="justify">
                {selected.description}
              </Typography>
            </Popup>
          ) : null}

          <Popover
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{popoverText}</Typography>
          </Popover>
        </Map>
      </Grid>
    </Grid>
  );
          }
          else {
            return(<p>Loading map...</p>)
          }

}

export default InteractiveMap;
