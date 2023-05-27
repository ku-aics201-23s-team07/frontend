import Box from "@mui/material/Box";
import BasicCard from "./BasicCard";
import { useState, useEffect } from "react";

export default function Sidebar({ items }) {
  return (
    <Box
      sx={{
        ...styles.sidebarWrapper,
        ...styles.centerize,
        paddingTop: 2,
      }}
    >
      {items?.map((item) => (
        <BasicCard
          width="80%"
          height={200}
          prefix="Main Feature"
          title={item.title}
          description={item.description}
          destination={item.link}
        />
      ))}
    </Box>
  );
}

const styles = {
  centerize: {
    display: "flex",
    justifyContent: "center",
  },
  sidebarWrapper: {
    width: "20%",
    height: "calc(100% - 56px)",
    borderRight: "2px solid crimson",

    flexWrap: "wrap",
    overflow: "scroll",
  },
};
