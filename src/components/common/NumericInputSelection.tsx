import type { MouseEvent, ReactNode } from "react";

export default function NumericInputSelection({ children }: { children: ReactNode }) {
  const selectNumber = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === "number") target.select();
  };

  return <div onClick={selectNumber}>{children}</div>;
}
