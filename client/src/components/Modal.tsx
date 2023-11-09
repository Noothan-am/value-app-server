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
    style.height = 800;
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
              Encashment refers to the process in which you can convert your
              Coins to Cash. Encashment Cycle denotes the periodicity in which
              you'll be able to encash the the coins. At the last 2 weeks of
              every Financial Quarter, the Encash button will become active.
              Financial Quarters refers to Apr-May-Jun, Jul-Aug-Sep, Oct-Nov-Dec
              and Jan-Feb-Mar. With that understanding, the Encash button will
              become active in the last 2 weeks of Mar, Jun, Sep and Dec which
              if you choose to act upon, will be added to your forthcoming
              payroll cycle.
            </p>
            <Typography id="modal-modal-description" sx={{ mt: 4 }}>
              Encashment Cycle
            </Typography>
            <p>
              For you to be eligible to Encash during the Encashment Cycle,
              you'll have to minimum of 25 Coins. Example: If you've less than
              25 Coins during the last 2 weeks of Mar, you'll have to wait to
              reach 25 or 25+ coins to encash during the next encashment cycle
              which will be Jun.
            </p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
