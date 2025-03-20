import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DefaultLayout = (props: Props) => {
  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 auto",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default DefaultLayout;
