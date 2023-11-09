import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { GrClose } from "react-icons/gr";
import { Fade } from "@mui/material";
const styles = require("../styles/modal.module.css");

const style: any = {
  position: "absolute" as "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
  // height: "55vh",
  width: 200,
};

function ModalComponent({ open, handleClose }: any) {
  const largeScreen = window.innerWidth >= 300; // Change this breakpoint as needed
  const height = window.innerHeight <= 780; // Change this breakpoint as needed

  if (largeScreen) {
    if (window.innerWidth < 412) style.width = 300;
    else if (window.innerWidth > 840) style.width = 700;
    else style.width = 356;
  } else {
    if (window.innerWidth > 840) style.width = 200;
    style.width = 300;
  }

  if (height) {
    style.height = 500;
  } else {
    style.height = 600;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className={styles["top-part"]}
            >
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  About Encashment
                </Typography>
              </div>
              <div>
                <GrClose
                  style={{
                    marginTop: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                />
              </div>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 4 }}>
              Minimum Requirements
            </Typography>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown.
            </p>
            <Typography id="modal-modal-description" sx={{ mt: 4 }}>
              Encashment Cycle
            </Typography>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled.
            </p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
