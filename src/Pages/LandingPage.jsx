import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function LandingPage() {
  return (
    <Box sx={{ ...styles.wrapper, ...styles.centerize }}>
      <Box sx={styles.container}>
        <Box
          sx={{
            width: "100%",
            height: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            paddingTop: 0,
            paddingBottom: 0,
            boxSizing: "border-box",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "rgb(255, 95, 87)",
                marginRight: 2,
              }}
            ></Box>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "rgb(255, 188, 46)",
                marginRight: 2,
              }}
            ></Box>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "rgb(42, 202, 65)",
                marginRight: 2,
              }}
            ></Box>
          </Box>
          <Box>
            <Typography sx={{ color: "#FFF", fontWeight: "bold" }}>
              7조 : Kickboard Searching & Recommending Service Using AVP Tree
            </Typography>
          </Box>
          <Box></Box>
        </Box>
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
