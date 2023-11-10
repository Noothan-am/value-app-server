import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { GrClose } from "react-icons/gr";
import { Fade } from "@mui/material";
import Transaction from "./Transaction";
const styles = require("../styles/modal.module.css");

const style: any = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "53vw",
  transform: "translate(-50%, -50%)",
  bgcolor: "#0c1d87",
  color: "white",
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
  width: "76%",
  height: "91%",
  fontSize: "2px",
  overflow: "scroll",
};

function ModalComponent({ open, handleCloseModal, unseenTransactions }: any) {
  //   const largeScreen = window.innerWidth >= 300;
  //   const height = window.innerHeight <= 780;

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
              style={{ display: "flex", justifyContent: "space-between" }}
              className={styles["top-part"]}
            >
              <div>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  fontSize={"15px"}
                  marginBottom={"10px"}
                  component="h2"
                >
                  NOTIFICATIONS
                </Typography>
              </div>
              <div>
                <GrClose
                  style={{
                    marginTop: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={handleCloseModal}
                />
              </div>
            </div>
            <div
              className="profile__secondpart-content"
              style={{ marginTop: "3px" }}
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
                        key={index}
                        eachTransaction={eachTransaction}
                      />
                    );
                  }
                )
              )}
              {/* {} */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
// import React, { useState } from "react";
// import {
//   MDBIcon,
//   MDBBtn,
//   MDBSideNav,
//   MDBSideNavItem,
//   MDBSideNavLink,
//   MDBSideNavMenu,
//   MDBSideNavCollapse,
// } from "mdb-react-ui-kit";

// export default function ModalComponent() {
//   const [rightOpen, setRightOpen] = useState(true);
//   const [rightCollapse1, setRightCollapse1] = useState(true);
//   const [rightCollapse2, setRightCollapse2] = useState(false);

//   return (
//     <>
//       <MDBSideNav
//         right
//         isOpen={rightOpen}
//         absolute
//         getOpenState={(e: any) => setRightOpen(e)}
//       >
//         <MDBSideNavMenu>
//           <MDBSideNavItem>
//             <MDBSideNavLink>
//               <MDBIcon far icon="smile" className="fa-fw me-3" />
//               <span className="sidenav-non-slim">Link 1</span>
//             </MDBSideNavLink>
//           </MDBSideNavItem>
//           <MDBSideNavItem>
//             <MDBSideNavLink
//               icon="angle-down"
//               shouldBeExpanded={rightCollapse1}
//               onClick={() => setRightCollapse1(!rightCollapse1)}
//             >
//               <MDBIcon fas icon="grin" className="fa-fw me-3" />
//               <span className="sidenav-non-slim">Category 1</span>
//             </MDBSideNavLink>
//             <MDBSideNavCollapse show={rightCollapse1}>
//               <MDBSideNavLink>Link 2</MDBSideNavLink>
//               <MDBSideNavLink>Link 3</MDBSideNavLink>
//             </MDBSideNavCollapse>
//           </MDBSideNavItem>
//           <MDBSideNavItem>
//             <MDBSideNavLink
//               icon="angle-down"
//               shouldBeExpanded={rightCollapse2}
//               onClick={() => setRightCollapse2(!rightCollapse2)}
//             >
//               <MDBIcon fas icon="grin" className="fa-fw me-3" />
//               Category 1
//             </MDBSideNavLink>
//             <MDBSideNavCollapse show={rightCollapse2}>
//               <MDBSideNavLink>Link 4</MDBSideNavLink>
//               <MDBSideNavLink>Link 5</MDBSideNavLink>
//             </MDBSideNavCollapse>
//           </MDBSideNavItem>
//         </MDBSideNavMenu>
//       </MDBSideNav>

//       <div style={{ padding: "20px" }} className="text-center">
//         <MDBBtn onClick={() => setRightOpen(!rightOpen)}>
//           <MDBIcon fas icon="bars" />
//         </MDBBtn>
//       </div>
//     </>
//   );
// }
