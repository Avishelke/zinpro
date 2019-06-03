import { Dimensions } from "react-native";

const basePx = 375;
export const deviceW = Dimensions.get("window").width;
export const deviceH = Dimensions.get("window").height;

export function px2dp(px) {
  return (px * deviceW) / basePx;
}

export const THEME_COLOR = "#89060D";

export function FONT_FAMILY(family) {
  const FONTS = {
    n: "WorkSans-Regular",
    l: "WorkSans-Light",
    b: "WorkSans-Bold",
    m: "WorkSans-Medium",
    sb: "WorkSans-SemiBold"
  };

  return FONTS[family];
}
