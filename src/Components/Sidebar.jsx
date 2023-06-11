import Box from "@mui/material/Box";
import BasicCard from "./BasicCard";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([
      {
        title: "킥보드 탐색",
        description: "AVL Tree에 있는 모든 킥보드 탐색, 출력",
        link: "/",
      },
      {
        title: "가까운 킥보드",
        description:
          "AVL Tree를 기반으로, 사용자 위치 기준 가장 가까운 킥보드 탐색",
        link: "/sort",
      },
      {
        title: "새로운 킥보드",
        description: "킥보드 데이터를 생성",
        link: "/new",
      },
    ]);
  }, []);
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
