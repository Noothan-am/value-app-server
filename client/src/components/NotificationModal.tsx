import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";
import Transaction from "./Transaction";
const styles = require("../styles/modal.module.css");

const style: any = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "54vw",
  transform: "translate(-50%, -50%)",
  bgcolor: "#0c1d87",
  color: "white",
  borderRadius: "28px 0px 0px 28px",
  fontFamily: "Inter, sans-serif",
  borderLeft: "2px solid white",
  boxShadow: 24,
  p: 4,
  width: "76%",
  height: "90%",
  fontSize: "2px",
  overflowy: "scroll",
};

function ModalComponent({ open, handleCloseModal, unseenTransactions }: any) {
  // const largeScreen = window.innerWidth >= 300;
  const width = window.innerWidth >= 600;
  console.log(width);
  if (width) {
    style.width = "90%";
    style.left = "58vw";
  }

  //   if (largeScreen) {
  //     if (window.innerWidth < 412) style.width = 300;
  //     else if (window.innerWidth > 840) style.width = 700;
  //     else style.width = 356;
  //   } else {
  //     if (window.innerWidth > 840) style.width = 200;
  //     style.width = 300;
  //   }

  //   if (height) {
  //     style.height = 800;
  //   } else {
  //     style.height = 600;
  //   }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
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
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "space-between",
              }}
              className={styles["top-part"]}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                fontSize={"15px"}
                marginBottom={"10px"}
                component="h2"
                display={"flex"}
              >
                <div>NOTIFICATIONS</div>
              </Typography>
              <div
                style={{
                  marginTop: "4px",
                  cursor: "pointer",
                  fontSize: "15px",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                }}
                onClick={handleCloseModal}
              >
                X
              </div>
            </div>
            <div
              className="profile__secondpart-content"
              style={{ marginTop: "3px", width: "90%" }}
            >
              {unseenTransactions.length <= 0 ? (
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  width={"100%"}
                  fontSize={"20px"}
                  marginTop={"4rem"}
                  textAlign={"center"}
                  marginBottom={"10px"}
                  component="h2"
                >
                  NO NOTIFICATIONS
                </Typography>
              ) : (
                unseenTransactions &&
                unseenTransactions.map(
                  (eachTransaction: any, index: number) => {
                    return (
                      <Transaction
                        showDiscription={true}
                        key={index}
                        eachTransaction={eachTransaction}
                      />
                    );
                  }
                )
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
