import classNames from "classnames";
import React from "react";

type TLoaderCircle = {
  size?: string;
};

const LoaderCircle = (props: TLoaderCircle) => {
  const { size = "md" } = props;

  const wrapperCn = classNames("loader-circle", {
    "w-6 h-6": size === "sm",
    "w-8 h-8": size === "md",
    "w-12 h-12": size === "lg",
  });

  const childCn = classNames("border-white", {
    "w-6 h-6 border-2": size === "sm",
    "w-8 h-8 border-2": size === "md",
    "w-12 h-12 border-4": size === "lg",
  });

  return (
    <div className={wrapperCn}>
      <div className={childCn}></div>
      <div className={childCn}></div>
      <div className={childCn}></div>
      <div className={childCn}></div>
    </div>
  );
};

export default LoaderCircle;
