import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [items, setItems] = useState([]);

  // set sidebar items
  useEffect(() => {
    setItems([
      {
        title: "킥보드 탐색",
        description:
          "AVL Tree를 기반으로, 사용자 위치 기준 가장 적합한 킥보드를 탐색",
        link: "/",
      },
      {
        title: "킥보드 정렬",
        description: "AVL Tree를 기반으로, 현재 킥보드 데이터셋 트리를 재구성",
        link: "/sort",
      },
      {
        title: "킥보드 수정",
        description: "킥보드 데이터를 생성 또는 삭제",
        link: "/update",
      },
    ]);
  }, []);

  return (
    <Box sx={{ ...styles.wrapper, ...styles.centerize }}>
      <Box className={"glassmorphism"} sx={styles.container}>
        {/* <Box sx={styles.container}> */}
        <TabHeader
          title={
            "7조 : Kickboard Searching & Recommending Service Using AVP Tree"
          }
        />
        <Sidebar items={items} />
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
    overflow: "hidden",
  },
};
