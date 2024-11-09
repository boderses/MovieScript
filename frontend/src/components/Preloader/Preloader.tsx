import React from "react";
import preloader from "assets/svg/preloader.svg";

type PreloaderProps = {
  width?: number;
  height?: number;
};

export const Preloader = ({ width = 64, height = 64 }: PreloaderProps) => {
  return <img src={preloader} alt="Preloader" width={width} height={height} />;
};
