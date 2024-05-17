import { ReactNode } from "react";

export default function LayoutCreate({ children }: { children: ReactNode }) {
  return <div className="mt-5">{children}</div>;
}
