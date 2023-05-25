import Box from "@mui/material/Box";
import BasicCard from "./BasicCard";

export default function Sidebar() {
  return (
    <Box
      sx={{
        ...styles.sidebarWrapper,
        ...styles.centerize,
        paddingTop: 2,
      }}
    >
      <BasicCard
        width="80%"
        height={200}
        prefix="Main Feature"
        title="킥보드 탐색"
        description="AVL Tree를 기반으로, 사용자 위치 기준 가장 적합한 킥보드를 탐색"
        destination="/"
      />
      <BasicCard
        width="80%"
        height={200}
        prefix="Main Feature"
        title="킥보드 정렬"
        description="AVL Tree를 기반으로, 현재 킥보드 데이터셋 트리를 재구성"
        destination="/sort"
      />
      <BasicCard
        width="80%"
        height={200}
        prefix="Main Feature"
        title="킥보드 수정"
        description="킥보드 데이터를 생성 또는 삭제"
        destination="/update"
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
    height: "calc(100% - 56px)",
    borderRight: "2px solid crimson",

    flexWrap: "wrap",
    overflow: "scroll",
  },
};
