import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SplashSvg = (props) => (
  <Svg width={400} height={200} viewBox="0 0 400 200" {...props}>
    <Path d="..." fill="#000" />
  </Svg>
);

export default SplashSvg;
