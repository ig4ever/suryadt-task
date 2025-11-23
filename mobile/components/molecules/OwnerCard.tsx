import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Owner } from "../../types/api.types";
import { useFavorites } from "../../store/favorites";
import Text from "../atoms/Text";
import Colors from "../../constants/Colors";
import { Icons } from "../../assets/icons";

interface OwnerCardProps {
  data: Owner;
  type?: "list" | "detail";
  onPress?: (data: any) => void;
}

export default function OwnerCard({
  data,
  type = "list",
  onPress,
}: OwnerCardProps) {
  const initials = `${(data.firstName || "").charAt(0)}${(
    data.lastName || ""
  ).charAt(0)}`.toUpperCase();
  const { favorites, toggle } = useFavorites();
  const isFav = Boolean(favorites[data.id || data._id]);

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.card, type == "detail" && { paddingVertical: 24 }]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View
          style={[
            styles.avatarContainer,
            type == "detail" && { width: 56, height: 56, marginRight: 37 },
          ]}
        >
          <Image
            source={Icons.avatarBg}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
          <Text
            font="sfpro-semibold"
            size={type == "detail" ? 20 : 15}
            color={Colors.white}
          >
            {initials}
          </Text>
        </View>

        {type == "list" ? (
          <View style={styles.nameContainer}>
            <Text
              color={Colors.dark40}
              size={14}
            >{`${data.firstName} ${data.lastName}`}</Text>
          </View>
        ) : (
          <View style={[styles.nameContainer, { gap: 10 }]}>
            <View style={{ gap: 2 }}>
              <Text color={Colors.gray} size={12}>
                First Name
              </Text>
              <Text
                color={Colors.dark40}
                size={14}
              >{`${data.firstName} ${data.lastName}`}</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text color={Colors.gray} size={12}>
                Last Name
              </Text>
              <Text
                color={Colors.dark40}
                size={14}
              >{`${data.firstName} ${data.lastName}`}</Text>
            </View>
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity onPress={() => toggle(data.id || data._id)}>
            {isFav ? (
              <Image source={Icons.star} style={{ width: 24, height: 24 }} />
            ) : (
              <Image
                source={Icons.starOutline}
                style={{ width: 24, height: 24 }}
              />
            )}
          </TouchableOpacity>

          {type == "list" && (
            <Image
              source={Icons.chevronRight}
              style={{ width: 24, height: 24 }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
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
  avatarContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
});
