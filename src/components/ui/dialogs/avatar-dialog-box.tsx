"use client";

import { MODAL_AVATARS_BOX, useModalStore } from "@/store/modalStore";
import { Modal } from "flowbite-react";
import { modalTheme } from "@/theme";

export const AvatarDialogBox = () => {
  const onClose = useModalStore.use.onClose();
  const isOpen = useModalStore.use[MODAL_AVATARS_BOX]();

  return (
    <Modal
      dismissible
      show={isOpen}
      theme={modalTheme}
      position="center"
      onClose={() => onClose(MODAL_AVATARS_BOX)}
      className="z-50"
    >
      <Modal.Header>Hola</Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};
