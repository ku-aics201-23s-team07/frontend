import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";

export default function LandingPage() {
  return (
    <Box sx={{ ...styles.wrapper, ...styles.centerize }}>
      <Box sx={styles.container}>
        <TabHeader
          title={
            "7조 : Kickboard Searching & Recommending Service Using AVP Tree"
          }
        />
      </Box>
    </Box>
  );
}

const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "crimson",
  },
  centerize: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
    overflow: "hidden",
  },
};
