import React from "react";
import Overlay from "./Backdrop";
export const Modal = ({ onClose }) => {
  const elementPortal = document.getElementById("overlays");

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Overlay> {children}</Overlay>, elementPortal)}
      {ReactDOM.createPortal(<BackDrop onClose={onClose} />, elementPortal)}
    </React.Fragment>
  );
};
