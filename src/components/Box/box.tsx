import classNames from "classnames";
import React, {
  JSXElementConstructor,
  ReactHTMLElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { DarkenColor, LightenColor } from "../../utilities";

type TBox = {
  children?: React.ReactElement | React.ReactFragment;
  bgSolid?: string;
  bgGradient?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Box = ({
  children,
  bgSolid = "#ffffff10",
  bgGradient,
  className = "",
  ...props
}: TBox) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<object>({});

  const cn = classNames(`${className} rounded-lg shadow-xl overflow-hidden`, {
    box: bgGradient,
  });

  useEffect(() => {
    if (wrapperRef.current == null || typeof bgGradient == "undefined") return;

    wrapperRef.current.style.setProperty("--app-box-bg-color", `${bgGradient}`);
    wrapperRef.current.style.setProperty(
      "--app-box-bg-dark",
      DarkenColor(bgGradient)
    );
    wrapperRef.current.style.setProperty(
      "--app-box-bg-light",
      LightenColor(bgGradient)
    );
  }, [bgGradient]);

  if (bgGradient) {
    return (
      <div ref={wrapperRef} className={cn} {...props}>
        <>{children}</>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn}
      style={{ backgroundColor: `${bgSolid}`, ...props.style }}
      {...props}>
      <>{children}</>
    </div>
  );
};

export default Box;
