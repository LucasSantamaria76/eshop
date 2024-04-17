"use client";

import Image from "next/image";
import { type Dispatch, type SetStateAction, useState } from "react";
import { AvatarDialogBox } from "../ui/dialogs/avatar-dialog-box";

type Props = {
  avatarSelected: { gender: string; numImg: number };
  setAvatarSelected: Dispatch<
    SetStateAction<{ gender: string; numImg: number }>
  >;
};

export const AvatarsSelect = ({ avatarSelected, setAvatarSelected }: Props) => {
  const [AvatarDialogBoxIsOpen, setAvatarDialogBoxIsOpen] = useState(false);

  return (
    <>
      <div className="flex w-fit flex-col">
        <span className="text-center text-xs dark:text-white">Seleccionar</span>
        <span className="text-center text-xs dark:text-white">Avatar</span>
        <Image
          src={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatarSelected.gender}-${avatarSelected.numImg}.png`}
          width={150}
          height={150}
          alt="avatar user"
          className="ml-1 flex size-20 cursor-pointer border border-gray-500 hover:ring-1 hover:ring-cyan-500 sm:size-24"
          onClick={() => setAvatarDialogBoxIsOpen(!AvatarDialogBoxIsOpen)}
        />
      </div>
      <AvatarDialogBox
        isOpen={AvatarDialogBoxIsOpen}
        onClose={setAvatarDialogBoxIsOpen}
        avatarSelected={avatarSelected}
        setAvatarSelected={setAvatarSelected}
      />
    </>
  );
};

