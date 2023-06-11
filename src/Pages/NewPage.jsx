import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useCallback, useEffect, useState } from "react";

import * as API from "../api";

const { kakao } = window;

export default function NewPage() {
  const [markerList, setMarkerList] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState();

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

    markerList.forEach((group) => {
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

      // 커스텀 오버레이에 표시할 컨텐츠 입니다
      // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
      // 별도의 이벤트 메소드를 제공하지 않습니다
      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        group.name +
        "        </div>" +
        "    </div>" +
        "</div>";

      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: newMarker.getPosition(),
      });
    });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const centerPosition = mouseEvent.latLng;
      setSelectedPosition({ lat: centerPosition.Ma, lon: centerPosition.La });

      setMarkerList((prev) => {
        const prevVal = prev.filter((item) => item.name !== "새 킥보드");
        const newVal = [
          ...prevVal,
          {
            name: "새 킥보드",
            latitude: centerPosition.Ma,
            longitude: centerPosition.La,
            type: "me",
          },
        ];

        return newVal;
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
                위도 {selectedPosition?.lat ?? "선택되지 않음"} / 경도{" "}
                {selectedPosition?.lon ?? "선택되지 않음"}
              </Typography>
              <Button
                sx={{ backgroundColor: "#FFF" }}
                onClick={async () => {
                  if (selectedPosition?.lat && selectedPosition?.lon) {
                    const locName = prompt("새 킥보드 그룹의 이름은?");
                    await API.post("api/location/add", {
                      locationName: locName ?? "new Kickborad 001",
                      latitude: selectedPosition?.lat ?? 37.5,
                      longitude: selectedPosition?.lon ?? 127,
                      scooters: ["string"],
                    });

                    const ans = await API.get("api/location/list");
                    setMarkerList(ans.data.message);
                  } else {
                    alert("The adding point is not fixed");
                  }
                }}
              >
                Add new Scooter
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
