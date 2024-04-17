"use client";

import { Avatar, Modal } from "flowbite-react";
import { modalTheme } from "@/theme";
import { type Dispatch, type SetStateAction, useRef } from "react";

type AvatarDialogBoxProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  avatarSelected: { gender: string; numImg: number };
  setAvatarSelected: Dispatch<
    SetStateAction<{ gender: string; numImg: number }>
  >;
};

export const AvatarDialogBox = ({
  isOpen,
  onClose,
  avatarSelected,
  setAvatarSelected,
}: AvatarDialogBoxProps) => {
  const avatars = useRef(
    Array(8)
      .fill(0)
      .reduce((acc, val, i) => {
        acc.push({
          gender: "male",
          numImg: i + 1,
        });
        acc.push({
          gender: "female",
          numImg: i + 1,
        });
        return acc;
      }, []),
  );

  return (
    <Modal
      dismissible
      show={isOpen}
      theme={modalTheme}
      size={"xl"}
      position="center"
      onClose={() => onClose(false)}
      className="z-50"
    >
      <Modal.Body>
        <div className="flex flex-wrap items-center gap-3 px-1">
          {avatars.current
            .filter(
              (avatar: { gender: string; numImg: number }) =>
                avatar.gender === "female",
            )
            .map((el: { gender: string; numImg: number }) => (
              <Avatar
                img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${el.gender}-${el.numImg}.png`}
                size="md"
                alt={`avatar ${el.numImg}`}
                key={el.numImg}
                className="mx-1 my-2 cursor-pointer border border-gray-300 p-1 hover:bg-gray-200 hover:ring-1 hover:ring-cyan-500"
                onClick={() => {
                  setAvatarSelected(el);
                  onClose(false);
                }}
              />
            ))}
        </div>
        <div className="w-full border-b border-gray-300" />

        <div className="flex flex-wrap items-center gap-3 px-1">
          {avatars.current
            .filter(
              (avatar: { gender: string; numImg: number }) =>
                avatar.gender === "male",
            )
            .map((el: { gender: string; numImg: number }) => (
              <Avatar
                img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${el.gender}-${el.numImg}.png`}
                size="md"
                alt={`avatar ${el.numImg}`}
                key={el.numImg}
                className="mx-1 my-2  cursor-pointer border border-gray-300 p-1 hover:bg-gray-200 hover:ring-1 hover:ring-cyan-500"
                onClick={() => {
                  setAvatarSelected(el);
                  onClose(false);
                }}
              />
            ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};
