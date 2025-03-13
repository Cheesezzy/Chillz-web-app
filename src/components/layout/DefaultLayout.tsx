import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DefaultLayout = (props: Props) => {
  return (
    <div
      style={{
        maxWidth: "1440px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {props.children}
    </div>
  );
};

export default DefaultLayout;
