import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useCallback, useEffect, useState } from "react";

const { kakao } = window;

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

  useEffect(() => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
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
        <Box sx={{ width: "100%", display: "flex" }}>
          <Sidebar items={items} />
          <Box
            sx={{
              width: "80%",
              height: "calc(100%-40px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="map"
              style={{
                width: "80%",
                height: "80%",
                backgroundColor: "#777",
                borderRadius: 3,
              }}
            />
          </Box>
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
    overflow: "hidden",
  },
};
