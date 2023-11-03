import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { GrClose } from "react-icons/gr";
const styles = require("../styles/modal.module.css");

const style = {
  position: "absolute" as "absolute",
  top: "88%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 750,
  bgcolor: "background.paper",
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
};

function ModalComponent({ open, handleClose }: any) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Encashment Cycle
          </Typography>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </p>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComponent;
