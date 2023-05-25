import Box from "@mui/material/Box";
import BasicCard from "./BasicCard";

export default function Sidebar({ navigate }) {
  return (
    <Box
      sx={{
        ...styles.sidebarWrapper,
        ...styles.centerize,
      }}
    >
      <BasicCard
        width="80%"
        height={200}
        prefix="Main Feature"
        title="킥보드 탐색"
        description="AVL Tree를 기반으로, 사용자 위치 기준 가장 적합한 킥보드를 탐색"
      />
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
    height: "100%",
    borderRight: "1px solid gray",

    flexWrap: "wrap",
    oevrflow: "scroll",
  },
};
