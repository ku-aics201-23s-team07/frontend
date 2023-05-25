import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useEffect, useState } from "react";

export default function TabHeader({ title }) {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);
  const handleOpenA = () => setOpenA(true);
  const handleCloseA = () => setOpenA(false);
  const handleOpenB = () => setOpenB(true);
  const handleCloseB = () => setOpenB(false);
  const handleOpenC = () => setOpenC(true);
  const handleCloseC = () => setOpenC(false);

  return (
    <Box sx={styles.headerWrapper}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link sx={styles.tabButton} onClick={handleOpenA} />
        <Modal
          open={openA}
          onClose={handleCloseA}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Team Members
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              7조 팀 소개가 들어갈 자리입니다
            </Typography>
          </Box>
        </Modal>
        <Link
          sx={{ ...styles.tabButton, backgroundColor: "rgb(255, 188, 46)" }}
          onClick={handleOpenB}
        />
        <Modal
          open={openB}
          onClose={handleCloseB}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              프로젝트 소개
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              프로젝트 소개가 들어갈 공간입니다
            </Typography>
          </Box>
        </Modal>
        <Link
          sx={{ ...styles.tabButton, backgroundColor: "rgb(42, 202, 65)" }}
          onClick={handleOpenC}
        />
        <Modal
          open={openC}
          onClose={handleCloseC}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              여긴 뭐넣지
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              진짜 뭐넣지
            </Typography>
          </Box>
        </Modal>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Typography sx={{ color: "#FFF", fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  },
  headerWrapper: {
    width: "100%",
    height: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    paddingTop: 0,
    paddingBottom: 0,
    boxSizing: "border-box",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  tabButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgb(255, 95, 87)",
    marginRight: 2,
    cursor: "pointer",
  },
};
