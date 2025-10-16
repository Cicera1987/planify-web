import { ReactNode } from "react";
import "./styles.css";

interface BoxProps {
  title: string;
  children: ReactNode;
}

export default function BoxRegister({ title, children }: BoxProps) {
  return (
    <div className="box-container">
      <div className="content">
        <div className="background-dark"></div>
        <div className="background-light">
          <div className="light-header">
            <h1 className="app-title">{title}</h1>
          </div>
        </div>

        <div className="container-form scrollbar-hide">{children}</div>
      </div>
    </div>
  );
}
