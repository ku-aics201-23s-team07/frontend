import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useCallback, useEffect, useState } from "react";

import * as API from "../api";

const { kakao } = window;

export default function LandingPage() {
  const [items, setItems] = useState([]);
  const [icon, setIcon] = useState();
  const [map, setMap] = useState();
  const [markerList, setMarkerList] = useState([]);
  const [reloader, reload] = useState(true);

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
    markerLoader();
  }, []);

  const markerLoader = async () => {
    const res = await API.get("api/location/list");
    setMarkerList(res.data.message);
  };

  const mapDrawer = useCallback(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(36.6105, 127.287), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    const icon = new kakao.maps.MarkerImage(
      "/kickboard-blackbg.png",
      new kakao.maps.Size(33, 47),
      {
        offset: new kakao.maps.Point(16, 34),
        alt: "킥보드",
        shape: "poly",
      }
    );

    setIcon(icon);

    markerList.forEach((group) => {
      const markerPosition = new kakao.maps.LatLng(
        group.latitude ?? 33.450701,
        group.longitude ?? 126.570667
      );

      //New Marker
      const newMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: icon,
      });

      //Float the Marker
      newMarker.setMap(map);
    });
  });

  useEffect(() => {
    mapDrawer();
  }, [reload, markerList]);

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
            <Button
              sx={{
                position: "absolute",
                right: 10,
                bottom: 10,
                backgroundColor: "#000",
              }}
              onClick={() => {
                reload((prev) => !prev);
              }}
            >
              <Typography sx={{ color: "#FFF" }}>Reload</Typography>
            </Button>
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
