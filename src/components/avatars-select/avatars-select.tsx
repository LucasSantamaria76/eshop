"use client";

import { useModalStore } from "@/store/modalStore";
import { Popover, Avatar } from "flowbite-react";
import Image from "next/image";
import { type Dispatch, type SetStateAction, useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import { MODAL_AVATARS_BOX } from "../../store/modalStore";

type Props = {
  avatarSelected: { gender: string; numImg: number };
  setAvatarSelected: Dispatch<
    SetStateAction<{ gender: string; numImg: number }>
  >;
};

export const AvatarsSelect = ({ avatarSelected, setAvatarSelected }: Props) => {
  const onShow = useModalStore.use.onShow();

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
    <Popover
      aria-labelledby="default-popover"
      trigger="click"
      placement="right"
      className="z-50 max-w-40 rounded bg-white shadow shadow-black/50 dark:bg-gray-800 sm:max-w-lg md:max-w-xl"
      content={
        <>
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
                  className="my-1 cursor-pointer border border-gray-300 p-1 hover:bg-gray-200 hover:ring-1 hover:ring-cyan-500"
                  onClick={() => setAvatarSelected(el)}
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
                  className="my-1 cursor-pointer border border-gray-300 p-1 hover:bg-gray-200 hover:ring-1 hover:ring-cyan-500"
                  onClick={() => setAvatarSelected(el)}
                />
              ))}
          </div>
        </>
      }
    >
      <div className="flex w-fit flex-col">
        <span className="text-center text-xs dark:text-white">Seleccionar</span>
        <span className="text-center text-xs dark:text-white">Avatar</span>
        <Image
          src={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatarSelected.gender}-${avatarSelected.numImg}.png`}
          width={100}
          height={100}
          alt="avatar user"
          className="flex cursor-pointer border border-gray-500 hover:ring-1 hover:ring-cyan-500"
          onClick={() => onShow(MODAL_AVATARS_BOX)}
        />
      </div>
    </Popover>
  );
};

{
  /* <Avatar
  img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatarSelected.gender}-${avatarSelected.numImg}.png`}
  size="lg"
  alt="avatar user"
  className="flex border border-gray-500 hover:ring-1 hover:ring-cyan-500"
  
/> */
}
