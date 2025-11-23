import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import Text from "../atoms/Text";
import Colors from "../../constants/Colors";

type Props = {
  firstName: string;
  lastName: string;
  style?: StyleProp<ViewStyle>;
};

const MasterCard = (props: Props) => {
  const { firstName, lastName, style } = props;

  return (
    <View style={[styles.header, style]}>
      <View style={styles.headerBadge}>
        <Text
          font="sfpro-semibold"
          size={15}
          color={Colors.green}
          style={{ fontWeight: "500" }}
        >
          {`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
        </Text>
      </View>
      <Text size={14} color={Colors.dark40} style={{ fontWeight: "500" }}>
        {`Master: ${firstName} ${lastName}`}
      </Text>
    </View>
  );
};

export default MasterCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
});
