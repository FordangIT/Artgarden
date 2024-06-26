import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeModal } from "@/redux/slices/modalSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

export const ModalComponent = () => {
  const dispatch = useDispatch();
  const { isOpen, message, buttonText, link } = useSelector(
    (state: RootState) => state.modal
  );
  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className="flex justify-center items-center"
    >
      <Box className="w-96 h-60 bg-white flex justify-center items-center">
        <div className="flex-col">
          <div id="child-modal-title" className="text-lg my-5">
            {message}
          </div>
          <Link href={link}>
            <Button onClick={handleClose} className="flex bg-black w-full">
              <div className="flex justify-end items-center">{buttonText}</div>
            </Button>
          </Link>
        </div>
      </Box>
    </Modal>
  );
};
