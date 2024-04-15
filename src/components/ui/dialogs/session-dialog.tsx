"use client";

import { useModalStore, MODAL_LOGIN } from "@/store/modalStore";
import { Modal } from "flowbite-react";
import { modalTheme } from "@/theme";
import { useState } from "react";
import { FormLogin, FormLogup } from "@/components";

export const SessionDialog = () => {
  const onClose = useModalStore.use.onClose();
  const isOpen = useModalStore.use[MODAL_LOGIN]();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      dismissible
      show={isOpen}
      theme={modalTheme}
      position="center"
      onClose={() => {
        setIsLogin(true);
        onClose(MODAL_LOGIN);
      }}
      className="z-50"
    >
      <Modal.Header>
        {isLogin ? "Ingrese a su cuenta" : "Crear una cuenta"}
      </Modal.Header>
      <Modal.Body>
        {isLogin ? (
          <FormLogin setIsLogin={setIsLogin} />
        ) : (
          <FormLogup setIsLogin={setIsLogin} />
        )}
      </Modal.Body>
    </Modal>
  );
};
