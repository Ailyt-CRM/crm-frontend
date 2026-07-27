import type { MouseEvent } from "react";

/** Selects the complete numeric value so the next keystroke replaces defaults such as 0. */
export function selectNumericInput(event: MouseEvent<HTMLInputElement>) {
  event.currentTarget.select();
}
