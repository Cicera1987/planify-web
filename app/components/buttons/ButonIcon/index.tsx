"use client";

import React, { ReactNode } from "react";
import "./styles.css";
import Image from "next/image";

export default function ButtonIcon({
  label,
  icon,
  image,
  onClick,
  alt = "button icon",
  className = "",
  active = false,
}: {
  label?: string;
  icon?: ReactNode;
  image?: string;
  onClick?: () => void;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <button
        className="flex items-center justify-center bg-none border-none cursor-pointer p-0 w-full"
        onClick={onClick}
      >
        {icon}
        {image && (
          <div className="w-full flex justify-center">
            <Image
              src={image}
              alt={alt}
              width={600}
              height={0}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        )}
      </button>
      {label && <span className={active ? "active-label" : ""}>{label}</span>}
    </div>
  );
}
