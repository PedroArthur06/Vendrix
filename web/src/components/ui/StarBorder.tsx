import React from "react";
import { cn } from "@/lib/utils";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: string;
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "#43BBA8",
  speed = "8s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px]",
        className
      )}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-100 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 40%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-100 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 40%)`,
          animationDuration: speed,
        }}
      ></div>

      <div className="relative z-10 bg-neumo-bg border border-white/5 text-white text-center text-base py-3 px-8 rounded-[20px] h-full flex items-center justify-center font-bold hover:brightness-110 transition-all">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
