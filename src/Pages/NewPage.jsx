import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TabHeader from "../Components/TabHeader";
import Sidebar from "../Components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import * as API from "../api";
import { async } from "q";

const { kakao } = window;

const generateRandomId = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export default function NewPage() {
  const [markerList, setMarkerList] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState();
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [scooterList, setScooterList] = useState([]);

  useEffect(() => {
    scooterLoader();
  }, [selectedLocationId]);

  const scooterLoader = async () => {
    if (selectedLocationId === "") {
      setSelectedLocationName("");
      setScooterList([]);
      return;
    }

    const res1 = await API.post("api/location/search", { locationId: selectedLocationId });
    setSelectedLocationName(res1.data.message.locationName);

    const res2 = await API.post("api/scooter/list", { locationId: selectedLocationId });
    setScooterList(res2.data.message);
  };

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
        clickable: true,
      });

      newMarker.location_id = group.location_id;

      kakao.maps.event.addListener(newMarker, "click", function (event) {
        setSelectedLocationId(this.location_id);
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
        position: newMarker.getPosition()
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

  const handleSaveInfo = async () => {
    const res = await API.post("api/location/search", { locationId: selectedLocationId });
    const locationInfo = res.data.message;

    await API.post("api/location/remove", { locationId: selectedLocationId });
    await API.post("api/location/add", { locationName: locationInfo.locationName, latitude: locationInfo.location.latitude, longitude: locationInfo.location.longitude, scooters: scooterList });
    markerLoader();
  }

  const handleRemoveLocation = async () => {
    await API.post("api/location/remove", { locationId: selectedLocationId });
    setSelectedLocationId("");
  }

  const handleAddScooter = async () => {
    let scooterBattery = prompt("킥보드 배터리상태");
    let scooterRepair = false;

    const finalSeq = () => {
      if (isNaN(scooterBattery)) {
        alert("배터리상태는 숫자여야 합니다");
        return;
      }
      scooterBattery = Number(scooterBattery);

      setScooterList([...scooterList, {
        id: `scooter-${generateRandomId(5)}`,
        battery: scooterBattery,
        repair: scooterRepair
      }]);
    }

    await confirmAlert({
      title: '킥보드 수리필요?',
      message: '',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            scooterRepair = true;
            finalSeq();
          }
        },
        {
          label: 'No',
          onClick: () => {
            finalSeq();
          }
        }
      ]
    });
  }

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
                      locationName: locName ?? "Location NULL",
                      latitude: selectedPosition?.lat ?? 37.5,
                      longitude: selectedPosition?.lon ?? 127,
                      scooters: [],
                    });

                    const ans = await API.get("api/location/list");
                    setMarkerList(ans.data.message);
                  } else {
                    alert("The adding point is not fixed");
                  }
                }}
              >
                Add new Location
              </Button>
            </Box>
            <Box style={{ display: "flex", width: "80%", height: "90%" }}>
              <div id="map"
                style={{
                  width: "80%",
                  height: "90%",
                  backgroundColor: "#777",
                  borderRadius: 3,
                }}
              ></div>
              <Box
                sx={{
                  backgroundColor: 'white',
                  width: '20%',
                  height: '90%',
                  margin: 0,
                  padding: '5px',
                  paddingTop: '0px',
                  listStyleType: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography variant="subtitle1" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                  선택된 장소: {selectedLocationName}
                </Typography>
                {scooterList.length <= 0 ? (
                  <Typography sx={{ textAlign: 'center', marginTop: '10px' }}>No info</Typography>
                ) : (
                  scooterList.map((scooter) => (
                    <Box key={scooter.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Typography sx={{ marginRight: '5px' }}>{scooter.id}</Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          setScooterList(scooterList.filter((rmScooter) => scooter.id !== rmScooter.id))
                        }
                      >
                        삭제
                      </Button>
                    </Box>
                  ))
                )}
                {selectedLocationId !== '' && (
                  <>
                    <Button variant="contained" size="large" sx={{ marginBottom: '5px' }} onClick={handleAddScooter}>
                      스쿠터 추가
                    </Button>
                    <Button variant="contained" size="large" sx={{ marginBottom: '5px' }} onClick={handleRemoveLocation}>
                      위치 삭제
                    </Button>
                    <Button variant="contained" size="large" onClick={handleSaveInfo}>
                      정보 저장
                    </Button>
                  </>
                )}
              </Box>
            </Box>
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
