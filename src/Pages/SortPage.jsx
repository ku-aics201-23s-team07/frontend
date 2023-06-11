import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useCallback, useEffect, useState } from "react";

import * as API from "../api";

const { kakao } = window;

export default function SortPage() {
  const [markerList, setMarkerList] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [targetPosition, setTargetPosition] = useState([]);

  const mapDrawer = useCallback(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(36.6105, 127.287), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    const icon = new kakao.maps.MarkerImage(
      "/selected.png",
      new kakao.maps.Size(33, 36),
      {
        offset: new kakao.maps.Point(20, 20),
        alt: "내위치",
        shape: "poly",
      }
    );
    const icon2 = new kakao.maps.MarkerImage(
      "/kickboard-blackbg.png",
      new kakao.maps.Size(33, 47),
      {
        offset: new kakao.maps.Point(16, 34),
        alt: "킥보드",
        shape: "poly",
      }
    );

    markerList?.forEach((group) => {
      const markerPosition = new kakao.maps.LatLng(
        group.latitude ?? 33.450701,
        group.longitude ?? 126.570667
      );

      //New Marker
      const newMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: group.type === "me" ? icon : icon2,
      });

      //Float the Marker
      newMarker.setMap(map);
    });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const centerPosition = mouseEvent.latLng;
      setSelectedPosition({ lat: centerPosition.Ma, lon: centerPosition.La });

      setMarkerList([
        {
          name: "내 위치",
          latitude: centerPosition.Ma,
          longitude: centerPosition.La,
          type: "me",
        },
        {
          name: "가장 가까운 킥보드",
          latitude: targetPosition?.location?.latitude,
          longitude: targetPosition?.location?.longitude,
          type: "target",
        },
      ]);
    });
  });

  useEffect(() => {
    mapDrawer();
  }, [markerList, targetPosition]);

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
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
                marginBottom: 2,
                alignItems: "center",
              }}
            >
              <Typography>
                위도 {selectedPosition.lat ?? "선택되지 않음"} / 경도{" "}
                {selectedPosition.lon ?? "선택되지 않음"}
              </Typography>
              <Button
                sx={{ backgroundColor: "#FFF" }}
                onClick={async () => {
                  if (selectedPosition?.lat && selectedPosition?.lon) {
                    const res = await API.post("api/location/nearest", {
                      latitude: selectedPosition.lat,
                      longitude: selectedPosition.lon,
                    });

                    setTargetPosition(res.data.message);
                  } else {
                    alert("No fixed selected Position");
                  }
                }}
              >
                Search Nearest Scooter
              </Button>
            </Box>
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
