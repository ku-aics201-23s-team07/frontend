import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useCallback, useEffect, useState } from "react";

import * as API from "../api";

const { kakao } = window;

export default function LandingPage() {
  const [markerList, setMarkerList] = useState([]);

  // set sidebar items
  useEffect(() => {
    markerLoader();
  }, []);

  const markerLoader = async () => {
    const res = await API.get("api/location/list");
    setMarkerList(res.data.message);
  };

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(36.6105, 127.287), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    const icon = new kakao.maps.MarkerImage(
      "/kickboard-blackbg.png",
      new kakao.maps.Size(32, 46),
      {
        offset: new kakao.maps.Point(16, 34),
        alt: "킥보드",
        shape: "poly",
      }
    );

    markerList.forEach((group) => {
      // 지도에 표시할 원을 생성합니다
      var circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(
          group.latitude ?? 36.6105,
          group.longitude ?? 127.287
        ), // 원의 중심좌표 입니다
        radius: 40, // 미터 단위의 원의 반지름입니다
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: "#75A8FA", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일 입니다
        fillColor: "lightgreen", // 채우기 색깔입니다
        fillOpacity: 0.4, // 채우기 불투명도 입니다
      });

      // 지도에 원을 표시합니다
      circle.setMap(map);

      group.scooters.forEach((scooter) => {
        const newLat = group.latitude + 0.0005 * (0.5 - Math.random());
        const newLon = group.longitude + 0.0005 * (0.5 - Math.random());
        console.log(newLat, newLon);
        const markerPosition = new kakao.maps.LatLng(newLat, newLon);

        // New Marker
        const newMarker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // Float the Marker
        newMarker.setMap(map);
      });
    });
  }, [markerList]);

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
          <Sidebar />
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
