import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState} from "react";
import { LOCATION_INFO } from "../data/LOCATION_INFO";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, {Marker, Popup} from "!react-map-gl";

const useStyles = makeStyles(() => {
  return {
    scrollBar: {
      '&::-webkit-scrollbar': {
        height: '0.5rem'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#FF8040',
        borderRadius: '30px'
      }
    }
  };
});



const RenderButtonGrid = (props) => {
  const style = useStyles()
  const {organisations, mapRef} = props;

  const buttonGrid = organisations.map((org) => {
    return (
      <Button
        key={org.id}
        color='accent'
        sx={{mb: 1, minWidth: '5rem', flexShrink: '0'}}
        variant='text'
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
  return (
    <Box className={style.scrollBar} sx={{mx: {md: 0, xs: 3},width: "100%", justifyContent: "center", display: {xs: "none", sm: "inline-flex"}, maxWidth: '1100px', overflow: 'scroll hidden'}}>
      {buttonGrid}
    </Box>
  );
};
const RenderMobileBar = (props) => {
  const {organisations, mapRef} = props;
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
        width: '100%',
        backgroundColor: "lightBlack.main",
        display: {xs: "block", sm: "none"},
      }}
    >
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color='accent'
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {organisations.map((org) => {
          return (
            <MenuItem
              key={org.id}
              color='accent'
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

  const key = process.env.REACT_APP_MAPBOX_TOKEN;

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
  if (key != null) {
    return (
      <Grid container columnSpacing={1}>
        <Grid item xs={12} height='100%' display={'flex'} justifyContent={'center'}>
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
        <Grid item xs={12}>
          <Map
            ref={mapRef}
            initialViewState={viewport}
            style={{width: "100%", height: 350}}
            mapStyle='mapbox://styles/mapbox/light-v10'
            onViewportChange={(move) => setViewPort(move)}
            mapboxAccessToken={key}
          >
            {LOCATION_INFO.map((colaborator) => (
              <Marker
                color='#FF8040'
                key={colaborator.id}
                latitude={colaborator.latitude}
                longitude={colaborator.longitude}
              >
                <IconButton
                  onClick={() => {
                    setSelected(colaborator);
                  }}
                  color='accent'
                  size='large'
                  aria-haspopup='true'
                  onMouseEnter={(e) =>
                    handlePopoverOpen(e, colaborator.organisation)
                  }
                  onMouseLeave={handlePopoverClose}
                >
                  <LocationOnIcon fontSize='inerit' />
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
                <Typography variant='h4' align='center'>
                  {selected.organisation}
                </Typography>
                <Typography
                  sx={{fontStyle: "italic"}}
                  color='text.secondary'
                  align='center'
                  variant='caption'
                  gutterBottom
                >
                  Organisation located in {selected.city}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.primary'
                  align='justify'
                >
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
              <Typography sx={{p: 1}}>{popoverText}</Typography>
            </Popover>
          </Map>
        </Grid>
      </Grid>
    );
  } else {
    return <p>Loading map...</p>;
  }
}

export default InteractiveMap;
