import React from "react";
import { Text as RNText, TextStyle } from "react-native";
import type { TextProps } from "react-native";
import Colors from "../../constants/Colors";

interface Props extends TextProps {
  font?: "circularstd" | "circularstd-book" | "sfpro-semibold";
  color?: string;
  size?: number;
  testID?: string;
}

const Text: React.FC<Props> = ({
  font = "circularstd",
  color = Colors.dark100,
  size = 14,
  style,
  testID,
  ...props
}: Props) => {
  const fontFamilyMap: Record<string, TextStyle["fontFamily"]> = {
    circularstd: "CircularStd",
    "circularstd-book": "CircularStd-Book",
    "sfpro-semibold": "SF-Pro-Semibold",
  };

  return (
    <RNText
      testID={testID}
      accessibilityLabel={testID}
      style={[
        {
          fontFamily: fontFamilyMap[font],
          fontSize: size,
          color,
        },
        style,
      ]}
      {...props}
    >
      {props.children}
    </RNText>
  );
};

export default React.memo(Text);
