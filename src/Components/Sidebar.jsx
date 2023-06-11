import Box from "@mui/material/Box";
import BasicCard from "./BasicCard";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([
      {
        title: "킥보드 탐색",
        description:
          "AVL Tree를 기반으로, 사용자 위치 기준 가장 적합한 킥보드를 탐색",
        link: "/",
      },
      {
        title: "가까운 킥보드",
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
