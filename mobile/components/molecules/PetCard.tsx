import { View, StyleSheet, Image } from "react-native";
import { Pet } from "../../types/api.types";
import Text from "../atoms/Text";
import Colors from "../../constants/Colors";
import { Icons } from "../../assets/icons";
import { calcAge } from "../../utils/helpers";

interface PetCardProps {
  data: Pet;
  key?: string;
}

export default function PetCard({ data, key }: PetCardProps) {
  return (
    <View key={key} style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text
            size={14}
            color={Colors.dark40}
            style={{ fontWeight: "700", marginBottom: 8 }}
          >
            {data.name}
          </Text>
          <Text size={12} color={Colors.gray}>
            {calcAge(data.dob)}
          </Text>
        </View>
        <Image source={Icons.chevronRight} style={{ width: 24, height: 24 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: Colors.dark100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
