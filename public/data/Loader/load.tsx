import React from "react";
import { Bars } from "react-loader-spinner";

function LoaderComponent() {
  return (
    <Bars
      height={40}
      width={40}
      color="#87CEEB"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

export default LoaderComponent;
