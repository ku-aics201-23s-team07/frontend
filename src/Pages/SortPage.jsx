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
  const [targetScooter, setTargetScooter] = useState([]);

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

    markerList?.forEach((group) => {
      if (group.type === "me") {
        const markerPosition = new kakao.maps.LatLng(
          group.latitude ?? 33.450701,
          group.longitude ?? 126.570667
        );

        const newMarker = new kakao.maps.Marker({
          position: markerPosition,
          image: icon,
        });

        newMarker.setMap(map);
      } else if (group.type === "scooter") {
        const markerPosition = new kakao.maps.LatLng(
          group.latitude ?? 33.450701,
          group.longitude ?? 126.570667
        );

        const newMarker = new kakao.maps.Marker({
          position: markerPosition,
        });

        newMarker.setMap(map);

        const iwContent =
          "<div style='width: 200px; padding: 5px; display: flex; justify-content: center'>" +
          group.scooterId +
          "번 스쿠터 | " +
          group.battery +
          "%</div>";
        const iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, newMarker);
      } else {
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

        circle.setMap(map);
      }
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
          name: "가장 가까운 킥보드 구역",
          latitude: targetPosition?.location?.latitude,
          longitude: targetPosition?.location?.longitude,
          type: "target",
        },
        {
          name: "가용 킥보드",
          type: "scooter",
          scooterId: targetScooter?.id,
          battery: targetScooter?.battery,
          latitude:
            targetPosition?.location?.latitude + 0.0005 * (0.5 - Math.random()),
          longitude:
            targetPosition?.location?.longitude +
            0.0005 * (0.5 - Math.random()),
        },
      ]);
    });
  });

  useEffect(() => {
    mapDrawer();
  }, [markerList, targetPosition]);

  useEffect(() => {
    console.log(targetScooter);
  }, [targetScooter]);

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

                    const scooRes = await API.post("api/scooter/good", {
                      locationId: res.data.message.locationId,
                    });

                    setTargetScooter(scooRes.data.message);
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
