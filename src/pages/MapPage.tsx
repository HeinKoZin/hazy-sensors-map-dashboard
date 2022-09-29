import Voronoi from "@components/Voronoi";
import { Box, Typography } from "@mui/material";
import React from "react";

const MapPage = () => {
  return (
    <Box
      sx={{
        height: `calc(100% - 64px)`,
        width: "100%",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.0308636868076!2d96.07702741534915!3d16.8743677218381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1951a22ab3f19%3A0x4ee3872256ed81a!2sAsxox%20Online%20Shopping!5e0!3m2!1sen!2smm!4v1664385998101!5m2!1sen!2smm"
            loading="lazy"
            width={1000}
            height={800}
          ></iframe>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 1000,
            height: 800,
          }}
        >
          <Voronoi width={1400} height={800} />
        </Box>
      </Box>
    </Box>
  );
};

export default MapPage;
