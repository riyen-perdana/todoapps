import React from "react";
import {
  Dialog,
  DialogOverlay
} from "./ui/dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ open, setOpen, children }: Props) => {
  return (
    <React.Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="backdrop-blur-sm bg-background/5" />
        {children}
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
